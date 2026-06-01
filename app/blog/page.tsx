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

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <line x1="10" y1="4" x2="10" y2="16" /><line x1="4" y1="10" x2="16" y2="10" />
    </svg>
  );
}

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-white border border-[#E5E3DC] rounded-2xl overflow-hidden animate-pulse ${featured ? "col-span-2 max-[900px]:col-span-1" : ""}`}>
      <div className={`bg-[#F7F6F2] ${featured ? "aspect-[16/7]" : "aspect-square"}`} />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#F7F6F2] rounded w-24" />
        <div className="h-5 bg-[#F7F6F2] rounded w-4/5" />
        <div className="h-3 bg-[#F7F6F2] rounded w-full" />
        <div className="h-3 bg-[#F7F6F2] rounded w-3/4" />
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { user, loading, isAdmin } = useAuth();
  const [articles, setArticles]     = useState<Article[]>([]);
  const [fetching, setFetching]     = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [showModal, setShowModal]   = useState(false);

  useEffect(() => {
    if (!loading && !user) setShowModal(true);
  }, [loading, user]);

  useEffect(() => {
    async function load() {
      try {
        const snap    = await getDocs(collection(db, "articles"));
        const all     = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
        const visible = isAdmin ? all : all.filter((a) => a.status === "published");
        visible.sort(
          (a, b) =>
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

  const [featured, ...rest] = articles;

  return (
    <>
      {showModal && <AuthGateModal onClose={() => setShowModal(false)} />}

      {/* ════════════════════════════════════════════════════════
          HERO éditorial — fond sombre
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-24 px-12 max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="reveal block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-5">
              Ressources &amp; Actualités
            </span>
            <h1
              className="reveal reveal-d1 font-serif text-white leading-[1.0]"
              style={{ fontSize: "clamp(52px, 9vw, 110px)" }}
            >
              Blog
            </h1>
            <p className="reveal reveal-d2 text-white/40 text-[16px] leading-[1.65] mt-4 max-w-[400px]">
              Actualités, guides et ressources pour les laboratoires d&apos;analyse médicale.
            </p>
          </div>
          {isAdmin && (
            <Link
              href="/blog/new"
              className="
                reveal shrink-0 inline-flex items-center gap-2 px-5 py-3
                bg-[#29A864] text-white rounded-full text-[14px] font-semibold
                no-underline hover:bg-[#48BC7E] transition-colors duration-150
              "
            >
              <PlusIcon />
              Nouvel article
            </Link>
          )}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          ARTICLES — fond blanc
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-12 min-h-[40vh] max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-10">
        <div className="max-w-[1100px] mx-auto">

          {fetchError ? (
            <div className="text-center py-20 text-[#6E6E6E]">
              <p className="text-[40px] mb-3">⚠️</p>
              <p className="text-[16px]">Impossible de charger les articles. Veuillez réessayer.</p>
            </div>

          ) : fetching ? (
            <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              <SkeletonCard featured />
              <SkeletonCard />
              <SkeletonCard />
            </div>

          ) : articles.length === 0 ? (
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

              {/* Featured — premier article plus grand */}
              {featured && (
                <Link
                  key={featured.id}
                  href={`/blog/${featured.slug}`}
                  className="reveal col-span-2 max-[900px]:col-span-full group bg-white border border-[#E5E3DC] rounded-2xl overflow-hidden no-underline transition-[box-shadow,border-color,transform] duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:border-[#BDD0EA] hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/7] max-[900px]:aspect-[16/9] overflow-hidden bg-[#F7F6F2] flex items-center justify-center">
                    {featured.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.coverImage}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="text-[60px] opacity-25">📰</span>
                    )}
                  </div>
                  <div className="p-6">
                    {isAdmin && (
                      <span className={`inline-block text-[10px] font-semibold tracking-[0.4px] uppercase px-2 py-[2px] rounded-full mb-2 ${
                        featured.status === "published" ? "bg-[#EDF8F1] text-[#29A864]" : "bg-[#FEF3CD] text-[#D97706]"
                      }`}>
                        {featured.status === "published" ? "Publié" : "Brouillon"}
                      </span>
                    )}
                    {featured.tags && featured.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap mb-3">
                        {featured.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-medium px-2 py-[2px] bg-[#F7F6F2] text-[#6E6E6E] rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-[20px] font-semibold text-[#1B1F1D] leading-[1.35] mb-2 line-clamp-2 group-hover:text-[#29A864] transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-[14px] text-[#6E6E6E] leading-[1.6] line-clamp-2 mb-4">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between border-t border-[#F7F6F2] pt-3">
                      <span className="text-[11px] text-[#A9ADAA]">{formatDate(featured.publishedAt ?? featured.createdAt)}</span>
                      <span className="text-[13px] font-semibold text-[#29A864]">Lire l&apos;article →</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Remaining articles */}
              {rest.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  style={{ transitionDelay: `${(i + 1) * 55}ms` }}
                  className="reveal group bg-white border border-[#E5E3DC] rounded-2xl overflow-hidden no-underline transition-[box-shadow,border-color,transform] duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] hover:border-[#BDD0EA] hover:-translate-y-0.5"
                >
                  <div className="aspect-square overflow-hidden bg-[#F7F6F2] flex items-center justify-center">
                    {article.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-[48px] opacity-25">📰</span>
                    )}
                  </div>
                  <div className="p-5">
                    {isAdmin && (
                      <span className={`inline-block text-[10px] font-semibold tracking-[0.4px] uppercase px-2 py-[2px] rounded-full mb-2 ${
                        article.status === "published" ? "bg-[#EDF8F1] text-[#29A864]" : "bg-[#FEF3CD] text-[#D97706]"
                      }`}>
                        {article.status === "published" ? "Publié" : "Brouillon"}
                      </span>
                    )}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap mb-2">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] font-medium px-2 py-[2px] bg-[#F7F6F2] text-[#6E6E6E] rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-[15px] font-semibold text-[#1B1F1D] leading-[1.4] mb-1.5 line-clamp-2 group-hover:text-[#29A864] transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-[13px] text-[#6E6E6E] leading-[1.6] mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F7F6F2]">
                      <span className="text-[11px] text-[#A9ADAA]">{formatDate(article.publishedAt ?? article.createdAt)}</span>
                      <span className="text-[12px] font-medium text-[#29A864]">Lire →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
