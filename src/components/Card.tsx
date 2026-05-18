import Link from "next/link";

// ── Type ─────────────────────────────────────────────────────────────────────

export type CategoryCard = {
  /** Route Next.js cible — remplace onclick="showPage('reactifs', cat)" */
  href: string;
  /** Couleur hex de la barre d'accent en haut de la carte */
  accentColor: string;
  /**
   * Icône de la carte.
   * L'original utilise des emojis Unicode en texte brut (&#x2697; etc.),
   * pas des balises <img> — il n'y a donc rien à remplacer par <Image />.
   * Si de vraies images produit sont ajoutées plus tard, ce champ
   * deviendra un chemin vers /public et on utilisera <Image> ici.
   */
  icon: string;
  title: string;
  description: string;
  /** Ex : "95 références — ERBA" */
  count: string;
};

// ── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  card: CategoryCard;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Card({ card }: Props) {
  return (
    <Link
      href={card.href}
      className="
        relative overflow-hidden block
        py-8 px-7
        max-[600px]:py-5 max-[600px]:px-[18px]
        border border-[#E5E3DC] rounded-2xl
        text-[#1B1F1D] no-underline cursor-pointer
        transition-all duration-200
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:border-[#29A864]
      "
    >
      {/* Accent bar — couleur unique par spécialité */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: card.accentColor }}
      />

      {/* Icône emoji */}
      <div className="text-[32px] mt-2" aria-hidden="true">
        {card.icon}
      </div>

      {/* Titre */}
      <h3 className="text-[17px] font-semibold mt-3 mb-1.5">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#6E6E6E] leading-[1.55]">
        {card.description}
      </p>

      {/* Compteur de références */}
      <div className="text-[13px] text-[#A9ADAA] mt-3">
        {card.count}
      </div>
    </Link>
  );
}
