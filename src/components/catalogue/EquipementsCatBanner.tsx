type IconName = "atom" | "gear" | "shield" | "heart" | "users" | "zap" | "clock";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const cls = className ?? "w-6 h-6";
  if (name === "atom") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1.5"/>
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/>
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
    </svg>
  );
  if (name === "gear") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
  if (name === "shield") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
  if (name === "heart") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
  if (name === "users") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
  if (name === "zap") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
  if (name === "clock") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
  return null;
}

type Block = { icon: IconName; title: string; desc: string };

const BANNERS: Record<string, { layout: "biochimie"; intro: string; blocks: Block[] } | { layout: "three-col"; blocks: Block[] }> = {
  biochimie: {
    layout: "biochimie",
    intro:
      "Des solutions d'analyse biochimique de confiance pour des milliers de laboratoires à travers le monde. Famille d'analyseurs haute performance avec réactifs à tag RFID et système de chargement automatique. Large gamme allant du photomètre semi-automatisé à l'automatisation complète jusqu'à 1 000 tests/heure.",
    blocks: [
      {
        icon: "atom",
        title: "Abordable",
        desc: "Des analyseurs accessibles pour laboratoires de toutes tailles, avec un excellent rapport qualité-prix.",
      },
      {
        icon: "gear",
        title: "Efficace",
        desc: "Haute cadence jusqu'à 1 000 tests/heure, réactifs RFID et chargement continu sans interruption.",
      },
      {
        icon: "shield",
        title: "Fiable",
        desc: "Résultats précis et reproductibles, technologie photométrique éprouvée et contrôle qualité intégré.",
      },
      {
        icon: "heart",
        title: "Sérénité",
        desc: "Maintenance simplifiée, support technique réactif et interface conviviale pour un quotidien serein.",
      },
    ],
  },
  hematologie: {
    layout: "three-col",
    blocks: [
      {
        icon: "users",
        title: "Facile",
        desc: "Prise en main rapide grâce à une interface tactile intuitive et un workflow simplifié pour tous les opérateurs.",
      },
      {
        icon: "zap",
        title: "Efficace",
        desc: "Résultats complets en moins de 60 secondes, chargement continu et traitement à haut débit.",
      },
      {
        icon: "gear",
        title: "Fiable",
        desc: "Précision analytique certifiée, alarmes morphologiques avancées et contrôle qualité intégré.",
      },
    ],
  },
  urines: {
    layout: "three-col",
    blocks: [
      {
        icon: "clock",
        title: "Efficace",
        desc: "Analyse chimique et morphologique en un seul passage pour un débit optimisé du laboratoire.",
      },
      {
        icon: "zap",
        title: "Puissant",
        desc: "Technologie combinant chimie sèche et analyse microscopique automatisée du sédiment urinaire.",
      },
      {
        icon: "users",
        title: "Convivial",
        desc: "Interface intuitive, maintenance réduite et formation rapide pour une intégration aisée au flux de travail.",
      },
    ],
  },
};

export default function EquipementsCatBanner({ cat }: { cat: string }) {
  const banner = BANNERS[cat];
  if (!banner) return null;

  if (banner.layout === "biochimie") {
    return (
      <div className="rounded-2xl border border-[#E5E3DC] bg-[#F7F6F2] p-6 max-[600px]:p-4">
        <div className="
          grid grid-cols-[1fr_1fr] gap-8 items-start
          max-[768px]:grid-cols-1 max-[768px]:gap-6
        ">
          <div>
            <span className="inline-block text-[11px] font-semibold tracking-[0.6px] uppercase text-[#29A864] mb-3">
              Points forts
            </span>
            <p className="text-[14px] text-[#6E6E6E] leading-[1.65]">
              {banner.intro}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {banner.blocks.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-xl border border-[#E5E3DC] p-4 flex flex-col items-center text-center"
              >
                <div className="w-9 h-9 rounded-[8px] bg-[#E8F7EF] flex items-center justify-center text-[#29A864] mb-3">
                  <Icon name={b.icon} className="w-[18px] h-[18px]" />
                </div>
                <p className="font-semibold text-[14px] text-[#1B1F1D] mb-1">{b.title}</p>
                <p className="text-[12px] text-[#6E6E6E] leading-[1.55]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E5E3DC] bg-[#F7F6F2] p-6 max-[600px]:p-4">
      <div className="
        grid grid-cols-3 gap-4
        max-[600px]:grid-cols-1 max-[600px]:gap-3
      ">
        {banner.blocks.map((b) => (
          <div
            key={b.title}
            className="bg-white rounded-xl border border-[#E5E3DC] p-4 flex flex-col items-center text-center"
          >
            <div className="w-9 h-9 rounded-[8px] bg-[#E8F7EF] flex items-center justify-center text-[#29A864] mb-3">
              <Icon name={b.icon} className="w-[18px] h-[18px]" />
            </div>
            <p className="font-semibold text-[14px] text-[#1B1F1D] mb-1">{b.title}</p>
            <p className="text-[12px] text-[#6E6E6E] leading-[1.55]">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
