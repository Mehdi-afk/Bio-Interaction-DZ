import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CardGrid from "@/src/components/CardGrid";
import DevisButton from "@/src/components/DevisButton";

// ── SEO ───────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Votre partenaire de confiance pour l'approvisionnement en équipement, réactif et consommable de laboratoire d'analyse médical.",
};

// ── Static data ───────────────────────────────────────────────────────────────

const STATS = [
  { value: "370+",  label: "Produits en Nos Produit" },
  { value: "200+",  label: "Clients actifs" },
  { value: "48h",   label: "Délai moyen de livraison" },
  { value: "10 ans", label: "D'expertise sectorielle" },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <section
        className="
          grid grid-cols-2 items-center gap-[60px]
          py-20 px-12
          max-w-[1200px] mx-auto
          min-h-[calc(100vh-68px)]
          border-b border-[#E5E3DC]
          max-[1024px]:px-6 max-[1024px]:py-[60px] max-[1024px]:gap-10
          max-[900px]:grid-cols-1 max-[900px]:px-5 max-[900px]:py-10
          max-[900px]:gap-8 max-[900px]:min-h-0
          max-[600px]:px-4 max-[600px]:pt-7 max-[600px]:pb-6 max-[600px]:gap-6
        "
      >
        {/* ── Left : texte ── */}
        <div>
          {/* Logo au-dessus du tag */}
          <div className="mb-5">
            <Image
              src="/images/icon-color.svg"
              width={80}
              height={80}
              alt="BioInteraction"
              priority
            />
          </div>

          {/* Tag "depuis 2016" */}
          <div className="inline-flex items-center gap-1.5 bg-[#EDF8F1] text-[#15623A] text-[12px] font-semibold tracking-[0.6px] uppercase px-3 py-[5px] rounded-full mb-6">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5" aria-hidden="true">
              <circle cx="7" cy="7" r="5" />
              <path d="M7 4v3l2 2" />
            </svg>
            Spécialiste de la distribution depuis 2016
          </div>

          {/* Titre principal */}
          <h1
            className="
              font-serif text-[52px] leading-[1.12] mb-5
              max-[1024px]:text-[42px]
              max-[900px]:text-[34px]
              max-[600px]:text-[28px]
            "
          >
            Réactifs &amp; Équipements pour votre{" "}
            <em className="text-[#29A864] not-italic">laboratoire</em>
          </h1>

          {/* Sous-titre */}
          <p
            className="
              text-[#6E6E6E] text-[17px] leading-[1.7] mb-10 max-w-[480px]
              max-[900px]:text-[15px] max-[900px]:max-w-full
              max-[600px]:text-sm
            "
          >
            Votre partenaire de confiance pour l&apos;approvisionnement en équipement,
            réactif et consommable de laboratoire d&apos;analyses médicales.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-3 flex-wrap max-[600px]:flex-col">
            <Link
              href="/catalogue/equipements"
              className="
                inline-flex items-center py-3 px-7
                bg-[#29A864] text-white no-underline
                border-none rounded-[9px] text-[15px] font-medium
                transition-[background-color,transform] duration-150
                hover:bg-[#48BC7E] hover:-translate-y-px
                max-[600px]:w-full max-[600px]:justify-center
              "
            >
              Voir Nos Produit →
            </Link>

            <DevisButton
              label="Demander un devis"
              className="
                inline-flex items-center py-3 px-7
                bg-transparent text-[#29A864]
                border-[1.5px] border-[#29A864] rounded-[9px] text-[15px] font-medium
                transition-all duration-150 cursor-pointer
                hover:bg-[#EDF8F1]
                max-[600px]:w-full max-[600px]:justify-center
              "
            />
          </div>
        </div>

        {/* ── Right : hero cards ── */}
        <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1 max-[600px]:gap-3">

          {/* Card Réactifs — décalée vers le bas sur desktop */}
          <Link
            href="/catalogue/reactifs"
            className="
              bg-[#F7F6F2] border border-[#E5E3DC] rounded-2xl p-6 px-5 no-underline
              transition-all duration-200
              hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5
              mt-6 max-[900px]:mt-0
            "
          >
            <div
              className="w-11 h-11 rounded-[10px] flex items-center justify-center mb-4 text-[22px]"
              style={{ background: "#eef6e2" }}
              aria-hidden="true"
            >
              🧪
            </div>
            <h3 className="text-[15px] font-semibold text-[#1B1F1D] mb-1.5">
              Réactifs de laboratoire
            </h3>
            <p className="text-[13px] text-[#6E6E6E] leading-[1.55]">
              Biochimie Clinique · Hématologie · Hémostase · Analyse des Urines
            </p>
            <span
              className="inline-block mt-3 text-[11px] font-semibold tracking-[0.4px] uppercase px-2.5 py-[3px] rounded-full"
              style={{ background: "#EDF8F1", color: "#29A864" }}
            >
              +353 RÉFÉRENCES
            </span>
          </Link>

          {/* Card Équipements — décalée vers le haut sur desktop */}
          <Link
            href="/catalogue/equipements"
            className="
              bg-[#F7F6F2] border border-[#E5E3DC] rounded-2xl p-6 px-5 no-underline
              transition-all duration-200
              hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-0.5
              -mt-6 max-[900px]:mt-0
            "
          >
            <div
              className="w-11 h-11 rounded-[10px] flex items-center justify-center mb-4 text-[22px]"
              style={{ background: "#dff0c4" }}
              aria-hidden="true"
            >
              🔬
            </div>
            <h3 className="text-[15px] font-semibold text-[#1B1F1D] mb-1.5">
              Équipements de laboratoire
            </h3>
            <p className="text-[13px] text-[#6E6E6E] leading-[1.55]">
              Biochimie Clinique · Hématologie · Hémostase · Analyse des Urines · Chaîne ELISA · Auto-Immunité
            </p>
            <span
              className="inline-block mt-3 text-[11px] font-semibold tracking-[0.4px] uppercase px-2.5 py-[3px] rounded-full"
              style={{ background: "#D2EFDF", color: "#15623A" }}
            >
              +20 MODÈLES
            </span>
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════
          NOS GAMMES DE PRODUITS
          ════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto py-20 px-12 max-[1024px]:px-6 max-[1024px]:py-[60px] max-[600px]:py-9 max-[600px]:px-4">
        <div className="mb-10">
          <h2
            className="font-serif text-[34px] mb-2 max-[600px]:text-[26px]"
          >
            Nos gammes de produits
          </h2>
          <p className="text-[#6E6E6E] text-[16px]">
            Des solutions complètes pour chaque application analytique et de recherche.
          </p>
        </div>

        {/* CardGrid gère ses propres données et son responsive */}
        <CardGrid />
      </section>

      {/* ════════════════════════════════════════
          CTA BAND  (masquée sur mobile ≤ 600px)
          ════════════════════════════════════════ */}
      <div className="bg-[#F7F6F2] border-t border-b border-[#E5E3DC] max-[600px]:hidden">
        <div className="max-w-[1200px] mx-auto py-16 px-12 flex items-center justify-between gap-10 max-[1024px]:px-6 max-[1024px]:py-12">
          <div>
            <h2 className="font-serif text-[30px] mb-2">
              Un produit spécifique en tête&nbsp;?
            </h2>
            <p className="text-[#6E6E6E] max-w-[480px]">
              Notre équipe technique est disponible pour vous orienter vers la solution
              la mieux adaptée à vos besoins et préparer un devis personnalisé.
            </p>
          </div>

          <DevisButton
            label="Obtenir un devis →"
            className="
              inline-flex items-center py-3 px-7 shrink-0
              bg-[#29A864] text-white
              border-none rounded-[9px] text-[15px] font-medium whitespace-nowrap cursor-pointer
              transition-[background-color,transform] duration-150
              hover:bg-[#48BC7E] hover:-translate-y-px
            "
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          STATS STRIP
          ════════════════════════════════════════ */}
      <div className="bg-[#29A864] py-10 px-12 max-[1024px]:px-6 max-[1024px]:py-8 max-[600px]:py-6 max-[600px]:px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[600px]:gap-3">
          {STATS.map(({ value, label }) => (
            <div key={value} className="text-center">
              <span
                className="font-serif text-[36px] text-white block max-[600px]:text-[26px]"
              >
                {value}
              </span>
              <div className="text-[13px] text-white/65 mt-1 max-[600px]:text-[12px]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
