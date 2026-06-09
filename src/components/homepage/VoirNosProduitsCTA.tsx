"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const CHOICES = [
  {
    href: "/catalogue/equipements",
    label: "Équipements",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#29A864" strokeWidth="2" />
        <path d="M13 27V20m0 0a4 4 0 1 1 8 0m-8 0h8m0 0v7" stroke="#29A864" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="27" cy="14" r="3" stroke="#29A864" strokeWidth="1.8" />
        <path d="M27 17v4" stroke="#29A864" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    description: "Analyseurs biochimie, hématologie, hémostase, urines et auto-immunité.",
    accent: "#29A864",
    bg: "rgba(41,168,100,0.08)",
    border: "rgba(41,168,100,0.25)",
    hover: "rgba(41,168,100,0.15)",
  },
  {
    href: "/catalogue/reactifs",
    label: "Réactifs",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#004B9D" strokeWidth="2" />
        <path d="M15 10h10v8l4 9a2 2 0 0 1-1.8 2.8H12.8A2 2 0 0 1 11 27l4-9V10z" stroke="#4A90D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 23h13" stroke="#4A90D9" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    description: "Réactifs allergie, auto-immunité, biochimie et parasitologie.",
    accent: "#4A90D9",
    bg: "rgba(0,75,157,0.1)",
    border: "rgba(74,144,217,0.3)",
    hover: "rgba(0,75,157,0.18)",
  },
] as const;

export default function VoirNosProduitsCTA() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  function handleChoice(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center gap-2
          px-7 py-3.5 rounded-full
          bg-[#29A864] text-white text-[15px] font-semibold
          transition-[background,transform,box-shadow] duration-150
          hover:bg-[#48BC7E] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(41,168,100,0.45)]
        "
      >
        Voir Nos Produits
        <ArrowIcon />
      </button>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center px-4"
          style={{ zIndex: 2000, background: "rgba(15,25,40,0.72)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[500px] rounded-2xl p-8"
            style={{ background: "#0f1928", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-7">
              <p className="text-xs font-semibold tracking-[0.8px] uppercase text-[#29A864] mb-2">Explorer</p>
              <h2 className="text-white text-xl font-semibold">Nos Produits</h2>
              <p className="text-white/45 text-sm mt-1">Choisissez une catégorie</p>
            </div>

            {/* Choice cards */}
            <div className="grid grid-cols-2 gap-4">
              {CHOICES.map((c) => (
                <button
                  key={c.href}
                  onClick={() => handleChoice(c.href)}
                  className="flex flex-col items-center text-center gap-3 p-5 rounded-xl transition-all duration-150 group"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = c.hover)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = c.bg)}
                >
                  {c.icon}
                  <span className="text-white font-semibold text-[15px]">{c.label}</span>
                  <span className="text-white/45 text-[12px] leading-[1.5]">{c.description}</span>
                  <span
                    className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium"
                    style={{ color: c.accent }}
                  >
                    Voir tout
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <path d="M2 6h8M6.5 3l3 3-3 3" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
