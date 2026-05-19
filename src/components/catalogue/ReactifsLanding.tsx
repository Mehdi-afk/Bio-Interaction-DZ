"use client";

import Link from "next/link";
import { REACTIFS } from "@/src/data/products-reactifs";

// Colors derived from supplier brand logos:
// ERBA Mannheim (blue) → biochimie, hematologie, hemostase, urines
// Generic Assays / Medipan (magenta) → elisa
// HOB Biotech (teal) → autoimmunite, allergie
// LDBIO Diagnostics (red) → parasitologie
const CATS = [
  { value: "biochimie",     label: "Biochimie Clinique",        icon: "⚗️",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "hematologie",   label: "Hématologie",               icon: "🩸",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "hemostase",     label: "Hémostase",                 icon: "💉",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "urines",        label: "Analyse des Urines",        icon: "🧫",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "autoimmunite",  label: "Auto-Immunité",             icon: "🛡️", bg: "#E5F3F7", color: "#0082A0", iconBg: "#B8DCE8" },
  { value: "allergie",      label: "Allergie",                  icon: "🌿",  bg: "#E5F3F7", color: "#0082A0", iconBg: "#B8DCE8" },
  { value: "parasitologie", label: "Parasitologie & Mycologie", icon: "🦠",  bg: "#F8E8EC", color: "#B30C2F", iconBg: "#EDBBCA" },
];

export default function ReactifsLanding() {
  const counts: Record<string, number> = {};
  for (const item of REACTIFS) {
    if (item.kind === "product") {
      counts[item.cat] = (counts[item.cat] ?? 0) + 1;
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-12 py-16 max-[1024px]:px-6 max-[1024px]:py-12 max-[600px]:px-4 max-[600px]:py-9">

      <div className="mb-12 max-[600px]:mb-8">
        <h1 className="font-serif text-[38px] mb-3 max-[600px]:text-[28px]">
          Réactifs de laboratoire
        </h1>
        <p className="text-[#6E6E6E] text-[16px]">
          Sélectionnez une spécialité pour explorer nos références.
        </p>
      </div>

      <div className="
        grid grid-cols-4 gap-5
        max-[1024px]:grid-cols-3
        max-[768px]:grid-cols-2
        max-[480px]:grid-cols-1 max-[480px]:gap-3
      ">
        {CATS.map((cat) => (
          <Link
            key={cat.value}
            href={`/catalogue/reactifs?cat=${cat.value}`}
            className="
              bg-[#F7F6F2] border border-[#E5E3DC] rounded-2xl p-6 no-underline
              transition-all duration-200
              hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5
            "
          >
            <div
              className="w-11 h-11 rounded-[10px] flex items-center justify-center mb-4 text-[22px]"
              style={{ background: cat.iconBg }}
              aria-hidden="true"
            >
              {cat.icon}
            </div>
            <h3 className="text-[15px] font-semibold text-[#1B1F1D] mb-3 leading-[1.4]">
              {cat.label}
            </h3>
            <span
              className="inline-block text-[11px] font-semibold tracking-[0.4px] uppercase px-2.5 py-[3px] rounded-full"
              style={{ background: cat.bg, color: cat.color }}
            >
              {counts[cat.value] ?? 0} références
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
