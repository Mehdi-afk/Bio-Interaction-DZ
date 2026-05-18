import Card, { type CategoryCard } from "@/src/components/Card";

// ── Données statiques extraites du HTML ──────────────────────────────────────
//
// Original : <a onclick="showPage('reactifs', 'biochimie')">
// Converti  : href="/catalogue/reactifs?cat=biochimie"
// Le paramètre ?cat= sera lu par la page catalogue pour pré-activer le filtre.

const CATEGORY_CARDS: CategoryCard[] = [
  {
    href: "/catalogue/reactifs?cat=biochimie",
    accentColor: "#1D4ED8",
    icon: "⚗️",
    title: "Biochimie Clinique",
    description:
      "Analyseurs ERBA XL, réactifs système fermé/ouvert, ionogramme EC 90 et contrôles qualité.",
    count: "95 références — ERBA",
  },
  {
    href: "/catalogue/reactifs?cat=hematologie",
    accentColor: "#BE123C",
    icon: "🧪",
    title: "Hématologie & Hémostase",
    description:
      "Automates NFS ERBA H360 à H7100, coagulomètres ECL 412/760 et réactifs dédiés.",
    count: "54 références — ERBA",
  },
  {
    href: "/catalogue/reactifs?cat=autoimmunite",
    accentColor: "#6D28D9",
    icon: "🔬",
    title: "Auto-Immunité",
    description:
      "ELISA, DOT et IFI manuels/automatisés (Generic Assays/Medipan) — CLIA BioCLIA (HOB Biotech).",
    count: "167 références",
  },
  {
    href: "/catalogue/reactifs?cat=allergie",
    accentColor: "#C2410C",
    icon: "🧬",
    title: "Allergie",
    description:
      "Panels BioLINE DOT — alimentaire, inhalatoire et mixte — HOB Biotech.",
    count: "18 références — HOB Biotech",
  },
  {
    href: "/catalogue/reactifs?cat=parasitologie",
    accentColor: "#0F766E",
    icon: "🧫",
    title: "Parasitologie & Mycologie",
    description:
      "Western Blot, tests rapides ICT et consommables LDBIO Diagnostics — origine française.",
    count: "25 références — LDBIO",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CardGrid() {
  return (
    <div
      className="
        grid grid-cols-3 gap-5
        max-[1024px]:grid-cols-2
        max-[600px]:grid-cols-1 max-[600px]:gap-3
      "
    >
      {CATEGORY_CARDS.map((card) => (
        <Card key={card.href} card={card} />
      ))}
    </div>
  );
}
