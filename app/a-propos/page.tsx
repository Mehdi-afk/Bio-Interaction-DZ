import type { Metadata } from "next";
import ContactButton from "@/src/components/ContactButton";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Actif depuis 2016 dans le domaine du diagnostic médical, Bio Interaction Algérie " +
    "accompagne les laboratoires algériens avec des réactifs et équipements de qualité internationale.",
};

function IconCertified({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 3L27 7.5V16c0 7.2-5 12.8-11 14.5C10 28.8 5 23.2 5 16V7.5L16 3z" />
      <path d="M11.5 16.5l3.5 3.5 6-7" />
    </svg>
  );
}
function IconClock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11" /><polyline points="16,10 16,16 20,19" />
    </svg>
  );
}
function IconWrench({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 5a6 6 0 0 1 0 11l-2 2L8.5 29.5a2.1 2.1 0 0 1-3-3L17 15l2-2A6 6 0 0 1 22 5z" />
      <path d="M22 10l-4-4" />
    </svg>
  );
}
function IconLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M13 17.5a5.5 5.5 0 0 0 7.8 0l4-4a5.5 5.5 0 0 0-7.8-7.8l-2.3 2.3" />
      <path d="M19 14.5a5.5 5.5 0 0 0-7.8 0l-4 4a5.5 5.5 0 0 0 7.8 7.8l2.3-2.3" />
    </svg>
  );
}
function IconPhone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22.5 21.5l-2.8 2.8a2 2 0 0 1-2.3.4A22 22 0 0 1 7.3 14.6a2 2 0 0 1 .4-2.3l2.8-2.8a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-1.5 1.5a12 12 0 0 0 3.2 3.2l1.5-1.5a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4z" />
    </svg>
  );
}
function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="8" width="24" height="18" rx="2" /><polyline points="4,8 16,18 28,8" />
    </svg>
  );
}
function IconPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 3a9 9 0 0 1 9 9c0 7.5-9 18-9 18S7 19.5 7 12a9 9 0 0 1 9-9z" />
      <circle cx="16" cy="12" r="3" />
    </svg>
  );
}

const VALUES = [
  {
    Icon: IconCertified,
    title: "Qualité internationale",
    text: "Nous distribuons des marques européennes et internationales de référence : ERBA, Generic Assays, Medipan, HOB Biotech, LDBIO Diagnostics.",
  },
  {
    Icon: IconClock,
    title: "Réactivité commerciale",
    text: "Devis rapide, livraison sur tout le territoire national. Service commercial joignable au +213.770.08.54.53 — sales@biointeractiondz.com.",
  },
  {
    Icon: IconWrench,
    title: "Support technique (SAV)",
    text: "Installation, qualification et formation sur les équipements. SAV joignable au +213.770.74.72.50 — sav@biointeractiondz.com.",
  },
  {
    Icon: IconLink,
    title: "Partenariats durables",
    text: "Nous représentons nos fournisseurs en exclusivité sur le marché algérien, garantissant disponibilité et suivi de chaque produit.",
  },
] as const;

export default function AProposPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO — noir cinématique
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center bg-[#0A0A0A] text-white px-6 py-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 800px 500px at 50% 65%, rgba(41,168,100,0.11) 0%, transparent 68%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          aria-hidden="true"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="reveal relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#29A864]/30 bg-[#29A864]/8 text-[#29A864] text-[11px] font-semibold tracking-[0.8px] uppercase mb-8">
          <span className="w-[7px] h-[7px] rounded-full bg-[#29A864] animate-pulse shrink-0" />
          À propos · Actifs depuis 2016
        </div>

        <h1
          className="reveal reveal-d1 font-serif text-white leading-[1.06] max-w-[820px] mb-6"
          style={{ fontSize: "clamp(32px, 5.5vw, 70px)" }}
        >
          Expertise scientifique,{" "}
          <em className="text-[#29A864] not-italic">service de proximité</em>
        </h1>

        <p
          className="reveal reveal-d2 text-white/55 leading-[1.75] max-w-[600px]"
          style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}
        >
          Actif depuis 2016 dans le domaine du diagnostic médical, Bio Interaction
          Algérie accompagne les laboratoires algériens avec des réactifs et équipements
          de qualité internationale.
        </p>

        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-[600px]:hidden" aria-hidden="true">
          <span className="text-[10px] font-semibold tracking-[1px] uppercase text-white/20">Notre histoire</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          NOTRE HISTOIRE — blanc, typographie large
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-28 px-12 max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-16 overflow-hidden">
        <div className="max-w-[1100px] mx-auto">

          <div className="reveal mb-16 max-[600px]:mb-10">
            <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
              À propos
            </span>
            <h2
              className="font-serif text-[#1B1F1D] leading-[1.1]"
              style={{ fontSize: "clamp(28px, 4vw, 54px)" }}
            >
              Notre histoire.
            </h2>
          </div>

          <div className="flex gap-14 max-[900px]:flex-col max-[900px]:gap-0">
            {/* Timeline marker */}
            <div className="reveal-left shrink-0 flex flex-col items-center max-[900px]:flex-row max-[900px]:items-center max-[900px]:gap-4 max-[900px]:mb-8">
              <span
                className="font-serif text-[#29A864]"
                style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
              >
                2016
              </span>
              <div className="w-px flex-1 bg-gradient-to-b from-[#29A864]/40 to-transparent mt-4 max-[900px]:hidden" />
              <div className="h-px flex-1 bg-gradient-to-r from-[#29A864]/40 to-transparent ml-4 min-[900px]:hidden" />
            </div>

            {/* Text blocks */}
            <div className="flex-1">
              <p className="reveal text-[#6E6E6E] text-[15px] leading-[1.85] mb-5">
                Activant depuis 2016 dans le domaine du diagnostic médical,
                et étant toujours à l&apos;écoute de nos clients nous travaillons à trouver la
                meilleure façon de répondre à leurs attentes, en commercialisant des
                solutions innovantes et de grande qualité, répondant aux besoins des
                patients, en équipements, réactifs et consommables de laboratoires
                d&apos;analyses médicales.
              </p>
              <p className="reveal reveal-d1 text-[#6E6E6E] text-[15px] leading-[1.85] mb-5">
                Passionnés par le métier que nous exerçons, notre réputation
                est l&apos;un de nos actifs les plus précieux après le bien-être des patients,
                et la satisfaction de nos partenaires, voilà pourquoi nous ne mesurons
                pas nos performances uniquement en considérant les résultats en
                tant que tels mais également la manière de les obtenir.
              </p>
              <p className="reveal reveal-d2 text-[#6E6E6E] text-[15px] leading-[1.85] mb-9">
                Notre ligne de conduite est dictée par un comportement
                responsable, éthique, soucieux de développement durable et
                respectueux des besoins des personnes, de la société ainsi que de
                l&apos;environnement.
              </p>
              <div className="reveal reveal-d3">
                <ContactButton
                  label="Nous contacter"
                  className="
                    inline-flex items-center gap-2 py-3.5 px-7
                    bg-[#1B1F1D] text-white border-none
                    rounded-full text-[15px] font-semibold cursor-pointer
                    transition-[background,transform,box-shadow] duration-150
                    hover:bg-[#2d3330] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          NOS VALEURS — fond sombre
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#1D1D1F] py-28 px-12 max-[1024px]:px-6 max-[600px]:px-4 max-[600px]:py-16">
        <div className="max-w-[1100px] mx-auto">

          <div className="reveal mb-14 text-center max-[600px]:mb-10">
            <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
              Engagements
            </span>
            <h2
              className="font-serif text-white leading-[1.1]"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              Nos valeurs.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
            {VALUES.map(({ Icon, title, text }, i) => (
              <div
                key={title}
                style={{ transitionDelay: `${i * 90}ms` }}
                className="
                  reveal-scale flex gap-5 items-start
                  bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6
                  transition-[border-color,background] duration-200
                  hover:bg-white/[0.08] hover:border-white/[0.16]
                "
              >
                <div className="shrink-0 w-12 h-12 rounded-[12px] bg-[#29A864]/12 flex items-center justify-center text-[#29A864]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white text-[15px] font-semibold mb-1.5">{title}</h4>
                  <p className="text-white/45 text-[13px] leading-[1.7]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          CONTACT — fond paper
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F6F2] border-t border-[#E5E3DC] py-24 px-12 max-[1024px]:px-6 max-[600px]:py-14 max-[600px]:px-4">
        <div className="max-w-[1100px] mx-auto">

          <div className="reveal mb-12 max-[600px]:mb-8">
            <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
              Contact
            </span>
            <h2
              className="font-serif text-[#1B1F1D] leading-[1.1] mb-3"
              style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}
            >
              Nous contacter
            </h2>
            <p className="reveal reveal-d1 text-[#6E6E6E] text-[15px]">
              Notre équipe est disponible du dimanche au jeudi, de 8h à 17h.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-3">
            <div className="reveal bg-white border border-[#E5E3DC] rounded-2xl p-6 flex gap-4 items-start hover:border-[#29A864] transition-colors duration-150">
              <div className="shrink-0 w-11 h-11 rounded-[10px] bg-[#EDF8F1] flex items-center justify-center text-[#29A864]">
                <IconPhone className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#1B1F1D] mb-1">Téléphone / Fax</h4>
                <a href="tel:+213284648300" className="block text-[13px] text-[#6E6E6E] no-underline hover:text-[#29A864] transition-colors">+213.28.46.48.30</a>
                <a href="tel:+213284648900" className="block text-[13px] text-[#6E6E6E] no-underline hover:text-[#29A864] transition-colors">+213.28.46.48.90</a>
                <p className="text-[12px] font-semibold text-[#1B1F1D] mt-3 mb-0.5">Commercial</p>
                <a href="tel:+213770085453" className="block text-[13px] text-[#6E6E6E] no-underline hover:text-[#29A864] transition-colors">+213.770.08.54.53</a>
                <p className="text-[12px] font-semibold text-[#1B1F1D] mt-2 mb-0.5">SAV</p>
                <a href="tel:+213770747250" className="block text-[13px] text-[#6E6E6E] no-underline hover:text-[#29A864] transition-colors">+213.770.74.72.50</a>
              </div>
            </div>

            <div className="reveal reveal-d1 bg-white border border-[#E5E3DC] rounded-2xl p-6 flex gap-4 items-start hover:border-[#29A864] transition-colors duration-150">
              <div className="shrink-0 w-11 h-11 rounded-[10px] bg-[#EDF8F1] flex items-center justify-center text-[#29A864]">
                <IconMail className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#1B1F1D] mb-1">Email</h4>
                <a href="mailto:support@biointeractiondz.com" className="block text-[13px] text-[#6E6E6E] no-underline hover:text-[#29A864] transition-colors">support@biointeractiondz.com</a>
                <a href="mailto:sales@biointeractiondz.com" className="block text-[13px] text-[#6E6E6E] no-underline hover:text-[#29A864] transition-colors">sales@biointeractiondz.com</a>
                <a href="mailto:sav@biointeractiondz.com" className="block text-[13px] text-[#6E6E6E] no-underline hover:text-[#29A864] transition-colors">sav@biointeractiondz.com</a>
              </div>
            </div>

            <div className="reveal reveal-d2 bg-white border border-[#E5E3DC] rounded-2xl p-6 flex gap-4 items-start hover:border-[#29A864] transition-colors duration-150">
              <div className="shrink-0 w-11 h-11 rounded-[10px] bg-[#EDF8F1] flex items-center justify-center text-[#29A864]">
                <IconPin className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#1B1F1D] mb-1">Adresse</h4>
                <p className="text-[13px] text-[#6E6E6E] leading-[1.7]">
                  313 Rue du Colonel Bougara<br />
                  Alger Plage, Bordj El Bahri — Alger
                </p>
              </div>
            </div>
          </div>

          <div className="reveal mt-10">
            <ContactButton
              label="Envoyer un message →"
              className="
                inline-flex items-center py-3.5 px-7
                bg-[#29A864] text-white border-none
                rounded-full text-[15px] font-semibold cursor-pointer
                transition-[background,transform,box-shadow] duration-150
                hover:bg-[#48BC7E] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(41,168,100,0.35)]
              "
            />
          </div>
        </div>
      </section>
    </>
  );
}
