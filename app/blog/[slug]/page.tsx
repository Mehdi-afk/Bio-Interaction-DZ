"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/context/AuthContext";
import AuthGateModal from "@/src/components/blog/AuthGateModal";
import type { Article, ContentBlock } from "@/src/types/blog";
import { sanitizeHtml } from "@/src/lib/sanitize";

function formatDate(ts: { seconds: number } | null | undefined) {
  if (!ts) return "";
  return new Date(ts.seconds * 1000).toLocaleDateString("fr-DZ", {
    day: "numeric", month: "long", year: "numeric",
  });
}

/* ── Table helpers (module scope — no closure needed) ── */
type RawCell = { content: string; colspan?: number; rowspan?: number } | null | string;
function getCells(row: unknown): RawCell[] {
  if (Array.isArray(row)) return row as RawCell[];
  if (row && typeof row === "object" && "cells" in row) return (row as { cells: RawCell[] }).cells;
  return [];
}
function getCell(raw: RawCell) {
  if (!raw) return null;
  if (typeof raw === "string") return { content: raw };
  return raw;
}

// Les hrefs de bouton sont des props React (pas du HTML passé à DOMPurify) : ils
// échappent donc à la sanitisation. On n'autorise qu'une liste blanche de schémas
// pour bloquer javascript:, data:, vbscript: et les URLs protocol-relative (//evil).
function safeHref(url: unknown): string {
  if (typeof url !== "string") return "#";
  const u = url.trim();
  if (/^(https?:|mailto:|tel:)/i.test(u)) return u; // schémas sûrs
  if (/^\/(?!\/)/.test(u)) return u;                // chemin racine-relatif (pas //)
  return "#";
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading2":
      return (
        <h2
          className="font-serif text-[28px] text-[#1B1F1D] mt-10 mb-4 leading-[1.3] max-[600px]:text-[22px]"
          style={{ textAlign: block.align ?? "left" }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.text) }}
        />
      );
    case "heading3":
      return (
        <h3
          className="font-serif text-[20px] text-[#1B1F1D] mt-8 mb-3 leading-[1.3]"
          style={{ textAlign: block.align ?? "left" }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.text) }}
        />
      );
    case "paragraph":
      return (
        <p
          className="text-[16px] text-[#3A3A3A] leading-[1.85] mb-5 max-[600px]:text-[15px]"
          style={{ textAlign: block.align ?? "left" }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.text) }}
        />
      );
    case "quote":
      return (
        <blockquote className="my-7 pl-6 border-l-[4px] border-[#29A864]">
          <p className="text-[17px] text-[#1B1F1D] leading-[1.75] italic font-serif"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.text) }} />
        </blockquote>
      );
    case "image": {
      const isFloatLeft  = block.align === "float-left";
      const isFloatRight = block.align === "float-right";
      const isFloat      = isFloatLeft || isFloatRight;
      return (
        <figure
          className={`my-6 ${isFloat ? (isFloatLeft ? "float-left mr-6 mb-4" : "float-right ml-6 mb-4") : ""}`}
          style={isFloat ? { width: "45%" } : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.caption ?? ""}
            className={`rounded-xl object-cover ${isFloat ? "w-full" : "w-full max-h-[520px]"}`}
          />
          {block.caption && (
            <figcaption className="text-center text-[12px] text-[#A9ADAA] mt-2">{block.caption}</figcaption>
          )}
        </figure>
      );
    }
    case "list": {
      const marker = block.listStyle === "bullet" ? "•" : block.listStyle === "dash" ? "—" : null;
      if (block.listStyle === "numbered") {
        return (
          <ol className="text-[16px] text-[#3A3A3A] leading-[1.85] mb-5 pl-6 list-decimal max-[600px]:text-[15px]">
            {block.items.filter(Boolean).map((item, i) => (
              <li key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: sanitizeHtml(item) }} />
            ))}
          </ol>
        );
      }
      return (
        <ul className="text-[16px] text-[#3A3A3A] leading-[1.85] mb-5 list-none pl-0 max-[600px]:text-[15px]">
          {block.items.filter(Boolean).map((item, i) => (
            <li key={i} className="flex gap-2 mb-1">
              <span className="text-[#29A864] select-none shrink-0">{marker}</span>
              <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(item) }} />
            </li>
          ))}
        </ul>
      );
    }
    case "table": {
      const hasHeader = block.hasHeader ?? true;
      const allRows   = block.rows;
      const dataRows  = hasHeader ? allRows.slice(1) : allRows;
      return (
        <div className="my-7 overflow-x-auto">
          <table className="w-full border-collapse text-[14px]">
            {hasHeader && allRows.length > 0 && (
              <thead>
                <tr>
                  {getCells(allRows[0]).map((raw, ci) => {
                    const cell = getCell(raw);
                    if (!cell) return null;
                    return (
                      <th key={ci} colSpan={cell.colspan} rowSpan={cell.rowspan}
                        className="px-4 py-2.5 text-left font-semibold text-[#1B1F1D] bg-[#F2F1EC] border border-[#E5E3DC]"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(cell.content) }}
                      />
                    );
                  })}
                </tr>
              </thead>
            )}
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 1 ? "bg-[#FAFAF8]" : "bg-white"}>
                  {getCells(row).map((raw, ci) => {
                    const cell = getCell(raw);
                    if (!cell) return null;
                    return (
                      <td key={ci} colSpan={cell.colspan} rowSpan={cell.rowspan}
                        className="px-4 py-2.5 text-[#3A3A3A] border border-[#E5E3DC]"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(cell.content) }}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "divider":
      return <hr className="my-8 border-0 border-t border-[#E5E3DC]" />;
    case "button": {
      const variants: Record<string, string> = {
        primary:   "bg-[#29A864] text-white hover:bg-[#48BC7E]",
        secondary: "border-2 border-[#29A864] text-[#29A864] hover:bg-[#EDF8F1]",
        ghost:     "text-[#29A864] hover:underline",
      };
      const sizes: Record<string, string> = {
        sm: "px-4 py-2 text-[13px]",
        md: "px-6 py-2.5 text-[15px]",
        lg: "px-8 py-3 text-[17px]",
      };
      const align = block.align ?? "center";
      return (
        <div className={`my-6 flex ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}>
          <a href={safeHref(block.url)} target="_blank" rel="noopener noreferrer"
            className={`inline-block rounded-xl font-semibold transition-colors no-underline ${variants[block.variant ?? "primary"] ?? variants.primary} ${sizes[block.size ?? "md"] ?? sizes.md}`}
          >{block.text}</a>
        </div>
      );
    }
    default:
      return null;
  }
}

export default function ArticlePage() {
  const { slug }                    = useParams() as { slug: string };
  const router                      = useRouter();
  const { user, loading, isAdmin }  = useAuth();
  const [article, setArticle]       = useState<Article | null>(null);
  const [fetching, setFetching]     = useState(true);
  const [notFound, setNotFound]     = useState(false);
  const [showModal, setShowModal]   = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting]     = useState(false);

  useEffect(() => {
    if (!loading && !user) setShowModal(true);
  }, [loading, user]);

  useEffect(() => {
    async function fetchBySlug() {
      const col = collection(db, "articles");
      // Chemin sécurisé : un non-admin ne peut interroger que les articles publiés
      // (cohérent avec les règles Firestore strictes). Requête composite (slug+status)
      // → nécessite l'index articles(slug, status).
      const secure = isAdmin
        ? query(col, where("slug", "==", slug))
        : query(col, where("slug", "==", slug), where("status", "==", "published"));
      try {
        return await getDocs(secure);
      } catch {
        // Fallback de transition : si l'index composite n'est pas encore déployé,
        // Firestore rejette la requête composite → on retombe sur la requête simple.
        // Sûr sous les règles permissives ; le filtre client ci-dessous masque les
        // brouillons. Une fois l'index + règles strictes en place, ce fallback n'est
        // plus atteint.
        return await getDocs(query(col, where("slug", "==", slug)));
      }
    }

    async function load() {
      try {
        const snap = await fetchBySlug();
        if (snap.empty) { setNotFound(true); return; }
        const data = { id: snap.docs[0].id, ...snap.docs[0].data() } as Article;
        // Défense en profondeur : masque les brouillons aux non-admins même si le
        // fallback (règles permissives) en a renvoyé un.
        if (data.status !== "published" && !isAdmin) { setNotFound(true); return; }
        setArticle(data);
      } catch {
        setNotFound(true);
      } finally {
        setFetching(false);
      }
    }
    load();
  }, [slug, isAdmin]);

  async function handlePublish() {
    if (!article) return;
    setPublishing(true);
    try {
      const newStatus = article.status === "published" ? "draft" : "published";
      await updateDoc(doc(db, "articles", article.id), {
        status: newStatus,
        ...(newStatus === "published" ? { publishedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } } : {}),
      });
      setArticle((prev) => prev ? { ...prev, status: newStatus } : prev);
    } finally {
      setPublishing(false);
    }
  }

  async function handleDelete() {
    if (!article || !confirm("Supprimer cet article définitivement ?")) return;
    setDeleting(true);
    await deleteDoc(doc(db, "articles", article.id));
    router.push("/blog");
  }

  if (fetching) {
    return (
      <div className="max-w-[760px] mx-auto px-6 py-14 animate-pulse space-y-4">
        <div className="aspect-[16/7] bg-[#F7F6F2] rounded-2xl" />
        <div className="h-8 bg-[#F7F6F2] rounded w-3/4 mt-6" />
        <div className="h-4 bg-[#F7F6F2] rounded w-full" />
        <div className="h-4 bg-[#F7F6F2] rounded w-5/6" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-[40px] mb-3">📄</p>
          <h1 className="font-serif text-[24px] mb-2">Article introuvable</h1>
          <Link href="/blog" className="text-[14px] text-[#29A864] underline">← Retour au blog</Link>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#FAFAF8]">
      {showModal && <AuthGateModal onClose={() => setShowModal(false)} />}

      {/* Admin toolbar */}
      {isAdmin && (
        <div className="sticky top-[68px] z-30 bg-white border-b border-[#E5E3DC] px-6 py-2.5 flex items-center gap-3 flex-wrap">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
            article.status === "published" ? "bg-[#EDF8F1] text-[#29A864]" : "bg-[#FEF3CD] text-[#D97706]"
          }`}>
            {article.status === "published" ? "Publié" : "Brouillon"}
          </span>
          <div className="flex-1" />
          <Link
            href={`/blog/new?edit=${article.id}`}
            className="px-3 py-1.5 border border-[#E5E3DC] rounded-lg text-[13px] text-[#6E6E6E] no-underline hover:border-[#29A864] hover:text-[#29A864] transition-colors"
          >
            Modifier
          </Link>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium border-none cursor-pointer transition-colors ${
              article.status === "published"
                ? "bg-[#FEF3CD] text-[#D97706] hover:bg-[#FDE68A]"
                : "bg-[#29A864] text-white hover:bg-[#48BC7E]"
            } disabled:opacity-50`}
          >
            {publishing ? "…" : article.status === "published" ? "Dépublier" : "Publier"}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-3 py-1.5 rounded-lg text-[13px] font-medium bg-transparent text-[#B30C2F] border border-[#B30C2F] cursor-pointer hover:bg-[#F8E8EC] transition-colors disabled:opacity-50"
          >
            {deleting ? "…" : "Supprimer"}
          </button>
        </div>
      )}

      <article className="max-w-[760px] mx-auto px-6 py-12 max-[600px]:px-4 max-[600px]:py-8">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#A9ADAA] no-underline hover:text-[#29A864] transition-colors mb-8"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Blog
        </Link>

        {/* Cover image */}
        {article.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/7] bg-[#F7F6F2]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-medium px-2.5 py-1 bg-[#EDF8F1] text-[#29A864] rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-[40px] text-[#1B1F1D] leading-[1.2] mb-3 max-[600px]:text-[28px]">
          {article.title}
        </h1>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="text-[18px] text-[#6E6E6E] leading-[1.6] mb-5 max-[600px]:text-[16px]">
            {article.subtitle}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 py-4 border-y border-[#E5E3DC] mb-8 text-[13px] text-[#A9ADAA]">
          <span>{article.authorName}</span>
          <span>·</span>
          <span>{formatDate(article.publishedAt ?? article.createdAt)}</span>
        </div>

        {/* Body */}
        <div className="flow-root [&_a]:text-[#29A864] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#48BC7E] [&_strong]:font-semibold [&_em]:italic [&_u]:underline [&_s]:line-through">
          {article.body.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>

      </article>
    </div>
  );
}
