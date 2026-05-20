"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/context/AuthContext";
import AuthGateModal from "@/src/components/blog/AuthGateModal";
import type { Article } from "@/src/types/blog";

function formatDate(ts: { seconds: number } | null | undefined) {
  if (!ts) return "";
  return new Date(ts.seconds * 1000).toLocaleDateString("fr-DZ", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BlogPage() {
  const { user, loading, isAdmin } = useAuth();
  const [articles, setArticles]     = useState<Article[]>([]);
  const [fetching, setFetching]     = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [showModal, setShowModal]   = useState(false);

  // Show auth gate once auth is resolved and user is not logged in
  useEffect(() => {
    if (!loading && !user) setShowModal(true);
  }, [loading, user]);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "articles"));
        const all  = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
        const visible = isAdmin
          ? all
          : all.filter((a) => a.status === "published");
        visible.sort((a, b) =>
          ((b.publishedAt ?? b.createdAt)?.seconds ?? 0) -
          ((a.publishedAt ?? a.createdAt)?.seconds ?? 0)
        );
        setArticles(visible);
      } catch {
        setFetchError(true);
      } finally {
        setFetching(false);
      }
    }
    load();
  }, [isAdmin]);

  return (
    <div className="max-w-[1100px] mx-auto px-12 py-14 min-h-[calc(100vh-68px)] max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-8">

      {showModal && <AuthGateModal onClose={() => setShowModal(false)} />}

      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-12 flex-wrap max-[600px]:mb-7">
        <div>
          <h1 className="font-serif text-[38px] mb-2 max-[600px]:text-[28px]">Blog</h1>
          <p className="text-[#6E6E6E] text-[16px]">
            Actualités, guides et ressources pour les laboratoires d&apos;analyse médicale.
          </p>
        </div>
        {isAdmin && (
          <Link
            href="/blog/new"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium no-underline hover:bg-[#48BC7E] transition-colors duration-150"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/>
            </svg>
            Nouvel article
          </Link>
        )}
      </div>

      {fetchError ? (
        <div className="text-center py-20 text-[#6E6E6E]">
          <p className="text-[40px] mb-3">⚠️</p>
          <p className="text-[16px]">Impossible de charger les articles. Veuillez réessayer.</p>
        </div>
      ) : fetching ? (
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white border border-[#E5E3DC] rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-[#F7F6F2]" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-[#F7F6F2] rounded w-3/4" />
                <div className="h-3 bg-[#F7F6F2] rounded w-full" />
                <div className="h-3 bg-[#F7F6F2] rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 && !fetchError ? (
        <div className="text-center py-20 text-[#6E6E6E]">
          <p className="text-[40px] mb-3">✍️</p>
          <p className="text-[16px]">Aucun article publié pour l&apos;instant.</p>
          {isAdmin && (
            <Link href="/blog/new" className="mt-4 inline-block text-[14px] text-[#29A864] underline">
              Créer le premier article →
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-white border border-[#E5E3DC] rounded-2xl overflow-hidden no-underline transition-[box-shadow,border-color,transform] duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:border-[#BDD0EA] hover:-translate-y-0.5"
            >
              {/* Cover */}
              <div className="aspect-square overflow-hidden bg-[#F7F6F2] flex items-center justify-center">
                {article.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-[48px] opacity-30">📰</span>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Status badge (admin only) */}
                {isAdmin && (
                  <span className={`inline-block text-[10px] font-semibold tracking-[0.4px] uppercase px-2 py-[2px] rounded-full mb-2 ${
                    article.status === "published"
                      ? "bg-[#EDF8F1] text-[#29A864]"
                      : "bg-[#FEF3CD] text-[#D97706]"
                  }`}>
                    {article.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-[2px] bg-[#F7F6F2] text-[#6E6E6E] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-[15px] font-semibold text-[#1B1F1D] leading-[1.4] mb-1.5 line-clamp-2">
                  {article.title}
                </h2>

                {article.excerpt && (
                  <p className="text-[13px] text-[#6E6E6E] leading-[1.6] mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#F7F6F2]">
                  <span className="text-[11px] text-[#A9ADAA]">
                    {formatDate(article.publishedAt ?? article.createdAt)}
                  </span>
                  <span className="text-[12px] font-medium text-[#29A864]">Lire →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
