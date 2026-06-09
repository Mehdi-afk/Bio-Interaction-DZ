"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EQUIPEMENTS } from "@/src/data/products-equip";
import type { Product } from "@/src/data/products-reactifs";

// ── Product lookup ────────────────────────────────────────────────────────────

const PRODUCTS_MAP = Object.fromEntries(
  EQUIPEMENTS
    .filter((item): item is Product => item.kind === "product" && !!item.ref)
    .map(item => [item.ref, item])
);

// ── Guide tree ────────────────────────────────────────────────────────────────

type StepOption = {
  id: string;
  label: string;
  desc: string;
  nextStep?: string;
  results?: string[];
  redirectHref?: string;
};

type GuideStep = {
  question: string;
  cols?: 1 | 2;
  options: StepOption[];
};

const STEPS: Record<string, GuideStep> = {

  // Niveau 0 — type de produit
  racine: {
    question: "Que recherchez-vous ?",
    cols: 1,
    options: [
      { id: "equipements", label: "Équipements",  desc: "20 analyseurs haute performance", nextStep: "equip-domaine"   },
      { id: "reactifs",    label: "Réactifs",     desc: "353+ références disponibles",     nextStep: "reactifs-domaine" },
    ],
  },

  // Équipements — sous-catégories → résultats directs
  "equip-domaine": {
    question: "Quel domaine clinique ?",
    cols: 2,
    options: [
      {
        id: "biochimie",
        label: "Biochimie Clinique",
        desc: "Chimie clinique & ionogramme",
        results: ["INS00014", "INS00002", "INS00008", "INS00009", "INS00079"],
      },
      {
        id: "hematologie",
        label: "Hématologie",
        desc: "Numération formule sanguine",
        results: ["INS00077", "INS00078", "INS00071", "INS00087"],
      },
      {
        id: "hemostase",
        label: "Hémostase",
        desc: "Coagulation & bilan",
        results: ["INS00060", "INS00070"],
      },
      {
        id: "urines",
        label: "Analyse des Urines",
        desc: "Bandelettes & sédiments",
        results: ["INS00064", "INS00065"],
      },
      {
        id: "autoimmunite",
        label: "Auto-Immunité / Allergie",
        desc: "IFA, immunoblot, CLIA",
        results: ["5075", "4450", "MA01073", "MA00502"],
      },
    ],
  },

  // Réactifs — sous-catégories → navigation directe
  "reactifs-domaine": {
    question: "Quel domaine clinique ?",
    cols: 2,
    options: [
      { id: "biochimie",    label: "Biochimie Clinique",        desc: "Chimie clinique",         redirectHref: "/catalogue/reactifs?cat=biochimie"     },
      { id: "hematologie",  label: "Hématologie",               desc: "NFS & formule",           redirectHref: "/catalogue/reactifs?cat=hematologie"   },
      { id: "hemostase",    label: "Hémostase",                 desc: "Coagulation",             redirectHref: "/catalogue/reactifs?cat=hemostase"     },
      { id: "urines",       label: "Analyse des Urines",        desc: "Bandelettes",             redirectHref: "/catalogue/reactifs?cat=urines"        },
      { id: "autoimmunite", label: "Auto-Immunité",             desc: "ANA, ANCA, ENA…",         redirectHref: "/catalogue/reactifs?cat=autoimmunite"  },
      { id: "allergie",     label: "Allergie",                  desc: "BioCLIA, BioLINE DOT",    redirectHref: "/catalogue/reactifs?cat=allergie"      },
      { id: "parasito",     label: "Parasitologie & Mycologie", desc: "Western Blot, ICT",       redirectHref: "/catalogue/reactifs?cat=parasitologie" },
    ],
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SmartGuide() {
  const router     = useRouter();
  const panelRef   = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen]           = useState(false);
  const [stepKey, setStepKey]     = useState("racine");
  const [history, setHistory]     = useState<string[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [results, setResults]     = useState<string[] | null>(null);

  const step = STEPS[stepKey];

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
      setTimeout(reset, 300);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  function choose(opt: StepOption) {
    if (opt.redirectHref) {
      router.push(opt.redirectHref);
      setOpen(false);
      setTimeout(reset, 400);
    } else if (opt.results !== undefined) {
      setHistory(h => [...h, stepKey]);
      setBreadcrumb(b => [...b, opt.label]);
      setResults(opt.results!);
    } else if (opt.nextStep) {
      setHistory(h => [...h, stepKey]);
      setBreadcrumb(b => [...b, opt.label]);
      setStepKey(opt.nextStep);
    }
  }

  function back() {
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setBreadcrumb(b => b.slice(0, -1));
    if (results !== null) {
      setResults(null);
    } else {
      setStepKey(prev);
    }
  }

  function reset() {
    setStepKey("racine");
    setHistory([]);
    setBreadcrumb([]);
    setResults(null);
  }

  const resultProducts = results?.map(r => PRODUCTS_MAP[r]).filter(Boolean) ?? [];
  const isResult       = results !== null;
  const canGoBack      = history.length > 0;

  return (
    <>
      {/* ── Floating trigger ─────────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(o => !o)}
        aria-label="Ouvrir le guide intelligent"
        className={`fixed bottom-6 right-6 z-[998] flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13px] font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-all duration-200 ${
          open
            ? "bg-[#29A864] text-white shadow-[0_8px_28px_rgba(41,168,100,0.45)]"
            : "bg-[#1B1F1D] text-white hover:bg-[#29A864] hover:shadow-[0_8px_28px_rgba(41,168,100,0.45)]"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <circle cx="10" cy="10" r="8" />
          <path d="M10 6v4l2.5 2.5" />
        </svg>
        Guide intelligent
      </button>

      {/* ── Panel ────────────────────────────────────────────────────────── */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-[72px] right-6 z-[998] flex flex-col bg-[#1B1F1D] border border-[#29A864]/15 rounded-2xl overflow-hidden max-[480px]:right-3 max-[480px]:left-3"
          style={{
            width: "clamp(360px, 480px, calc(100vw - 24px))",
            boxShadow: "0 24px 56px rgba(0,0,0,0.65), 0 0 0 1px rgba(41,168,100,0.06)",
          }}
        >
          {/* Glow bas */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(41,168,100,0.12) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              {canGoBack && (
                <button onClick={back} className="text-white/35 hover:text-white transition-colors" aria-label="Retour">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                </button>
              )}
              <span className="text-[12px] font-semibold text-white/70">Guide intelligent</span>
            </div>
            <button
              onClick={() => { setOpen(false); setTimeout(reset, 300); }}
              aria-label="Fermer"
              className="text-white/25 hover:text-white/60 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
                <path d="M12 4L4 12M4 4l8 8" />
              </svg>
            </button>
          </div>

          {/* Fil d'Ariane */}
          <div className="px-5 py-2 flex items-center gap-1 flex-wrap min-h-[32px]">
            <button
              onClick={reset}
              className="text-[11px] text-white/30 hover:text-[#29A864] transition-colors"
            >
              Catalogue
            </button>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-2 h-2 text-white/20 shrink-0">
                  <path d="M3 2l4 3-4 3" />
                </svg>
                <span className={`text-[11px] ${i === breadcrumb.length - 1 ? "text-white/70 font-medium" : "text-white/30"}`}>
                  {crumb}
                </span>
              </span>
            ))}
            {isResult && (
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-2 h-2 text-white/20 shrink-0">
                  <path d="M3 2l4 3-4 3" />
                </svg>
                <span className="text-[11px] text-[#29A864] font-medium">Résultats</span>
              </span>
            )}
          </div>
          <div className="h-px bg-white/[0.05] mx-5" />

          {/* Body */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100dvh - 200px)" }}>

            {/* ── Results ───────────────────────────────────────────────── */}
            {isResult ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#29A864]/60 mb-1">
                  {resultProducts.length} équipement{resultProducts.length > 1 ? "s" : ""} disponible{resultProducts.length > 1 ? "s" : ""}
                </p>
                <p className="text-white text-[15px] font-semibold mb-4">
                  {breadcrumb[breadcrumb.length - 1]}
                </p>
                <div className="flex flex-col gap-3">
                  {resultProducts.map(product => (
                    <Link
                      key={product.ref}
                      href={`/catalogue/equipements?cat=${product.cat}&ref=${product.ref}`}
                      onClick={() => { setOpen(false); setTimeout(reset, 400); }}
                      className="flex gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl p-3.5 no-underline hover:bg-white/[0.07] hover:border-[#29A864]/35 transition-all duration-150 group"
                    >
                      {product.image && (
                        <div className="w-14 h-14 shrink-0 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                          <Image
                            src={product.image}
                            width={56}
                            height={56}
                            alt={product.desc}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-[13px] font-semibold leading-snug group-hover:text-[#29A864] transition-colors">{product.desc}</div>
                        <div className="text-white/35 text-[11px] mt-0.5">{product.marque} · {product.conditionnement}</div>
                        <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#29A864] group-hover:text-[#48BC7E] transition-colors">
                          Voir la fiche
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                            <path d="M4 2l4 4-4 4" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={reset}
                  className="w-full mt-4 pt-3 border-t border-white/[0.07] text-[11px] text-white/25 hover:text-white/50 transition-colors text-center"
                >
                  Recommencer depuis le début
                </button>
              </div>
            ) : (

            /* ── Question step ────────────────────────────────────────── */
              <div>
                <p className="text-white text-[15px] font-semibold mb-4">{step?.question}</p>
                <div className={step?.cols === 2 ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"}>
                  {step?.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => choose(opt)}
                      className="text-left p-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:border-[#29A864]/35 transition-all duration-150 group"
                    >
                      <div className="text-white text-[13px] font-semibold group-hover:text-[#29A864] transition-colors leading-snug">
                        {opt.label}
                      </div>
                      <div className="text-white/35 text-[11px] mt-0.5 leading-snug">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
