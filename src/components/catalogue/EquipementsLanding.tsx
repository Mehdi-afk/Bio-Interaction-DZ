"use client";

import Link from "next/link";
import { EQUIPEMENTS } from "@/src/data/products-equip";

const CATS = [
  { value: "biochimie",    label: "Biochimie Clinique",        icon: "⚗️",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "hematologie",  label: "Hématologie",               icon: "🩸",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "hemostase",    label: "Hémostase",                 icon: "💉",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "urines",       label: "Analyse des Urines",        icon: "🧫",  bg: "#E6EEF8", color: "#004B9D", iconBg: "#BDD1EF" },
  { value: "autoimmunite", label: "Auto-Immunité",             icon: "🛡️", bg: "#E5F3F7", color: "#0082A0", iconBg: "#B8DCE8" },
];

const COUNTS: Record<string, number> = {};
let TOTAL = 0;
for (const item of EQUIPEMENTS) {
  if (item.kind === "product") {
    COUNTS[item.cat] = (COUNTS[item.cat] ?? 0) + 1;
    TOTAL++;
  }
}

export default function EquipementsLanding() {
  return (
    <div className="max-w-[1200px] mx-auto px-12 py-16 max-[1024px]:px-6 max-[1024px]:py-12 max-[600px]:px-4 max-[600px]:py-9">

      <div className="mb-12 max-[600px]:mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-[38px] mb-3 max-[600px]:text-[28px]">
            Analyseurs & instruments
          </h1>
          <p className="text-[#6E6E6E] text-[16px]">
            Sélectionnez une spécialité pour explorer nos équipements.
          </p>
        </div>
        <Link
          href="/catalogue/equipements?all=1"
          className="
            shrink-0 inline-flex items-center gap-2 px-5 py-2.5
            border border-[#E5E3DC] rounded-xl bg-white no-underline
            text-[14px] font-medium text-[#6E6E6E]
            transition-all duration-150
            hover:border-[#29A864] hover:text-[#29A864] hover:bg-[#EDF8F1]
          "
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
            <rect x="2" y="2" width="7" height="7" rx="1"/><rect x="11" y="2" width="7" height="7" rx="1"/>
            <rect x="2" y="11" width="7" height="7" rx="1"/><rect x="11" y="11" width="7" height="7" rx="1"/>
          </svg>
          Voir tous les équipements
          <span className="text-[12px] px-1.5 py-0.5 bg-[#F7F6F2] rounded-full text-[#A9ADAA]">
            {TOTAL}
          </span>
        </Link>
      </div>

      <div className="
        grid grid-cols-3 gap-5
        max-[900px]:grid-cols-2
        max-[480px]:grid-cols-1 max-[480px]:gap-3
      ">
        {CATS.map((cat) => (
          <Link
            key={cat.value}
            href={`/catalogue/equipements?cat=${cat.value}`}
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
              {COUNTS[cat.value] ?? 0} instrument{(COUNTS[cat.value] ?? 0) > 1 ? "s" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
