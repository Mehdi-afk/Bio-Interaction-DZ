"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { GridItem, Product, InfoBlock } from "@/src/data/products-reactifs";
import { FICHES_TECHNIQUES } from "@/src/data/fiches-techniques";
import { FICHES_LDBIO } from "@/src/data/fiches-ldbio";
import { useApp } from "@/src/context/AppContext";

// ── Colour helpers ─────────────────────────────────────────────────────────────

const CAT_STYLE: Record<string, { bg: string; color: string }> = {
  biochimie:    { bg: "#EFF6FF", color: "#1D4ED8" },
  hematologie:  { bg: "#FFF1F2", color: "#BE123C" },
  hemostase:    { bg: "#FDF4FF", color: "#7E22CE" },
  urines:       { bg: "#FFFBEB", color: "#92400E" },
  elisa:        { bg: "#ECFDF5", color: "#065F46" },
  autoimmunite: { bg: "#FAF5FF", color: "#6D28D9" },
  allergie:     { bg: "#FFF7ED", color: "#C2410C" },
  parasitologie:{ bg: "#F0FDF4", color: "#15803D" },
};
const catStyle = (cat: string) => CAT_STYLE[cat] ?? { bg: "#F3F4F6", color: "#374151" };

const catLabel = (cat: string) =>
  cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, " $1");

const TYPE_ICON: Record<string, string> = {
  reactif:      "⚗",
  instrument:   "⚙",
  controle:     "⊙",
  consommable:  "▣",
};
const typeIcon = (t: string) => TYPE_ICON[t] ?? "⚗";

// ── Compatible reactifs map (instruments → reactif filter params) ──────────────

const COMPAT_MAP: Record<string, { cat: string; marque: string; q: string }> = {
  INS00002: { cat: "biochimie",    marque: "ERBA",          q: "" },
  INS00008: { cat: "biochimie",    marque: "ERBA",          q: "" },
  INS00009: { cat: "biochimie",    marque: "ERBA",          q: "" },
  INS00014: { cat: "biochimie",    marque: "ERBA",          q: "" },
  INS00079: { cat: "biochimie",    marque: "ERBA",          q: "EC" },
  INS00077: { cat: "hematologie",  marque: "ERBA",          q: "H360" },
  INS00078: { cat: "hematologie",  marque: "ERBA",          q: "H560" },
  INS00071: { cat: "hematologie",  marque: "ERBA",          q: "H580" },
  INS00087: { cat: "hematologie",  marque: "ERBA",          q: "H7" },
  INS00060: { cat: "hemostase",    marque: "ERBA",          q: "" },
  INS00070: { cat: "hemostase",    marque: "ERBA",          q: "" },
  INS00064: { cat: "urines",       marque: "ERBA",          q: "" },
  INS00065: { cat: "urines",       marque: "ERBA",          q: "" },
  "5075":   { cat: "autoimmunite", marque: "Generic Assays", q: "DotDiver" },
  "4450":   { cat: "autoimmunite", marque: "Generic Assays", q: "AKLIDES" },
  MA01073:  { cat: "autoimmunite", marque: "HOB Biotech",   q: "" },
  MA00502:  { cat: "autoimmunite", marque: "HOB Biotech",   q: "" },
  MA00243:  { cat: "autoimmunite", marque: "HOB Biotech",   q: "" },
};

// ── Cat / type labels ──────────────────────────────────────────────────────────

const CAT_LABELS: Record<string, string> = {
  biochimie: "Biochimie Clinique", hematologie: "Hématologie",
  hemostase: "Hémostase", urines: "Analyse des Urines",
  elisa: "Chaîne ELISA", autoimmunite: "Auto-Immunité",
  allergie: "Allergie", parasitologie: "Parasitologie & Mycologie",
};
const TYPE_LABELS: Record<string, string> = {
  instrument: "Instrument", reactif: "Réactif",
  controle: "Contrôle", consommable: "Consommable",
};

// ── Config types ───────────────────────────────────────────────────────────────

export type CatConfig   = { value: string; label: string };
export type BrandConfig = { value: string; label: string };

// ── FilterCheck ────────────────────────────────────────────────────────────────

function FilterCheck({ active }: { active: boolean }) {
  return (
    <span
      className={`w-4 h-4 border-[1.5px] rounded-[4px] shrink-0 flex items-center justify-center transition-colors duration-[120ms] ${
        active ? "bg-[#29A864] border-[#29A864]" : "border-[#E5E3DC]"
      }`}
    >
      {active && (
        <svg viewBox="0 0 8 5" fill="none" className="w-2 h-[5px]">
          <path d="M0.5 2.5L3 4.5L7.5 0.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

// ── ProductCard ────────────────────────────────────────────────────────────────

function ProductCard({
  product, isList, onSelect, onAddToCart,
}: {
  product: Product;
  isList: boolean;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}) {
  const { bg, color } = catStyle(product.cat);

  return (
    <div
      role="button"
      tabIndex={0}
      className={`group bg-white border border-[#E5E3DC] rounded-2xl overflow-hidden cursor-pointer
        transition-[box-shadow,border-color,transform] duration-200
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:border-[#BDD0EA] hover:-translate-y-0.5
        ${isList ? "flex flex-row" : ""}`}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(product); }}
    >
      {/* Image area */}
      <div
        className={`flex items-center justify-center shrink-0 overflow-hidden
          ${isList ? "w-[120px] h-[120px]" : "w-full aspect-square"}`}
        style={{ background: product.image ? "#fff" : bg }}
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.desc}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-[42px]" style={{ opacity: 0.55 }}>{typeIcon(product.type)}</span>
        )}
      </div>

      {/* Body */}
      <div className={`p-4 pb-5 ${isList ? "flex-1 min-w-0" : ""}`}>
        <span
          className="text-[10px] font-semibold tracking-[0.4px] uppercase px-2 py-[2px] rounded-full mb-2 inline-block"
          style={{ background: bg, color }}
        >
          {catLabel(product.cat)}
        </span>
        <h3 className="text-[14px] font-semibold mb-1 leading-[1.4]">{product.desc}</h3>
        <div className="text-[12px] text-[#A9ADAA] mb-2">
          Ref. {product.ref} &middot; {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
        </div>

        {isList && (
          <>
            {product.description && (
              <p className="text-[13px] text-[#6E6E6E] leading-[1.5] my-1.5">
                {product.description}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
              {product.marque && (
                <span className="text-[12px] px-2 py-[3px] bg-[#F7F6F2] rounded-[6px]">
                  Marque : <strong>{product.marque}</strong>
                </span>
              )}
              {product.conditionnement && (
                <span className="text-[12px] px-2 py-[3px] bg-[#F7F6F2] rounded-[6px]">
                  Conditionnement : <strong>{product.conditionnement}</strong>
                </span>
              )}
              {product.testsKit && (
                <span className="text-[12px] px-2 py-[3px] bg-[#F7F6F2] rounded-[6px]">
                  Tests/kit : <strong>{product.testsKit}</strong>
                </span>
              )}
            </div>
          </>
        )}

        <button
          className={`py-2 bg-[#EDF8F1] text-[#29A864] border-none rounded-[7px] text-[13px] font-medium cursor-pointer transition-[background,color] duration-[120ms] hover:bg-[#29A864] hover:text-white ${isList ? "px-4" : "w-full"}`}
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

// ── FicheTechniqueButton ───────────────────────────────────────────────────────

const DownloadIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M10 3v10M6 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 15h14" strokeLinecap="round"/>
  </svg>
);

function FicheTechniqueButton({ productRef }: { productRef: string }) {
  const [open, setOpen] = useState(false);

  // Check LDBIO source first (single notice with potential fallback flag)
  const ldbioFiche = FICHES_LDBIO[productRef];
  if (ldbioFiche) {
    return (
      <div>
        <a
          href={ldbioFiche.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-[10px] px-7 bg-transparent text-[#1B1F1D] border-[1.5px] border-[#E5E3DC] rounded-[9px] text-[14px] font-medium no-underline hover:border-[#29A864] hover:text-[#29A864] transition-colors duration-150"
        >
          <DownloadIcon />
          Télécharger la notice ({ldbioFiche.langue})
        </a>
        {ldbioFiche.fallback && (
          <p className="text-[11px] text-[#A9ADAA] mt-1 text-center">
            ⚠️ Notice disponible en anglais uniquement
          </p>
        )}
      </div>
    );
  }

  // Check ERBA XSYS source (can have multiple IFU entries)
  const erbaFiches = FICHES_TECHNIQUES[productRef];
  if (!erbaFiches || erbaFiches.length === 0) return null;

  if (erbaFiches.length === 1) {
    return (
      <a
        href={erbaFiches[0].url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-[10px] px-7 bg-transparent text-[#1B1F1D] border-[1.5px] border-[#E5E3DC] rounded-[9px] text-[14px] font-medium no-underline hover:border-[#29A864] hover:text-[#29A864] transition-colors duration-150"
      >
        <DownloadIcon />
        Télécharger la notice
      </a>
    );
  }

  // Multiple ERBA fiches → dropdown
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center gap-2 w-full py-[10px] px-7 bg-transparent text-[#1B1F1D] border-[1.5px] border-[#E5E3DC] rounded-[9px] text-[14px] font-medium cursor-pointer hover:border-[#29A864] hover:text-[#29A864] transition-colors duration-150"
      >
        <DownloadIcon />
        Notices disponibles ({erbaFiches.length})
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className={`w-3.5 h-3.5 ml-auto transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E3DC] rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.10)] z-10 overflow-hidden">
          {erbaFiches.map((f, i) => (
            <a
              key={i}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 no-underline text-[13px] text-[#1B1F1D] hover:bg-[#EDF8F1] hover:text-[#29A864] transition-colors border-b border-[#F7F6F2] last:border-b-0"
            >
              <DownloadIcon />
              <span className="flex-1">{f.label}</span>
              <span className="text-[11px] text-[#A9ADAA] bg-[#F7F6F2] px-1.5 py-0.5 rounded-full">{f.langue}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── ProductPage ────────────────────────────────────────────────────────────────

function ProductPage({
  product, sectionLabel, onClose, onAddToCart, onRequestDevis, onShowCompat,
}: {
  product: Product;
  sectionLabel: string;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onRequestDevis: (p: Product) => void;
  onShowCompat: (ref: string) => void;
}) {
  const { bg, color } = catStyle(product.cat);
  const isInstrument = product.type === "instrument";
  const hasCompat = isInstrument && !!COMPAT_MAP[product.ref];
  const [lightbox, setLightbox] = useState(false);

  // Instruments: split description into bullet points at " — " or " - "
  const rawPoints = product.description
    ? product.description.split(/ — | - /).map((s) => s.trim()).filter(Boolean)
    : [];
  const showBullets = isInstrument && rawPoints.length > 1;

  const condLabel = isInstrument ? "Cadence / Débit" : "Conditionnement";
  const specs = [
    { key: "Référence",   val: product.ref },
    { key: "Spécialité",  val: CAT_LABELS[product.cat] || product.cat },
    { key: "Marque",      val: product.marque },
    { key: "Type",        val: TYPE_LABELS[product.type] || product.type },
    ...(product.conditionnement ? [{ key: condLabel, val: product.conditionnement }] : []),
    ...(product.testsKit ? [{ key: "Tests / kit", val: product.testsKit }] : []),
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (lightbox) setLightbox(false); else onClose(); }
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, lightbox]);

  return (
    <div className="fixed inset-0 top-[68px] z-[900] bg-white overflow-y-auto">
      <div className="max-w-[1100px] mx-auto px-10 py-8 pb-20 max-[900px]:px-5 max-[900px]:py-5 max-[480px]:px-4">

        {/* Topbar */}
        <div className="flex items-center gap-4 mb-8 max-[480px]:flex-wrap">
          <button
            onClick={onClose}
            className="
              inline-flex items-center shrink-0
              border border-[#E5E3DC] rounded-[10px] px-4 py-2
              text-[14px] font-medium text-[#A9ADAA] bg-transparent cursor-pointer
              hover:bg-[#F7F6F2] hover:text-[#1B1F1D] transition-colors duration-150
            "
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="w-[18px] h-[18px] mr-1.5 shrink-0" aria-hidden="true">
              <path d="M12 5l-5 5 5 5"/>
            </svg>
            Retour
          </button>
          <div className="flex items-center gap-1.5 text-[13px] text-[#A9ADAA] overflow-hidden min-w-0">
            <span className="font-medium text-[#6E6E6E] whitespace-nowrap shrink-0">{sectionLabel}</span>
            <span className="opacity-40 shrink-0">›</span>
            <span className="truncate">{product.desc}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="grid min-[900px]:[grid-template-columns:420px_1fr] gap-12 items-start mb-14 max-[900px]:gap-7">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div
              className={`w-full border border-[#E5E3DC] rounded-2xl flex items-center justify-center bg-[#F7F6F2] overflow-hidden max-[900px]:max-w-[400px] ${product.image ? "cursor-zoom-in" : ""}`}
              style={{ aspectRatio: "1/1" }}
              onClick={() => { if (product.image) setLightbox(true); }}
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.desc}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[72px] opacity-45 leading-none">{typeIcon(product.type)}</span>
                  <span className="text-[12px] text-[#A9ADAA] tracking-[0.3px]">Image produit</span>
                </div>
              )}
            </div>
          </div>

          {/* Lightbox */}
          {lightbox && product.image && (
            <div
              className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 cursor-zoom-out"
              onClick={() => setLightbox(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.desc}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setLightbox(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center text-[20px] cursor-pointer hover:bg-white/20 transition-colors"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
          )}

          {/* Info */}
          <div className="pt-2">
            <span
              className="inline-block text-[11px] font-semibold tracking-[0.5px] uppercase px-3 py-1 rounded-full mb-3"
              style={{ background: bg, color }}
            >
              {catLabel(product.cat)}
            </span>

            <h1 className="font-serif text-[34px] font-normal leading-[1.2] mb-2 max-[900px]:text-[26px]">
              {product.desc}
            </h1>

            <div className="text-[13px] text-[#A9ADAA] font-medium tracking-[0.3px] mb-4">
              Réf. {product.ref}
            </div>

            {product.description && (
              <div className="mb-7 px-6 py-5 bg-[#F7F6F2] rounded-[10px] border-l-[3px] border-[#15623A]">
                <h3 className="text-[10px] font-bold tracking-[0.8px] uppercase text-[#29A864] m-0 mb-2.5">
                  Présentation
                </h3>
                {showBullets ? (
                  <ul className="m-0 p-0 list-none text-[14.5px] text-[#1B1F1D] leading-[1.7]">
                    {rawPoints.map((pt, i) => (
                      <li key={i} className="mb-2 pl-5 relative last:mb-0">
                        <span className="absolute left-0 text-[#29A864] font-bold text-[13px]">✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[16px] text-[#1B1F1D] leading-[1.8] m-0">{product.description}</p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => onRequestDevis(product)}
                className="flex items-center justify-center w-full py-3 px-7 bg-[#29A864] text-white border-none rounded-[9px] text-[15px] font-medium cursor-pointer hover:bg-[#48BC7E] transition-colors duration-150"
              >
                Demander un devis →
              </button>
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center w-full py-[10px] px-7 bg-transparent text-[#29A864] border-[1.5px] border-[#29A864] rounded-[9px] text-[14px] font-medium cursor-pointer hover:bg-[#EDF8F1] transition-colors duration-150"
              >
                + Ajouter au panier
              </button>
              <FicheTechniqueButton productRef={product.ref} />
              {hasCompat && (
                <button
                  onClick={() => onShowCompat(product.ref)}
                  className="flex items-center justify-center gap-2 w-full py-[11px] px-7 bg-transparent text-[#29A864] border-[1.5px] border-[#29A864] rounded-[9px] text-[14px] font-semibold cursor-pointer hover:bg-[#EDF8F1] transition-colors duration-150"
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 shrink-0" aria-hidden="true">
                    <circle cx="10" cy="10" r="8"/>
                    <path d="M7 10h6M13 10l-2-2M13 10l-2 2"/>
                  </svg>
                  Voir les réactifs compatibles
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Specs section */}
        <div className="border-t border-[#E5E3DC] pt-10">
          <h2 className="font-serif text-[24px] font-normal mb-5">
            {isInstrument ? "Fiche technique" : "Spécifications"}
          </h2>
          <div className="border border-[#E5E3DC] rounded-[10px] overflow-hidden">
            {specs.map((s, i) => (
              <div
                key={s.key}
                className={`flex items-center px-5 py-[13px] text-[14px] gap-4 border-b border-[#E5E3DC] last:border-b-0 ${
                  i % 2 === 1 ? "bg-[#F7F6F2]" : "bg-white"
                }`}
              >
                <span className="text-[#A9ADAA] font-medium shrink-0 w-[200px] max-[480px]:w-[110px] max-[480px]:text-[13px]">
                  {s.key}
                </span>
                <span className="font-medium text-[#1B1F1D]">{s.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function CatalogueClient({
  items, title, cats, brands, showTypeFilter, backHref,
}: {
  items: GridItem[];
  title: string;
  cats: CatConfig[];
  brands: BrandConfig[];
  showTypeFilter?: boolean;
  backHref?: string;
}) {
  const router = useRouter();
  const searchParams  = useSearchParams();
  const initialCat    = searchParams.get("cat") ?? "all";

  // On mount, also read marque and q from URL (used by compat redirect)
  const initialMarque = searchParams.get("marque") ?? "";
  const initialQ      = searchParams.get("q")      ?? "";

  const [search,       setSearch]       = useState(initialQ);
  const [activeCat,    setActiveCat]    = useState(initialCat);
  const [activeBrands, setActiveBrands] = useState<Set<string>>(
    initialMarque ? new Set([initialMarque]) : new Set()
  );
  const [activeTypes,  setActiveTypes]  = useState<Set<string>>(new Set());
  const [view,         setView]         = useState<"grid" | "list">("list");
  const [selected,     setSelected]     = useState<Product | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { cart, addToCart, hasClientInfo, openDevis, showToast } = useApp();

  // Mobile: default to list view
  useEffect(() => {
    if (window.innerWidth <= 768) setView("list");
  }, []);

  // Close product panel when navbar tab is clicked
  useEffect(() => {
    const handler = () => setSelected(null);
    window.addEventListener("nav:closePanel", handler);
    return () => window.removeEventListener("nav:closePanel", handler);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!sidebarRef.current?.contains(e.target as Node)) setSidebarOpen(false);
    }
    if (sidebarOpen) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [sidebarOpen]);

  const toggleBrand = (b: string) =>
    setActiveBrands((prev) => { const n = new Set(prev); n.has(b) ? n.delete(b) : n.add(b); return n; });
  const toggleType = (t: string) =>
    setActiveTypes((prev)  => { const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n; });

  const allProducts = useMemo(
    () => items.filter((i): i is Product => i.kind === "product"),
    [items]
  );

  const catCounts = useMemo(() => {
    const c: Record<string, number> = { all: allProducts.length };
    for (const p of allProducts) c[p.cat] = (c[p.cat] ?? 0) + 1;
    return c;
  }, [allProducts]);

  const filteredGrid = useMemo(() => {
    const q = search.toLowerCase().trim();
    const passes = (p: Product) => {
      if (activeCat   !== "all" && p.cat    !== activeCat)              return false;
      if (activeBrands.size > 0 && !activeBrands.has(p.marque))         return false;
      if (activeTypes.size  > 0 && !activeTypes.has(p.type))            return false;
      if (q && !p.desc.toLowerCase().includes(q) &&
               !p.ref.toLowerCase().includes(q)  &&
               !p.description.toLowerCase().includes(q))                return false;
      return true;
    };

    const result: GridItem[] = [];
    let pendingLabel: GridItem | null = null;

    for (const item of items) {
      if (item.kind === "section") {
        pendingLabel = item;
      } else if (item.kind === "info") {
        if (activeCat === "all" || item.cat === activeCat) {
          if (pendingLabel) { result.push(pendingLabel); pendingLabel = null; }
          result.push(item);
        }
      } else {
        if (passes(item)) {
          if (pendingLabel) { result.push(pendingLabel); pendingLabel = null; }
          result.push(item);
        }
      }
    }
    return result;
  }, [items, activeCat, activeBrands, activeTypes, search]);

  const visibleCount = filteredGrid.filter((i) => i.kind === "product").length;

  // Add to cart + open devis modal (from panel "Demander un devis" button)
  function handleRequestDevis(product: Product) {
    handleAddToCart(product);
    openDevis();
  }

  // Add to cart with client info gate
  function handleAddToCart(product: Product) {
    if (!hasClientInfo()) {
      showToast("⚠️ Renseignez vos coordonnées avant d'ajouter au panier.");
      openDevis();
      return;
    }
    // Don't add duplicates
    const alreadyIn = cart.some((c) => c.ref === product.ref);
    if (alreadyIn) {
      showToast(`⚠️ ${product.desc} est déjà dans le panier.`);
      return;
    }
    addToCart({ name: product.desc, ref: product.ref });
    showToast(`✓ ${product.desc} ajouté au panier`);
  }

  // Navigate to compatible reactifs
  function handleShowCompat(ref: string) {
    const compat = COMPAT_MAP[ref];
    if (!compat) return;
    setSelected(null);
    const params = new URLSearchParams();
    if (compat.cat)    params.set("cat",    compat.cat);
    if (compat.marque) params.set("marque", compat.marque);
    if (compat.q)      params.set("q",      compat.q);
    router.push(`/catalogue/reactifs?${params.toString()}`);
  }

  // ── Sidebar markup (shared desktop + mobile) ──

  const sidebarContent = (
    <div>
      {/* Specialty */}
      <div className="mb-7">
        <div className="text-[11px] font-semibold tracking-[0.6px] uppercase text-[#A9ADAA] mb-2.5 pb-2 border-b border-[#E5E3DC]">
          Spécialité
        </div>
        <div className="flex flex-col gap-1">
          {[{ value: "all", label: "Toutes les spécialités" }, ...cats].map(({ value, label }) => {
            const active = activeCat === value;
            return (
              <button
                key={value}
                onClick={() => { setActiveCat(value); setSidebarOpen(false); }}
                className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] cursor-pointer text-[14px] transition-[background] duration-[120ms] text-left w-full border-none ${
                  active
                    ? "bg-[#EDF8F1] text-[#29A864] font-medium"
                    : "text-[#6E6E6E] bg-transparent hover:bg-[#F7F6F2] hover:text-[#1B1F1D]"
                }`}
              >
                <span className="flex-1">{label}</span>
                <span className="ml-auto text-[11px] text-[#A9ADAA] bg-[#EFEDE6] px-[7px] py-[1px] rounded-full">
                  {catCounts[value] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-7">
        <div className="text-[11px] font-semibold tracking-[0.6px] uppercase text-[#A9ADAA] mb-2.5 pb-2 border-b border-[#E5E3DC]">
          Marque
        </div>
        <div className="flex flex-col gap-1">
          {brands.map(({ value, label }) => {
            const active = activeBrands.has(value);
            return (
              <button
                key={value}
                onClick={() => toggleBrand(value)}
                className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] cursor-pointer text-[14px] transition-[background] duration-[120ms] text-left w-full border-none ${
                  active ? "bg-[#EDF8F1] text-[#29A864] font-medium" : "text-[#6E6E6E] bg-transparent hover:bg-[#F7F6F2] hover:text-[#1B1F1D]"
                }`}
              >
                <FilterCheck active={active} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Type */}
      {showTypeFilter && (
        <div className="mb-7">
          <div className="text-[11px] font-semibold tracking-[0.6px] uppercase text-[#A9ADAA] mb-2.5 pb-2 border-b border-[#E5E3DC]">
            Type
          </div>
          <div className="flex flex-col gap-1">
            {[
              { value: "reactif",     label: "Réactifs" },
              { value: "controle",    label: "Contrôles & Calibrants" },
              { value: "consommable", label: "Consommables" },
            ].map(({ value, label }) => {
              const active = activeTypes.has(value);
              return (
                <button
                  key={value}
                  onClick={() => toggleType(value)}
                  className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] cursor-pointer text-[14px] transition-[background] duration-[120ms] text-left w-full border-none ${
                    active ? "bg-[#EDF8F1] text-[#29A864] font-medium" : "text-[#6E6E6E] bg-transparent hover:bg-[#F7F6F2] hover:text-[#1B1F1D]"
                  }`}
                >
                  <FilterCheck active={active} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="
        grid min-[900px]:[grid-template-columns:260px_1fr]
        max-w-[1280px] mx-auto px-12 py-10 gap-8
        min-h-[calc(100vh-68px)]
        max-[1024px]:px-6 max-[1024px]:py-8
        max-[900px]:px-5 max-[900px]:gap-0 max-[900px]:py-5
        max-[600px]:px-4 max-[600px]:py-3
      "
    >
      {/* ── Sidebar desktop ── */}
      <aside
        className="
          pt-1 sticky top-[84px] max-h-[calc(100vh-100px)] overflow-y-auto
          hidden min-[900px]:block
          [scrollbar-width:thin] [scrollbar-color:#E5E3DC_transparent]
        "
      >
        {sidebarContent}
      </aside>

      {/* ── Sidebar mobile overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[800] min-[900px]:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.15)" }}
            onClick={() => setSidebarOpen(false)}
          />
          <div
            ref={sidebarRef}
            className="absolute top-[68px] left-0 right-0 bg-white border-b border-[#E5E3DC] shadow-[0_0_40px_rgba(0,0,0,0.15)] p-5 overflow-y-auto max-h-[calc(100vh-68px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full text-left py-2.5 px-4 mb-4 border border-[#E5E3DC] rounded-lg bg-white text-[14px] font-medium text-[#6E6E6E] cursor-pointer hover:border-[#29A864] hover:text-[#29A864] transition-colors"
            >
              ✕ Fermer les filtres
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* ── Main area ── */}
      <main>
        {/* Sticky search bar */}
        <div className="sticky top-[68px] z-20 bg-white pb-3 pt-1 -mx-1 px-1">
          <div className="relative">
            <svg
              viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#29A864] pointer-events-none"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="M13.5 13.5l3 3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit, une référence…"
              className="
                w-full pl-10 pr-4 py-3
                border-2 border-[#29A864] rounded-xl
                text-[14px] bg-white outline-none
                placeholder:text-[#A9ADAA]
                focus:shadow-[0_0_0_3px_rgba(41,168,100,0.15)]
                transition-shadow duration-150
              "
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A9ADAA] hover:text-[#1B1F1D] transition-colors text-[18px] leading-none bg-transparent border-none cursor-pointer"
                aria-label="Effacer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            hidden max-[900px]:flex items-center gap-2
            w-full px-4 py-2.5 mb-4
            border border-[#E5E3DC] rounded-lg bg-white
            text-[14px] font-medium text-[#6E6E6E]
            cursor-pointer hover:border-[#29A864] hover:text-[#29A864] transition-colors
          "
        >
          ⚙ Filtres
        </button>

        {/* Back link */}
        {backHref && (
          <Link
            href={backHref}
            className="
              inline-flex items-center gap-1.5 mb-5
              text-[13px] font-medium text-[#A9ADAA] no-underline
              hover:text-[#29A864] transition-colors duration-150
            "
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="w-[15px] h-[15px]" aria-hidden="true">
              <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour
          </Link>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-7 gap-4 max-[600px]:mb-4">
          <h1 className="font-serif text-[28px] max-[600px]:text-[22px]">{title}</h1>
          <div className="flex gap-1">
            <button
              title="Grille"
              onClick={() => setView("grid")}
              className={`w-[34px] h-[34px] max-[900px]:w-11 max-[900px]:h-11 border rounded-[7px] flex items-center justify-center cursor-pointer transition-all duration-[120ms] ${
                view === "grid" ? "bg-[#29A864] border-[#29A864] text-white" : "bg-white border-[#E5E3DC] text-[#6E6E6E]"
              }`}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
            <button
              title="Liste"
              onClick={() => setView("list")}
              className={`w-[34px] h-[34px] max-[900px]:w-11 max-[900px]:h-11 border rounded-[7px] flex items-center justify-center cursor-pointer transition-all duration-[120ms] ${
                view === "list" ? "bg-[#29A864] border-[#29A864] text-white" : "bg-white border-[#E5E3DC] text-[#6E6E6E]"
              }`}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <line x1="1" y1="4" x2="15" y2="4" strokeLinecap="round" />
                <line x1="1" y1="8" x2="15" y2="8" strokeLinecap="round" />
                <line x1="1" y1="12" x2="15" y2="12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-[13px] text-[#A9ADAA] mb-5">
          {visibleCount} produit{visibleCount !== 1 ? "s" : ""} disponible{visibleCount !== 1 ? "s" : ""}
        </div>

        {/* Product grid / list */}
        {visibleCount === 0 ? (
          <div className="text-center py-16 text-[#6E6E6E]">
            <p className="text-[40px] mb-3">🔍</p>
            <p className="text-[16px]">Aucun produit ne correspond à vos critères.</p>
            <button
              className="mt-4 text-[14px] text-[#29A864] underline cursor-pointer bg-transparent border-none"
              onClick={() => {
                setSearch("");
                setActiveCat("all");
                setActiveBrands(new Set());
                setActiveTypes(new Set());
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div
            className={view === "list" ? "flex flex-col gap-0" : ""}
            style={
              view === "grid"
                ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }
                : undefined
            }
          >
            {(() => {
              let currentSection = "";
              return filteredGrid.map((item, i) => {
                if (item.kind === "section") {
                  currentSection = item.label;
                  return (
                    <div
                      key={`label-${i}`}
                      className="
                        col-span-full flex items-center gap-3.5
                        text-[13px] font-black text-[#1B1F1D] uppercase tracking-[0.7px]
                        mt-8 mb-1 px-4 py-3
                        bg-[#EDF8F1] rounded-[10px]
                        border-l-[6px] border-[#15623A] outline outline-2 outline-[#15623A]
                        sticky top-[128px] z-10
                      "
                      style={i === 0 ? { marginTop: 0 } : {}}
                    >
                      {item.label}
                    </div>
                  );
                }
                if (item.kind === "info") {
                  const [title, ...rest] = (item as InfoBlock).text.split("\n\n");
                  return (
                    <div key={`info-${i}`} className="col-span-full bg-white border border-[#E5E3DC] rounded-xl p-5">
                      <p className="text-[14px] font-semibold text-[#1B1F1D] mb-2">{title}</p>
                      {rest.map((part, j) => (
                        <p key={j} className="text-[13px] text-[#6E6E6E] leading-[1.7]">{part}</p>
                      ))}
                    </div>
                  );
                }
                const sectionForCard = currentSection;
                return (
                  <ProductCard
                    key={`${item.ref}-${item.desc}-${i}`}
                    product={item}
                    isList={view === "list"}
                    onSelect={(p) => { setSelected(p); setSelectedSection(sectionForCard); } }
                    onAddToCart={handleAddToCart}
                  />
                );
              });
            })()}
          </div>
        )}
      </main>

      {/* Full-screen product page */}
      {selected && (
        <ProductPage
          product={selected}
          sectionLabel={selectedSection || CAT_LABELS[selected.cat] || selected.cat}
          onClose={() => setSelected(null)}
          onAddToCart={handleAddToCart}
          onRequestDevis={handleRequestDevis}
          onShowCompat={handleShowCompat}
        />
      )}
    </div>
  );
}
