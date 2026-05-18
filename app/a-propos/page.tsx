import type { Metadata } from "next";
import ContactButton from "@/src/components/ContactButton";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Actif depuis 2016 dans le domaine du diagnostic médical, Bio Interaction Algérie " +
    "accompagne les laboratoires algériens avec des réactifs et équipements de qualité internationale.",
};

// ── Icônes SVG — grille 32×32, stroke 2, linecap/linejoin round, fill none ──
// Conformes au Brand Book BioInteraction 2026 · page 16 — Iconographie

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
      <circle cx="16" cy="16" r="11" />
      <polyline points="16,10 16,16 20,19" />
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
      <rect x="4" y="8" width="24" height="18" rx="2" />
      <polyline points="4,8 16,18 28,8" />
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

// ── Data ───────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    Icon: IconCertified,
    title: "Qualité internationale",
    text: "Nous distribuons des marques européennes et internationales de référence : ERBA, Generic Assays, Medipan, HOB Biotech, LDBIO Diagnostics.",
  },
  {
    Icon: IconClock,
    title: "Réactivité commerciale",
    text: "Devis rapide, livraison sur Alger et régions. Service commercial joignable au +213.770.08.54.53 — sales@biointeractiondz.com.",
  },
  {
    Icon: IconWrench,
    title: "Support technique (SAV)",
    text: "Installation, qualification et formation sur les équipements. SAV joignable au +213.770.74.72.50 — sav@biointeractiondz.com.",
  },
  {
    Icon: IconLink,
    title: "Partenariats durables",
    text: "Nous représentons nos fournisseurs en exclusivité ou semi-exclusivité sur le marché algérien, garantissant disponibilité et suivi de chaque produit.",
  },
] as const;

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AProposPage() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO — dégradé vert #0F4226 → #29A864
          ════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden py-20 px-12 max-[1024px]:px-6 max-[600px]:py-9 max-[600px]:px-4"
        style={{ background: "linear-gradient(135deg, #0F4226 0%, #29A864 100%)" }}
      >
        {/* Cercle décoratif (pseudo-élément recréé) */}
        <div
          className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto relative">
          <h1
            className="font-serif text-[48px] leading-[1.15] text-white mb-4 max-w-[600px]
              max-[900px]:text-[32px] max-[600px]:text-[26px]"
          >
            Expertise scientifique, service de proximité
          </h1>
          <p className="text-white/75 text-[17px] leading-[1.7] max-w-[560px] max-[600px]:text-[15px]">
            Actif depuis 2016 dans le domaine du diagnostic médical, Bio Interaction
            Algérie accompagne les laboratoires algériens avec des réactifs et équipements
            de qualité internationale.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CORPS — Notre histoire + Valeurs
          ════════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto py-20 px-12 max-[1024px]:px-6 max-[900px]:py-[60px] max-[600px]:py-8 max-[600px]:px-4">
        <div className="grid grid-cols-2 gap-16 items-start mb-20
          max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[900px]:mb-12
          max-[600px]:gap-7 max-[600px]:mb-10">

          {/* ── Notre histoire ── */}
          <div>
            <h2 className="font-serif text-[32px] mb-5 max-[600px]:text-[26px]">
              Notre histoire
            </h2>
            <p className="text-[#6E6E6E] text-[15px] leading-[1.8] mb-3.5">
              Fondée à Alger en 2016, Bio Interaction Algérie s&apos;est spécialisée dès
              le départ dans la distribution de réactifs et d&apos;équipements pour le
              diagnostic médical.
            </p>
            <p className="text-[#6E6E6E] text-[15px] leading-[1.8] mb-3.5">
              Nous proposons une gamme complète couvrant la biochimie clinique,
              l&apos;hématologie, l&apos;hémostase, l&apos;analyse des urines,
              l&apos;auto-immunité, l&apos;allergie et la parasitologie.
            </p>
            <p className="text-[#6E6E6E] text-[15px] leading-[1.8] mb-3.5">
              Nous accompagnons les laboratoires d&apos;analyses médicales, les hôpitaux
              et les cliniques à travers tout le territoire national, avec un support
              technique et commercial dédié.
            </p>
            <div className="mt-7">
              <ContactButton
                label="Nous contacter"
                className="
                  inline-flex items-center py-3 px-7
                  bg-[#29A864] text-white border-none
                  rounded-[9px] text-[15px] font-medium cursor-pointer
                  transition-[background-color,transform] duration-150
                  hover:bg-[#48BC7E] hover:-translate-y-px
                "
              />
            </div>
          </div>

          {/* ── Valeurs (cartes bordées) ── */}
          <div className="flex flex-col gap-4">
            {VALUES.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="
                  flex gap-4 items-start
                  p-5 border border-[#E5E3DC] rounded-[10px]
                  transition-colors duration-150 hover:border-[#29A864]
                "
              >
                {/* Icône 44×44, fond vert pâle */}
                <div className="shrink-0 w-11 h-11 rounded-[10px] bg-[#EDF8F1] flex items-center justify-center text-[#29A864]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#1B1F1D] mb-1">
                    {title}
                  </h4>
                  <p className="text-[13px] text-[#6E6E6E] leading-[1.65]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CONTACT BAND — fond paper #F7F6F2
          ════════════════════════════════════════ */}
      <div className="bg-[#F7F6F2] border-t border-[#E5E3DC] py-[60px] px-12 max-[1024px]:px-6 max-[600px]:py-9 max-[600px]:px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-[30px] mb-2 max-[600px]:text-[24px]">
            Nous contacter
          </h2>
          <p className="text-[#6E6E6E] mb-8">
            Notre équipe est disponible du dimanche au jeudi, de 8h à 17h.
          </p>

          {/* Grille 3 colonnes — cartes blanches */}
          <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-3">

            {/* Téléphone / Fax */}
            <div className="bg-white border border-[#E5E3DC] rounded-[10px] p-6 flex gap-4 items-start">
              <div className="shrink-0 w-[42px] h-[42px] rounded-[9px] bg-[#EDF8F1] flex items-center justify-center text-[#29A864]">
                <IconPhone className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#1B1F1D] mb-1">Téléphone / Fax</h4>
                <p className="text-[13px] text-[#6E6E6E] leading-[1.7]">
                  <a href="tel:+21323952151" className="no-underline text-[#6E6E6E] hover:text-[#29A864] transition-colors block">+213.23.95.21.51</a>
                  <a href="tel:+21323952331" className="no-underline text-[#6E6E6E] hover:text-[#29A864] transition-colors block">+213.23.95.23.31</a>
                  <a href="tel:+213770980888" className="no-underline text-[#6E6E6E] hover:text-[#29A864] transition-colors block">+213.770.98.08.88</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-[#E5E3DC] rounded-[10px] p-6 flex gap-4 items-start">
              <div className="shrink-0 w-[42px] h-[42px] rounded-[9px] bg-[#EDF8F1] flex items-center justify-center text-[#29A864]">
                <IconMail className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#1B1F1D] mb-1">Email</h4>
                <p className="text-[13px] text-[#6E6E6E] leading-[1.7]">
                  <a href="mailto:support@biointeractiondz.com" className="no-underline text-[#6E6E6E] hover:text-[#29A864] transition-colors block">support@biointeractiondz.com</a>
                  <a href="mailto:sales@biointeractiondz.com" className="no-underline text-[#6E6E6E] hover:text-[#29A864] transition-colors block">sales@biointeractiondz.com</a>
                  <a href="mailto:sav@biointeractiondz.com" className="no-underline text-[#6E6E6E] hover:text-[#29A864] transition-colors block">sav@biointeractiondz.com</a>
                </p>
              </div>
            </div>

            {/* Adresse */}
            <div className="bg-white border border-[#E5E3DC] rounded-[10px] p-6 flex gap-4 items-start">
              <div className="shrink-0 w-[42px] h-[42px] rounded-[9px] bg-[#EDF8F1] flex items-center justify-center text-[#29A864]">
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

          <div className="mt-8">
            <ContactButton
              label="Envoyer un message →"
              className="
                inline-flex items-center py-3 px-7
                bg-[#29A864] text-white border-none
                rounded-[9px] text-[15px] font-medium cursor-pointer
                transition-[background-color,transform] duration-150
                hover:bg-[#48BC7E] hover:-translate-y-px
              "
            />
          </div>
        </div>
      </div>
    </>
  );
}
