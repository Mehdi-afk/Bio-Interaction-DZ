"use client";

import Link from "next/link";
import { EQUIPEMENTS } from "@/src/data/products-equip";

// ── SVG icons — feather-style 24×24 ──────────────────────────────────────────

function IconFlask({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 3h6M10 3v5L6 16a4 4 0 0 0 .5 5 4 4 0 0 0 3 1h5a4 4 0 0 0 3-1 4 4 0 0 0 .5-5L14 8V3"/>
      <line x1="6.5" y1="14" x2="17.5" y2="14"/>
    </svg>
  );
}
function IconDrop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2C8.5 6.5 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-3.5-8.5-7-13z"/>
    </svg>
  );
}
function IconWave({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 12c1.5-3 3-4.5 4.5-4.5S9 9 10.5 9 13.5 7.5 15 7.5s3 1.5 4.5 4.5"/>
      <path d="M2 18c1.5-3 3-4.5 4.5-4.5S9 15 10.5 15s3-1.5 4.5-1.5 3 1.5 4.5 4.5"/>
    </svg>
  );
}
function IconTube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 3h6v11l3 4H6l3-4V3z"/>
      <line x1="9" y1="10" x2="15" y2="10"/>
    </svg>
  );
}
function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}

type CatDef = {
  value: string;
  label: string;
  Icon: ({ className }: { className?: string }) => React.ReactElement | null;
  accent: string;
  bg: string;
};

const CATS: CatDef[] = [
  { value: "biochimie",    label: "Biochimie Clinique",  Icon: IconFlask,       accent: "#004B9D", bg: "#E6EEF8" },
  { value: "hematologie",  label: "Hématologie",         Icon: IconDrop,        accent: "#004B9D", bg: "#E6EEF8" },
  { value: "hemostase",    label: "Hémostase",           Icon: IconWave,        accent: "#004B9D", bg: "#E6EEF8" },
  { value: "urines",       label: "Analyse des Urines",  Icon: IconTube,        accent: "#004B9D", bg: "#E6EEF8" },
  { value: "autoimmunite", label: "Auto-Immunité / Allergie", Icon: IconShieldCheck, accent: "#0082A0", bg: "#E5F3F7" },
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
    <>
      {/* ── Header sombre ──────────────────────────────────────── */}
      <section className="bg-[#1D1D1F] py-20 px-12 max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-14 border-b border-white/[0.07]">
        <div className="max-w-[1200px] mx-auto flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="reveal block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
              Catalogue Équipements
            </span>
            <h1
              className="reveal reveal-d1 font-serif text-white leading-[1.08]"
              style={{ fontSize: "clamp(30px, 5vw, 58px)" }}
            >
              Analyseurs &amp; instruments
            </h1>
            <p className="reveal reveal-d2 text-white/40 text-[15px] mt-3 max-w-[380px]">
              Sélectionnez une spécialité pour explorer nos équipements.
            </p>
          </div>
          <Link
            href="/catalogue/equipements?all=1"
            className="
              reveal shrink-0 inline-flex items-center gap-2 px-5 py-3
              border border-white/15 rounded-full bg-white/5 no-underline
              text-[14px] font-medium text-white/70
              transition-all duration-150
              hover:border-[#29A864]/60 hover:text-[#29A864] hover:bg-[#29A864]/8
            "
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <rect x="2" y="2" width="7" height="7" rx="1"/><rect x="11" y="2" width="7" height="7" rx="1"/>
              <rect x="2" y="11" width="7" height="7" rx="1"/><rect x="11" y="11" width="7" height="7" rx="1"/>
            </svg>
            Voir tous les équipements
            <span className="text-[12px] px-2 py-0.5 bg-white/8 rounded-full text-white/40">
              {TOTAL}
            </span>
          </Link>
        </div>
      </section>

      {/* ── Grille catégories ─────────────────────────────────── */}
      <section className="bg-[#F5F5F7] py-16 px-12 max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 max-[480px]:gap-3">
            {CATS.map(({ value, label, Icon, accent, bg }, i) => (
              <Link
                key={value}
                href={`/catalogue/equipements?cat=${value}`}
                style={{ transitionDelay: `${i * 65}ms` }}
                className="
                  reveal-scale group bg-white border border-[#E5E3DC] rounded-2xl p-7 no-underline
                  transition-all duration-200
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-1 hover:border-transparent
                "
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: bg, color: accent }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-[16px] font-semibold text-[#1B1F1D] mb-3 leading-[1.35] group-hover:text-[#004B9D] transition-colors">
                  {label}
                </h3>

                <div className="flex items-center justify-between">
                  <span
                    className="inline-block text-[11px] font-semibold tracking-[0.4px] uppercase px-2.5 py-[3px] rounded-full"
                    style={{ background: bg, color: accent }}
                  >
                    {COUNTS[value] ?? 0} instrument{(COUNTS[value] ?? 0) > 1 ? "s" : ""}
                  </span>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#A9ADAA] group-hover:text-[#29A864] group-hover:translate-x-0.5 transition-all" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
