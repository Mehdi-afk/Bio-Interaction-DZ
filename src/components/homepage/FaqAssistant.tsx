"use client";

import { useState, useMemo, useEffect } from "react";
import { useApp } from "@/src/context/AppContext";
import { FAQ_ITEMS, type FaqItem } from "@/src/data/faq";

// ── Moteur de correspondance local ─────────────────────────────────────────────
// 100 % côté navigateur : aucune requête réseau, aucune IA, aucune clé API.

const STOPWORDS = new Set([
  "le", "la", "les", "un", "une", "des", "de", "du", "au", "aux", "et", "ou", "a", "en",
  "dans", "est", "sont", "vous", "je", "tu", "il", "elle", "on", "nous", "ils", "elles",
  "ce", "cet", "cette", "ces", "mon", "ma", "mes", "votre", "vos", "notre", "nos", "que",
  "qui", "quoi", "quel", "quelle", "quels", "quelles", "comment", "pour", "par", "sur",
  "avec", "sans", "pas", "ne", "se", "si", "me", "te", "plus", "mais", "donc", "car",
  "puis", "faire", "fait", "etre", "avoir", "tout", "toute", "toutes", "tous",
]);

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les diacritiques (accents)
    .replace(/[^a-z0-9\s]/g, " ")    // retire la ponctuation
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s: string): string[] {
  return normalize(s)
    .split(" ")
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

// Index pré-calculé une seule fois (FAQ_ITEMS est statique).
const INDEX = FAQ_ITEMS.map((item) => ({
  item,
  qTokens: new Set(tokenize(item.q)),
  kTokens: new Set((item.keywords ?? []).flatMap((k) => tokenize(k))),
}));

function matches(token: string, set: Set<string>): boolean {
  if (set.has(token)) return true;
  for (const c of set) {
    if (token.length >= 4 && c.includes(token)) return true;
    if (c.length >= 4 && token.includes(c)) return true;
  }
  return false;
}

function rankFaq(query: string): FaqItem[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  return INDEX
    .map(({ item, qTokens, kTokens }) => {
      let score = 0;
      for (const t of tokens) {
        if (matches(t, kTokens)) score += 3;
        else if (matches(t, qTokens)) score += 1;
      }
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item);
}

// Suggestions affichées tant que le champ est vide.
const SUGGESTIONS: { label: string; query: string }[] = [
  { label: "Demander un devis", query: "devis" },
  { label: "Délais de livraison", query: "livraison" },
  { label: "Service après-vente", query: "sav" },
  { label: "Installation & formation", query: "installation" },
  { label: "Nos marques", query: "marques" },
  { label: "Nous contacter", query: "contact" },
];

// ── Icônes ─────────────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" />
      <path d="M14 14l3.5 3.5" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

// ── Composant ──────────────────────────────────────────────────────────────────

export default function FaqAssistant() {
  const { openDevis, openContact } = useApp();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(() => rankFaq(query), [query]);
  const hasQuery = query.trim().length > 0;

  // À chaque changement de requête : ouvrir automatiquement la meilleure réponse.
  useEffect(() => {
    setOpenId(results.length ? results[0].id : null);
  }, [results]);

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section className="relative bg-black text-white px-6 py-28 overflow-hidden max-[600px]:py-20 max-[600px]:px-4">
      {/* Radial glow — identique au Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 1000px 700px at 50% 65%, rgba(41,168,100,0.16) 0%, transparent 70%)" }}
      />
      {/* Subtle grid — identique au Hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-[720px] mx-auto">

        {/* En-tête */}
        <div className="reveal text-center mb-9">
          <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
            Questions fréquentes
          </span>
          <h2
            className="font-serif text-white leading-[1.1] mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            Une question ?{" "}
            <em className="text-[#29A864] not-italic">Demandez à notre assistant.</em>
          </h2>
          <p className="text-white/55 leading-[1.7] mx-auto max-w-[480px]" style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}>
            Tapez quelques mots — livraison, SAV, devis… — et obtenez une réponse immédiate.
          </p>
        </div>

        {/* Champ de saisie */}
        <div className="reveal reveal-d1">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex : délais de livraison, SAV, devis…"
              aria-label="Poser une question à l'assistant FAQ"
              className="
                w-full pl-12 pr-11 py-4 rounded-2xl
                bg-white/[0.06] border border-white/[0.14]
                text-[15px] text-white placeholder:text-white/40
                outline-none transition-[background,border-color,box-shadow] duration-150
                focus:bg-white/[0.09] focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.18)]
              "
            />
            {hasQuery && (
              <button
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 4L4 12M4 4l8 8" />
                </svg>
              </button>
            )}
          </div>

          {/* Suggestions (champ vide) */}
          {!hasQuery && (
            <div className="flex flex-wrap gap-2 justify-center mt-5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.query}
                  onClick={() => setQuery(s.query)}
                  className="
                    px-4 py-2 rounded-full
                    border border-white/[0.14] bg-white/[0.05]
                    text-[13px] font-medium text-white/70
                    hover:border-[#29A864] hover:text-[#29A864] hover:-translate-y-0.5
                    transition-[color,border-color,transform] duration-150
                  "
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Résultats */}
        {hasQuery && (
          <div className="mt-6" aria-live="polite">
            {results.length > 0 ? (
              <>
                <p className="text-[12px] text-white/40 mb-3 px-1">
                  {results.length} réponse{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {results.map((item) => {
                    const open = openId === item.id;
                    return (
                      <li
                        key={item.id}
                        className={`border rounded-xl overflow-hidden transition-colors duration-150 ${
                          open ? "border-[#29A864]/40 bg-[#29A864]/[0.08]" : "border-white/[0.1] bg-white/[0.04]"
                        }`}
                      >
                        <button
                          onClick={() => toggle(item.id)}
                          aria-expanded={open}
                          className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 cursor-pointer"
                        >
                          <span className="text-[15px] font-semibold text-white leading-snug">
                            {item.q}
                          </span>
                          <span className={open ? "text-[#29A864]" : "text-white/40"}>
                            <IconChevron open={open} />
                          </span>
                        </button>
                        <div
                          className="grid transition-[grid-template-rows] duration-300 ease-out"
                          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <p className="px-5 pb-5 text-white/60 text-[14px] leading-[1.75]">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              /* Aucune correspondance */
              <div className="text-center border border-white/[0.1] rounded-2xl bg-white/[0.04] px-6 py-10">
                <p className="text-white text-[15px] font-semibold mb-2">
                  Aucune réponse ne correspond à votre recherche.
                </p>
                <p className="text-white/55 text-[14px] leading-[1.7] mb-6 max-w-[420px] mx-auto">
                  Notre équipe se fera un plaisir de vous répondre directement.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={openContact}
                    className="
                      inline-flex items-center px-6 py-3 rounded-full
                      bg-[#29A864] text-white text-[14px] font-semibold cursor-pointer
                      transition-[background,transform] duration-150
                      hover:bg-[#48BC7E] hover:-translate-y-0.5
                    "
                  >
                    Nous contacter
                  </button>
                  <button
                    onClick={openDevis}
                    className="
                      inline-flex items-center px-6 py-3 rounded-full
                      bg-white/[0.07] text-white text-[14px] font-semibold
                      border border-white/[0.14] cursor-pointer
                      transition-[background,transform] duration-150
                      hover:bg-white/[0.13] hover:-translate-y-0.5
                    "
                  >
                    Demander un devis
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
