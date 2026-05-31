import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nos partenaires",
  description:
    "Bio Interaction Algérie représente en exclusivité 5 marques internationales de référence " +
    "dans le diagnostic médical : ERBA Mannheim, Generic Assays, Medipan, HOB Biotech et LDBIO Diagnostics.",
};

type Partner = {
  name: string;
  logo: string;
  country: string;
  description: string;
  website: string;
};

const PARTNERS: Partner[] = [
  {
    name: "ERBA Mannheim",
    logo: "/images/partenaires/erba.png",
    country: "Allemagne",
    description:
      "Solutions IVD complètes en biochimie clinique, hématologie, immunologie, " +
      "coagulation et urinalyse. Présent dans plus de 100 pays.",
    website: "https://www.erbalachema.com/en/",
  },
  {
    name: "Generic Assays",
    logo: "/images/partenaires/generic-assays.png",
    country: "Allemagne",
    description:
      "Kits ELISA, RIA et immunofluorescence pour le diagnostic différentiel " +
      "des maladies auto-immunes, inflammatoires et chroniques.",
    website: "https://www.medipan.de",
  },
  {
    name: "Medipan",
    logo: "/images/partenaires/medipan.png",
    country: "Allemagne",
    description:
      "Systèmes automatisés pour l'évaluation des tests d'immunofluorescence " +
      "(AKLIDES®) et le diagnostic des maladies auto-immunes.",
    website: "https://www.medipan.de",
  },
  {
    name: "HOB Biotech",
    logo: "/images/partenaires/hob.png",
    country: "Chine",
    description:
      "Leader en diagnostic des allergies en Chine et acteur émergent dans " +
      "le diagnostic des maladies auto-immunes. Fabrication certifiée ISO 13485.",
    website: "https://en.hob-biotech.com",
  },
  {
    name: "LDBIO Diagnostics",
    logo: "/images/partenaires/ldbio.svg",
    country: "France",
    description:
      "Tests sérologiques de confirmation en parasitologie et mycologie " +
      "par Western Blot avec antigènes naturels. Basé à Lyon.",
    website: "https://ldbiodiagnostics.com",
  },
];

export default function PartenairesPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO
          ════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden py-20 px-12 max-[1024px]:px-6 max-[600px]:py-9 max-[600px]:px-4"
        style={{ background: "linear-gradient(135deg, #0F4226 0%, #29A864 100%)" }}
      >
        <div
          className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto relative">
          <h1
            className="reveal font-serif text-[48px] leading-[1.15] text-white mb-4 max-w-[700px]
              max-[900px]:text-[32px] max-[600px]:text-[26px]"
          >
            Nos partenaires
          </h1>
          <p className="reveal reveal-d1 text-white/75 text-[17px] leading-[1.7] max-w-[640px] max-[600px]:text-[15px]">
            Nous représentons en exclusivité sur le marché algérien 5 marques européennes
            et internationales de référence dans le diagnostic médical.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          GRILLE PARTENAIRES
          ════════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto py-20 px-12 max-[1024px]:px-6 max-[900px]:py-[60px] max-[600px]:py-10 max-[600px]:px-4">
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {PARTNERS.map(({ name, logo, country, description, website }, i) => (
            <a
              key={name}
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transitionDelay: `${i * 65}ms` }}
              className="
                reveal group flex flex-col bg-white border border-[#E5E3DC] rounded-[12px] overflow-hidden
                no-underline transition-all duration-150
                hover:border-[#29A864] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
              "
            >
              {/* Logo */}
              <div className="h-[160px] bg-[#F7F6F2] flex items-center justify-center p-8 border-b border-[#E5E3DC]">
                <Image
                  src={logo}
                  alt={`Logo ${name}`}
                  width={220}
                  height={100}
                  className="max-h-[80px] w-auto object-contain"
                />
              </div>

              {/* Texte */}
              <div className="p-6 flex flex-col gap-2 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[17px] font-semibold text-[#1B1F1D] group-hover:text-[#29A864] transition-colors">
                    {name}
                  </h3>
                  <span className="text-[12px] text-[#6E6E6E] shrink-0">{country}</span>
                </div>
                <p className="text-[13px] text-[#6E6E6E] leading-[1.65]">{description}</p>
                <span className="mt-2 text-[13px] font-medium text-[#29A864] inline-flex items-center gap-1">
                  Visiter le site
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
