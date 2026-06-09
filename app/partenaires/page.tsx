import type { Metadata } from "next";
import Image from "next/image";
import DevisButton from "@/src/components/DevisButton";

export const metadata: Metadata = {
  title: "Nos partenaires",
  description:
    "Bio Interaction Algérie représente en exclusivité 5 marques internationales de référence " +
    "dans le diagnostic médical : ERBA Mannheim, Generic Assays, Medipan, HOB Biotech et LDBIO Diagnostics.",
};

type Partner = {
  name: string;
  logo: string;
  logoW: number;
  country: string;
  flag: string;
  description: string;
  website: string;
};

const PARTNERS: Partner[] = [
  {
    name: "ERBA Mannheim",
    logo: "/images/partenaires/erba.png",
    logoW: 180,
    country: "République Tchèque",
    flag: "🇨🇿",
    description:
      "Le groupe Erba bénéficie de 50 ans d'expérience dans le développement, la " +
      "fabrication et la vente de produits d'analyse de chimie clinique, d'hématologie, " +
      "dosage des ions et de la chimie urinaire. Fournissant ainsi des produits de " +
      "haute qualité et faciles d'accès pour des analyses fiables, rapides et " +
      "confortables, permettant un diagnostic précis et une prise en charge plus " +
      "rapide des patients.\n\n" +
      "Depuis 2022, notre société entretient un partenariat stratégique avec Erba. " +
      "Cette collaboration, fondée sur des objectifs communs d'innovation et " +
      "d'excellence opérationnelle, nous a permis de développer des solutions " +
      "performantes, d'optimiser nos processus et d'élargir notre offre de services " +
      "pour mieux répondre aux besoins de nos clients. Ensemble, nous poursuivons une " +
      "feuille de route axée sur la qualité, la transparence et la création de valeur " +
      "durable.",
    website: "https://www.erbalachema.com/en/",
  },
  {
    name: "Generic Assays",
    logo: "/images/partenaires/generic-assays.png",
    logoW: 160,
    country: "Allemagne",
    flag: "🇩🇪",
    description:
      "GA Generic Assays GmbH, fondée en 2002, est une entreprise spécialisée dans les produits de diagnostic différentiel des maladies auto-immunes.\n\n" +
      "Depuis 2023, en partenariat avec GA Generic Assays GmbH, nous apportons des solutions aux défis rencontrés dans ce domaine du diagnostic en garantissant une qualité optimale des produits et en participant activement au développement de produits innovants et automatisables.",
    website: "https://www.medipan.de/ga-generic-assays-gmbh/",
  },
  {
    name: "Medipan",
    logo: "/images/partenaires/medipan.png",
    logoW: 150,
    country: "Allemagne",
    flag: "🇩🇪",
    description:
      "Medipan GmbH, fondée en 1992, est une entreprise active dans le domaine du " +
      "diagnostic médical, notamment grâce à des techniques numériques immunologiques " +
      "permettant un diagnostic rapide et précis des maladies auto-immunes.\n\n" +
      "Notre collaboration, qui a débuté en 2023, repose sur un engagement commun en " +
      "faveur de la qualité et de la fiabilité des services permettant ainsi de " +
      "répondre aux exigences techniques, réglementaires et qualitatives inhérentes " +
      "aux activités de diagnostic médical.",
    website: "https://www.medipan.de",
  },
  {
    name: "HOB Biotech",
    logo: "/images/partenaires/hob.png",
    logoW: 130,
    country: "Chine",
    flag: "🇨🇳",
    description:
      "Leader en diagnostic des allergies en Chine et acteur émergent dans " +
      "le diagnostic des maladies auto-immunes. Fabrication certifiée ISO 13485.",
    website: "https://en.hob-biotech.com",
  },
  {
    name: "LDBIO Diagnostics",
    logo: "/images/partenaires/ldbio.svg",
    logoW: 155,
    country: "France",
    flag: "🇫🇷",
    description:
      "Tests sérologiques de confirmation en parasitologie et mycologie " +
      "par Western Blot avec antigènes naturels. Basé à Lyon.",
    website: "https://ldbiodiagnostics.com",
  },
];

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export default function PartenairesPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO — noir cinématique
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center bg-[#0A0A0A] text-white px-6 py-24 text-center overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 900px 600px at 50% 70%, rgba(41,168,100,0.13) 0%, transparent 68%)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          aria-hidden="true"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="reveal relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#29A864]/30 bg-[#29A864]/8 text-[#29A864] text-[11px] font-semibold tracking-[0.8px] uppercase mb-8">
          <span className="w-[7px] h-[7px] rounded-full bg-[#29A864] animate-pulse shrink-0" />
          Représentations exclusives · Algérie
        </div>

        <h1
          className="reveal reveal-d1 font-serif text-white leading-[1.06] max-w-[820px] mb-6"
          style={{ fontSize: "clamp(34px, 6vw, 74px)" }}
        >
          Nos <em className="text-[#29A864] not-italic">partenaires</em>
        </h1>

        <p
          className="reveal reveal-d2 text-white/55 leading-[1.75] max-w-[640px]"
          style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}
        >
          Nous représentons en exclusivité sur le marché algérien 5 marques européennes
          et internationales de référence dans le diagnostic médical.
        </p>

        {/* Scroll cue */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-[600px]:hidden" aria-hidden="true">
          <span className="text-[10px] font-semibold tracking-[1px] uppercase text-white/20">Découvrir</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          PARTENAIRES — sections alternantes
          ════════════════════════════════════════════════════════ */}
      {PARTNERS.map(({ name, logo, logoW, country, flag, description, website }, i) => {
        const isEven   = i % 2 === 0;
        const bgClass  = isEven ? "bg-white" : "bg-[#F5F5F7]";
        const revealDir = isEven ? "reveal-left" : "reveal-right";

        return (
          <section key={name} className={`${bgClass} py-24 px-12 max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-16 overflow-hidden`}>
            <div className={`
              max-w-[1160px] mx-auto flex items-center gap-20
              max-[900px]:flex-col max-[900px]:gap-12
              ${isEven ? "" : "flex-row-reverse"}
            `}>

              {/* Logo card */}
              <div className="reveal-scale shrink-0 w-[280px] max-[900px]:w-full max-[900px]:max-w-[320px]">
                <div className="bg-white rounded-2xl border border-[#E5E3DC] p-10 flex items-center justify-center aspect-[4/3] shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
                  <Image
                    src={logo}
                    alt={`Logo ${name}`}
                    width={logoW}
                    height={90}
                    className="max-h-[90px] w-auto object-contain"
                  />
                </div>
                {/* Country tag */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">{flag}</span>
                  <span className="text-[13px] text-[#A9ADAA] font-medium">{country}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`${revealDir} flex-1`}>
                <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
                  Partenaire exclusif
                </span>
                <h2
                  className="font-serif text-[#1B1F1D] leading-[1.1] mb-5"
                  style={{ fontSize: "clamp(26px, 3.5vw, 46px)" }}
                >
                  {name}
                </h2>
                <div className="text-[#6E6E6E] text-[15px] leading-[1.8] mb-8 max-w-[500px] space-y-4">
                  {description.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1B1F1D] no-underline border-b border-[#1B1F1D]/20 pb-0.5 hover:text-[#29A864] hover:border-[#29A864] transition-colors duration-150"
                >
                  Visiter le site
                  <ArrowRight />
                </a>
              </div>
            </div>
          </section>
        );
      })}


      {/* ════════════════════════════════════════════════════════
          SEPARATEUR COUNT
          ════════════════════════════════════════════════════════ */}
      <div className="bg-[#0A0A0A] py-20 px-12 max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-14">
        <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-8 max-[600px]:grid-cols-1 max-[600px]:gap-6">
          {[
            { num: 5,   suffix: "",   label: "Marques représentées en exclusivité" },
            { num: 100, suffix: "+",  label: "Pays où nos partenaires sont présents" },
            { num: 10,  suffix: " ans", label: "De partenariats durables" },
          ].map(({ num, suffix, label }, i) => (
            <div key={label} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <span
                className="count-up font-serif text-white block mb-2"
                data-target={num}
                data-suffix={suffix}
                style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
              >
                {num}{suffix}
              </span>
              <p className="text-white/35 text-[13px] leading-[1.6]">{label}</p>
            </div>
          ))}
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════
          CTA FINALE
          ════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-28 px-12 text-center max-[1024px]:px-6 max-[600px]:py-20 max-[600px]:px-4"
        style={{ background: "linear-gradient(145deg, #0F4226 0%, #1a7a42 55%, #29A864 100%)" }}
      >
        <div
          className="absolute -top-[160px] -right-[160px] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-hidden="true"
        />
        <div className="reveal relative z-10 max-w-[520px] mx-auto">
          <h2
            className="font-serif text-white leading-[1.1] mb-5"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}
          >
            Intéressé par<br />nos solutions ?
          </h2>
          <p className="text-white/60 leading-[1.75] mb-10" style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}>
            Notre équipe commerciale répond sous 24 h pour tout besoin
            en réactifs ou équipements de laboratoire.
          </p>
          <DevisButton
            label="Demander un devis →"
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
