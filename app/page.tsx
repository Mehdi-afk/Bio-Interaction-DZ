import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CardGrid from "@/src/components/CardGrid";
import DevisButton from "@/src/components/DevisButton";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Votre partenaire de confiance pour l'approvisionnement en équipement, réactif et consommable de laboratoire d'analyse médical.",
};

const STATS = [
  { num: 370,  suffix: "+",    label: "Références au catalogue" },
  { num: 200,  suffix: "+",    label: "Clients actifs" },
  { num: 48,   suffix: "h",    label: "Délai moyen de livraison" },
  { num: 10,   suffix: " ans", label: "D'expertise sectorielle" },
] as const;

const PARTNERS = [
  { name: "ERBA Mannheim",     logo: "/images/partenaires/erba.png",           w: 130 },
  { name: "Generic Assays",    logo: "/images/partenaires/generic-assays.png", w: 115 },
  { name: "Medipan",           logo: "/images/partenaires/medipan.png",        w: 105 },
  { name: "HOB Biotech",       logo: "/images/partenaires/hob.png",            w: 95  },
  { name: "LDBIO Diagnostics", logo: "/images/partenaires/ldbio.svg",          w: 115 },
] as const;

export default function HomePage() {
  return (
    <>

      {/* ════════════════════════════════════════════════════════
          1. HERO — fond noir cinématique
          ════════════════════════════════════════════════════════ */}
      <section className="
        relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center
        bg-black text-white px-6 py-28 text-center overflow-hidden
      ">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 1000px 700px at 50% 65%, rgba(41,168,100,0.16) 0%, transparent 70%)" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          aria-hidden="true"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Logo */}
        <div className="reveal relative z-10 mb-7">
          <Image src="/images/icon-color.svg" width={68} height={68} alt="BioInteraction" priority />
        </div>

        {/* Badge */}
        <div className="reveal reveal-d1 relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#29A864]/35 bg-[#29A864]/10 text-[#29A864] text-[11px] font-semibold tracking-[0.7px] uppercase mb-8">
          <span className="w-[7px] h-[7px] rounded-full bg-[#29A864] animate-pulse shrink-0" />
          Spécialiste du diagnostic médical depuis 2016
        </div>

        {/* Title */}
        <h1
          className="reveal reveal-d2 relative z-10 font-serif leading-[1.07] mb-7 max-w-[880px]"
          style={{ fontSize: "clamp(34px, 6.5vw, 78px)" }}
        >
          Réactifs &amp; Équipements<br />
          pour votre{" "}
          <em className="text-[#29A864] not-italic">laboratoire</em>.
        </h1>

        {/* Subtitle */}
        <p
          className="reveal reveal-d3 relative z-10 text-white/50 leading-[1.7] mb-10 max-w-[460px]"
          style={{ fontSize: "clamp(15px, 1.7vw, 18px)" }}
        >
          Solutions diagnostiques de qualité internationale.
          Distribution exclusive en Algérie depuis Alger.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-d4 relative z-10 flex items-center gap-3 flex-wrap justify-center">
          <Link
            href="/catalogue/equipements"
            className="
              inline-flex items-center gap-2
              px-7 py-3.5 rounded-full
              bg-[#29A864] text-white text-[15px] font-semibold no-underline
              transition-[background,transform,box-shadow] duration-150
              hover:bg-[#48BC7E] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(41,168,100,0.45)]
            "
          >
            Explorer le catalogue
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <DevisButton
            label="Demander un devis"
            className="
              inline-flex items-center
              px-7 py-3.5 rounded-full
              bg-white/[0.07] text-white text-[15px] font-semibold
              border border-white/[0.14]
              cursor-pointer
              transition-[background,transform] duration-150
              hover:bg-white/[0.13] hover:-translate-y-0.5
            "
          />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-[600px]:hidden" aria-hidden="true">
          <span className="text-[10px] font-semibold tracking-[1px] uppercase text-white/20">Défiler</span>
          <div className="w-px h-9 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          2. ÉQUIPEMENTS — fond gris clair
          ════════════════════════════════════════════════════════ */}
      <section className="
        relative min-h-[80vh] flex flex-col items-center justify-center
        bg-[#F5F5F7] px-6 py-28 text-center overflow-hidden
      ">
        <div className="reveal relative z-10 max-w-[760px] mx-auto">
          <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-5">
            Analyseurs &amp; Instruments
          </span>
          <h2
            className="font-serif text-[#1B1F1D] leading-[1.08] mb-6"
            style={{ fontSize: "clamp(32px, 5.5vw, 64px)" }}
          >
            La précision au service<br className="max-[600px]:hidden" /> du diagnostic.
          </h2>
          <p
            className="text-[#6E6E6E] leading-[1.75] mb-9 mx-auto max-w-[460px]"
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}
          >
            Biochimie clinique, hématologie, hémostase, urines et auto-immunité.
            20 modèles haute performance de ERBA, Generic Assays et HOB Biotech.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/catalogue/equipements"
              className="
                inline-flex items-center gap-2
                px-7 py-3.5 rounded-full
                bg-[#1B1F1D] text-white text-[15px] font-semibold no-underline
                transition-[background,transform] duration-150
                hover:bg-[#3a3f3d] hover:-translate-y-0.5
              "
            >
              Voir les équipements
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <DevisButton
              label="Demander un devis"
              className="
                inline-flex items-center
                px-7 py-3.5 rounded-full
                bg-transparent text-[#29A864] text-[15px] font-semibold
                border border-[#29A864]/40
                cursor-pointer
                transition-[background,border-color,transform] duration-150
                hover:bg-[#EDF8F1] hover:border-[#29A864] hover:-translate-y-0.5
              "
            />
          </div>
        </div>

        {/* Ghost number */}
        <div
          className="absolute -bottom-6 right-0 font-serif leading-none text-[#1B1F1D]/[0.045] pointer-events-none select-none"
          style={{ fontSize: "clamp(140px, 22vw, 300px)" }}
          aria-hidden="true"
        >
          20
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          3. RÉACTIFS — fond sombre
          ════════════════════════════════════════════════════════ */}
      <section className="
        relative min-h-[80vh] flex flex-col items-center justify-center
        bg-[#1D1D1F] px-6 py-28 text-center overflow-hidden
      ">
        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: "700px", height: "280px", background: "radial-gradient(ellipse at 50% 100%, rgba(41,168,100,0.14) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="reveal relative z-10 max-w-[760px] mx-auto text-white">
          <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-5">
            Réactifs de laboratoire
          </span>
          <h2
            className="font-serif leading-[1.08] mb-6"
            style={{ fontSize: "clamp(32px, 5.5vw, 64px)" }}
          >
            Plus de 353 références.<br className="max-[600px]:hidden" />{" "}
            <em className="text-[#29A864] not-italic">Toujours disponibles.</em>
          </h2>
          <p
            className="text-white/50 leading-[1.75] mb-9 mx-auto max-w-[460px]"
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}
          >
            Biochimie, hématologie, auto-immunité, allergie, parasitologie —
            des réactifs certifiés pour chaque spécialité de votre laboratoire.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/catalogue/reactifs"
              className="
                inline-flex items-center gap-2
                px-7 py-3.5 rounded-full
                bg-white text-[#1D1D1F] text-[15px] font-semibold no-underline
                transition-[background,transform] duration-150
                hover:bg-white/90 hover:-translate-y-0.5
              "
            >
              Voir les réactifs
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <DevisButton
              label="Demander un devis"
              className="
                inline-flex items-center
                px-7 py-3.5 rounded-full
                bg-transparent text-white text-[15px] font-semibold
                border border-white/20
                cursor-pointer
                transition-[background,transform] duration-150
                hover:bg-white/[0.08] hover:-translate-y-0.5
              "
            />
          </div>
        </div>

        {/* Ghost number */}
        <div
          className="absolute -bottom-6 left-0 font-serif leading-none text-white/[0.03] pointer-events-none select-none"
          style={{ fontSize: "clamp(140px, 22vw, 300px)" }}
          aria-hidden="true"
        >
          353
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          4. STATS — vert
          ════════════════════════════════════════════════════════ */}
      <div className="bg-[#29A864] py-16 px-12 max-[1024px]:px-6 max-[600px]:py-12 max-[600px]:px-4">
        <div className="max-w-[1100px] mx-auto grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[600px]:gap-4">
          {STATS.map(({ num, suffix, label }, i) => (
            <div
              key={label}
              className="reveal text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className="count-up font-serif text-white block mb-1"
                data-target={num}
                data-suffix={suffix}
                style={{ fontSize: "clamp(34px, 4.5vw, 52px)" }}
              >
                {num}{suffix}
              </span>
              <p className="text-white/60 text-[13px] tracking-[0.2px]">{label}</p>
            </div>
          ))}
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════
          5. PARTENAIRES — fond blanc
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-12 max-[1024px]:px-6 max-[600px]:py-14 max-[600px]:px-4">
        <div className="max-w-[1000px] mx-auto text-center">

          <div className="reveal mb-12">
            <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#A9ADAA] mb-3">
              Représentations exclusives
            </span>
            <h2 className="font-serif text-[#1B1F1D]" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
              Nos partenaires
            </h2>
          </div>

          <div className="reveal reveal-d1 flex items-center justify-center gap-10 flex-wrap max-[600px]:gap-8">
            {PARTNERS.map(({ name, logo, w }) => (
              <div
                key={name}
                className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-300"
              >
                <Image
                  src={logo}
                  alt={name}
                  width={w}
                  height={48}
                  className="h-9 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          <div className="reveal reveal-d2 mt-10">
            <Link
              href="/partenaires"
              className="text-[14px] font-medium text-[#29A864] no-underline hover:underline"
            >
              En savoir plus sur nos partenaires →
            </Link>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          6. GAMMES — fond gris clair
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F7] py-20 px-12 max-[1024px]:px-6 max-[600px]:py-14 max-[600px]:px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal mb-12 text-center">
            <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-3">
              Catalogue
            </span>
            <h2 className="font-serif text-[#1B1F1D]" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
              Nos gammes de produits
            </h2>
          </div>
          <CardGrid />
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          7. CTA FINALE — dégradé vert
          ════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-28 px-12 text-center max-[1024px]:px-6 max-[600px]:py-20 max-[600px]:px-4"
        style={{ background: "linear-gradient(145deg, #0F4226 0%, #1a7a42 50%, #29A864 100%)" }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-[150px] -right-[150px] w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.045)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-[120px] -left-[120px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.03)" }}
          aria-hidden="true"
        />

        <div className="reveal relative z-10 max-w-[560px] mx-auto">
          <h2
            className="font-serif text-white leading-[1.1] mb-5"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            Un produit<br />en tête&nbsp;?
          </h2>
          <p className="text-white/65 leading-[1.75] mb-10" style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}>
            Notre équipe technique est disponible pour vous orienter
            vers la solution la mieux adaptée à vos besoins.
          </p>
          <DevisButton
            label="Obtenir un devis →"
            className="
              inline-flex items-center
              px-9 py-4 rounded-full
              bg-white text-[#0F4226] text-[16px] font-bold
              border-none cursor-pointer
              transition-[transform,box-shadow] duration-150
              hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,0,0,0.22)]
            "
          />
        </div>
      </section>

    </>
  );
}
