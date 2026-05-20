"use client";

import Link from "next/link";
import { useApp } from "@/src/context/AppContext";

// ── Shared class strings ──────────────────────────────────────────────────────

const colLinkCls =
  "block text-[13px] text-white/65 no-underline mb-2 transition-colors duration-150 hover:text-white";

const colHeadCls =
  "text-[12px] font-semibold tracking-[0.5px] uppercase text-white/40 mb-3.5";

// ── Static data ───────────────────────────────────────────────────────────────

const CATALOGUE_LINKS = [
  { href: "/catalogue/equipements", label: "Équipements" },
  { href: "/catalogue/reactifs", label: "Réactifs" },
] as const;

const CONTACT_LINKS = [
  { href: "tel:+21328464830",                    label: "+213.28.46.48.30" },
  { href: "tel:+21328464890",                    label: "+213.28.46.48.90" },
  { href: "mailto:support@biointeractiondz.com", label: "support@biointeractiondz.com" },
] as const;

const COMMERCIAL_LINKS = [
  { href: "tel:+213770085453",                 label: "Commercial : +213.770.08.54.53" },
  { href: "mailto:sales@biointeractiondz.com", label: "sales@biointeractiondz.com" },
  { href: "tel:+213770747250",                 label: "SAV : +213.770.74.72.50" },
  { href: "mailto:sav@biointeractiondz.com",   label: "sav@biointeractiondz.com" },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const { openDevis } = useApp();

  return (
    <footer className="bg-[#1B1F1D] pt-12 pb-8 px-12 max-[1024px]:px-6 max-[600px]:pt-8 max-[600px]:pb-5 max-[600px]:px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* ── Top grid ── */}
        <div className="
          grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 pb-10 mb-7
          border-b border-white/[0.08]
          max-[900px]:grid-cols-2 max-[900px]:gap-7
          max-[600px]:grid-cols-1 max-[600px]:gap-6
        ">

          {/* Brand */}
          <div className="text-white">
            <span
              className="block text-[20px] text-white mb-3"
              style={{ fontFamily: "var(--font-dm-serif, 'Geist', sans-serif)" }}
            >
              bioInteraction
            </span>
            <p className="text-[13px] text-white/45 leading-[1.7]">
              Actif depuis 2016 dans le domaine du diagnostic médical.
              Distribution spécialisée en réactifs et équipements de laboratoire
              pour les établissements de santé algériens.
            </p>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className={colHeadCls}>Nos Produit</h4>
            {CATALOGUE_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={colLinkCls}>
                {label}
              </Link>
            ))}
            <button
              onClick={openDevis}
              className="block text-[13px] text-white/65 mb-2 transition-colors duration-150 hover:text-white bg-transparent border-none cursor-pointer p-0 text-left"
            >
              Demander un devis
            </button>
          </div>

          {/* Contact */}
          <div>
            <h4 className={colHeadCls}>Contact</h4>
            {CONTACT_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className={colLinkCls}>
                {label}
              </a>
            ))}
          </div>

          {/* Commercial & SAV */}
          <div>
            <h4 className={colHeadCls}>Commercial &amp; SAV</h4>
            {COMMERCIAL_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className={colLinkCls}>
                {label}
              </a>
            ))}
          </div>

          {/* Adresse */}
          <div>
            <h4 className={colHeadCls}>Adresse</h4>
            <span className="block text-[13px] text-white/65 mb-2">
              313 Rue du Colonel Bougara
            </span>
            <span className="block text-[13px] text-white/65 mb-2">
              Alger Plage, Bordj El Bahri — Alger
            </span>
            <a
              href="https://www.linkedin.com/company/bio-interaction-alg%C3%A9rie"
              target="_blank"
              rel="noopener noreferrer"
              className={colLinkCls}
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100093904603412"
              target="_blank"
              rel="noopener noreferrer"
              className={colLinkCls}
            >
              Facebook
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="
          flex justify-between items-center
          text-[12px] text-white/30
          max-[600px]:flex-col max-[600px]:gap-1 max-[600px]:text-center
        ">
          <span>© 2026 Bio Interaction Algérie — Tous droits réservés</span>
          <span>Réactifs · Équipements · Diagnostic médical</span>
        </div>

      </div>
    </footer>
  );
}
