"use client";

import Link from "next/link";

export const SECTION_DISPLAY: Record<string, string> = {
  "Biochimie Clinique - Reactifs Systeme Ferme":          "Réactifs Système Fermé",
  "Biochimie Clinique - Controles et Calibrants":          "Contrôles & Calibrants",
  "Biochimie Clinique - Reactifs Systeme Ouvert":          "Réactifs Système Ouvert",
  "Biochimie Clinique - Reactifs Ionogramme EC 90":        "Réactifs Ionogramme EC 90",
  "Hematologie -Reactifs H360":                            "Réactifs H360",
  "Hematologie -Reactifs H560":                            "Réactifs H560",
  "Hematologie -Reactifs ELITE 580":                       "Réactifs ELITE 580",
  "Hematologie -Reactifs H7100":                           "Réactifs H7100",
  "Hemostase - Reactifs ECL":                              "Réactifs ECL",
  "Urines -Reactifs LAURA Smart":                          "Réactifs LAURA Smart",
  "Urines -Reactifs LAURA XL":                             "Réactifs LAURA XL",
  "Auto-Immunite -ELISA Manuel":                           "ELISA Manuel",
  "Auto-Immunite -DOT Manuel":                             "DOT Manuel",
  "Auto-Immunite -IFI Manuel":                             "IFI Manuel",
  "Auto-Immunite -Reactifs DOT Automatises":               "Réactifs DOT Automatisés",
  "Auto-Immunite -Reactifs IFI Automatises AKLIDES":       "Réactifs IFI Automatisés AKLIDES",
  "Auto-Immunite - Reactifs CLIA":                         "Réactifs CLIA",
  "Allergie : BioCLIA 1900 & 500":                         "Réactifs BioCLIA",
  "Allergie - Reactifs BioLINE DOT":                       "Réactifs BioLINE DOT",
  "Parasitologie -Western Blot":                           "Western Blot",
  "Parasitologie -Tests Rapides ICT":                      "Tests Rapides ICT",
};

const CAT_META: Record<string, { label: string; bg: string; color: string; iconBg: string }> = {
  biochimie:    { label: "Biochimie Clinique",        bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  hematologie:  { label: "Hématologie",               bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  hemostase:    { label: "Hémostase",                 bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  urines:       { label: "Analyse des Urines",        bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  autoimmunite: { label: "Auto-Immunité",             bg: "#E5F3F7", color: "#0082A0", iconBg: "#B8DCE8" },
  allergie:     { label: "Allergie",                  bg: "#E5F3F7", color: "#0082A0", iconBg: "#B8DCE8" },
  parasitologie:{ label: "Parasitologie & Mycologie", bg: "#F8E8EC", color: "#B30C2F", iconBg: "#EDBBCA" },
};

export type SubSection = { label: string; count: number };

export default function ReactifsSubcategoryLanding({
  cat,
  sections,
}: {
  cat: string;
  sections: SubSection[];
}) {
  const meta = CAT_META[cat] ?? { label: cat, bg: "#F3F4F6", color: "#374151", iconBg: "#E5E7EB" };

  return (
    <div className="max-w-[1200px] mx-auto px-12 py-16 max-[1024px]:px-6 max-[1024px]:py-12 max-[600px]:px-4 max-[600px]:py-9">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-[#A9ADAA] mb-8">
        <Link href="/catalogue/reactifs" className="hover:text-[#29A864] transition-colors no-underline">
          Réactifs
        </Link>
        <span>›</span>
        <span className="text-[#1B1F1D] font-medium">{meta.label}</span>
      </div>

      {/* Header */}
      <div className="mb-10 max-[600px]:mb-7">
        <h1 className="font-serif text-[38px] mb-3 max-[600px]:text-[28px]">
          {meta.label}
        </h1>
        <p className="text-[#6E6E6E] text-[16px]">
          Sélectionnez une sous-catégorie pour explorer les références.
        </p>
      </div>

      {/* Sub-category grid */}
      <div className="
        grid grid-cols-3 gap-4
        max-[1024px]:grid-cols-2
        max-[480px]:grid-cols-1 max-[480px]:gap-3
      ">
        {sections.map((sec) => {
          const displayName = SECTION_DISPLAY[sec.label] ?? sec.label;
          const href = `/catalogue/reactifs?cat=${cat}&section=${encodeURIComponent(sec.label)}`;
          return (
            <Link
              key={sec.label}
              href={href}
              className="
                group flex items-center justify-between
                bg-white border border-[#E5E3DC] rounded-xl px-5 py-4 no-underline
                transition-all duration-200
                hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[#BDD0EA] hover:-translate-y-0.5
              "
            >
              <div>
                <h3 className="text-[14px] font-semibold text-[#1B1F1D] mb-1.5 leading-[1.4]">
                  {displayName}
                </h3>
                <span
                  className="inline-block text-[11px] font-semibold tracking-[0.4px] uppercase px-2 py-[2px] rounded-full"
                  style={{ background: meta.bg, color: meta.color }}
                >
                  {sec.count} références
                </span>
              </div>
              <svg
                viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}
                className="w-4 h-4 text-[#A9ADAA] shrink-0 ml-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M8 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
