/**
 * Publier 4 articles de blog dans Firestore.
 * Run : node scripts/publish-blog-articles.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");

/* ── Lecture .env.local ── */
function loadEnv() {
  const text = readFileSync(join(ROOT, ".env.local"), "utf8");
  const env  = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[m[1]] = val.replace(/\\n/g, "\n");
  }
  return env;
}
const env = loadEnv();

/* ── Firebase Admin ── */
const { initializeApp, cert } = await import("firebase-admin/app");
const { getFirestore }        = await import("firebase-admin/firestore");
const { getAuth }             = await import("firebase-admin/auth");

initializeApp({
  credential: cert({
    projectId:   env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey:  env.FIREBASE_PRIVATE_KEY,
  }),
});
const db   = getFirestore();
const auth = getAuth();

/* ── Auteur ── */
let authorUid  = "admin";
let authorName = "Bio Interaction";
try {
  const u = await auth.getUserByEmail(env.NEXT_PUBLIC_ADMIN_EMAIL);
  authorUid  = u.uid;
  authorName = u.displayName || u.email || "Bio Interaction";
} catch { /* ignore */ }

/* ── Helpers ── */
function toSlug(t) {
  return t.toLowerCase().normalize("NFD")
    .replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9\s-]/g,"")
    .replace(/\s+/g,"-").replace(/-+/g,"-").trim();
}
const p   = text => ({ type:"paragraph", text });
const h2  = text => ({ type:"heading2",  text });
const h3  = text => ({ type:"heading3",  text });
const q   = text => ({ type:"quote",     text });
const div = ()   => ({ type:"divider" });
const ul  = items => ({ type:"list", listStyle:"bullet",   items });
const ol  = items => ({ type:"list", listStyle:"numbered", items });
const now = { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };

/* ══════════════════════════════════════════════════════════════════════════
   ARTICLES
   ══════════════════════════════════════════════════════════════════════════ */

const articles = [

  /* ────────────────────────────────────────────────────────────────────────
     Article 1 : Interprétation ANA assistée par IA – étude pilote allemande
     ──────────────────────────────────────────────────────────────────────── */
  {
    title:    "Interprétation ANA assistée par IA : une étude pilote allemande",
    subtitle: "Le système akiron® NEO améliore la cohérence et l'efficacité du diagnostic des maladies auto-immunes",
    excerpt:  "Une étude pilote menée en Allemagne évalue l'apport de l'intelligence artificielle dans l'interprétation des anticorps anti-nucléaires (ANA) par immunofluorescence indirecte sur cellules HEp-2.",
    tags:     ["Intelligence Artificielle", "ANA", "Auto-immunité", "Diagnostic"],
    body: [
      p("Le test ANA (anticorps anti-nucléaires) par immunofluorescence indirecte (IFI) sur cellules HEp-2 est une étape incontournable dans le bilan des maladies auto-immunes systémiques. Pourtant, cette méthode reste soumise à d'importantes variabilités inter-opérateurs, liées à l'expérience du technicien et à la subjectivité de l'interprétation visuelle. C'est pour répondre à ces limites qu'une étude pilote allemande, conduite par le Centre Médical Universitaire de Ratisbonne et le Centre Médical Asklepios de Bad Abbach, a évalué les performances de l'intelligence artificielle dans ce domaine."),
      div(),
      h2("Le défi de l'interprétation manuelle des ANA"),
      p("L'analyse manuelle des images IFI est une procédure chronophage, dont les résultats varient selon les laboratoires et les opérateurs. Les principaux obstacles identifiés sont :"),
      ul([
        "La grande variabilité inter-observateurs dans l'identification des patterns fluorescents",
        "La nécessité d'une expertise spécialisée et d'une formation continue",
        "La difficulté à standardiser les titres d'anticorps entre laboratoires",
        "L'absence de nomenclature universelle, malgré les efforts de consensus ICAP",
      ]),
      h2("La solution : le système akiron® NEO"),
      p("Le système akiron® NEO repose sur la reconnaissance d'images par apprentissage automatique (machine learning). Il a été conçu pour automatiser les trois étapes clés de l'analyse ANA :"),
      ol([
        "Classification positive/négative des échantillons",
        "Identification des patterns de fluorescence selon la nomenclature ICAP",
        "Calcul automatisé des titres d'anticorps",
      ]),
      div(),
      h2("Résultats de l'étude pilote"),
      p("L'étude a porté sur 143 échantillons cliniques non sélectionnés, analysés en parallèle par l'IA et par des experts humains expérimentés. Les résultats sont encourageants :"),
      ul([
        "Excellente concordance IA/experts pour la discrimination positif/négatif",
        "Concordance modérée à excellente pour la reconnaissance des patterns de fluorescence",
        "Une légère tendance de l'IA à attribuer des titres plus élevés que l'évaluation manuelle, sans impact clinique significatif",
      ]),
      q("La variabilité observée dans l'interprétation des ANA reflète la complexité méthodologique intrinsèque de la technique, et non une limitation technologique de l'IA."),
      h2("Impact clinique et perspectives"),
      p("L'intégration de l'IA dans le processus diagnostique ANA ouvre des perspectives prometteuses pour les laboratoires de biologie médicale. Les principaux bénéfices attendus incluent une meilleure reproductibilité des résultats entre sites, une accélération du tri initial des échantillons et la libération de temps pour les biologistes, qui peuvent ainsi se concentrer sur les cas complexes."),
      p("L'expertise humaine reste essentielle. L'IA doit être considérée comme un outil diagnostique complémentaire, capable d'assister l'expert sans le remplacer. Pour les patients, cela pourrait se traduire par des délais diagnostiques réduits et une initiation plus précoce des traitements."),
    ],
  },

  /* ────────────────────────────────────────────────────────────────────────
     Article 2 : Microbiome intestinal et biomarqueurs sérologiques dans les MICI
     ──────────────────────────────────────────────────────────────────────── */
  {
    title:    "Microbiome intestinal et biomarqueurs sérologiques dans les MICI",
    subtitle: "Les enseignements de la cohorte familiale KINDRED — plus de 2 300 individus analysés",
    excerpt:  "La cohorte KINDRED explore les liens entre dysbiose intestinale et biomarqueurs sérologiques chez les patients atteints de maladies inflammatoires chroniques de l'intestin (MICI) et leurs proches.",
    tags:     ["Microbiome", "MICI", "Biomarqueurs", "Maladie de Crohn", "Colite ulcéreuse"],
    body: [
      p("Les maladies inflammatoires chroniques de l'intestin (MICI) — maladie de Crohn (MC) et rectocolite hémorragique (RCH) — sont des pathologies complexes dont la physiopathologie implique des interactions entre le génome de l'hôte, le microbiome intestinal et le système immunitaire. La cohorte KINDRED IBD Family Cohort Study, initiée en 2013, fournit aujourd'hui des données inédites sur l'évolution du microbiote chez les patients MICI et leurs familles."),
      div(),
      h2("La cohorte KINDRED : une étude familiale d'envergure"),
      p("Cette étude longitudinale a analysé plus de 2 300 individus à l'aide d'un séquençage du microbiome, de données cliniques détaillées, de profils génétiques et de biomarqueurs inflammatoires. L'inclusion des membres de la famille de patients atteints de MICI permet d'évaluer la part génétique et environnementale dans la composition du microbiote."),
      h2("Caractéristiques de la dysbiose dans les MICI"),
      p("Les résultats de la cohorte KINDRED révèlent des perturbations microbiennes significatives et reproductibles chez les patients MICI :"),
      ol([
        "Réduction de la diversité microbienne : tant dans la MC que dans la RCH, la diversité alpha est significativement diminuée. Cette perte de diversité est corrélée à des taux élevés de calprotectine et d'anticorps ASCA.",
        "Expansion de bactéries pro-inflammatoires : augmentation notable de Klebsiella et d'Escherichia/Shigella, deux genres associés à l'inflammation intestinale.",
        "Migration de bactéries d'origine orale : des espèces comme Fusobacterium nucleatum, Veillonella et Rothia sont anormalement retrouvées dans l'intestin des patients MICI.",
        "Disparition de bactéries protectrices : les sujets sains maintiennent des niveaux plus élevés de Faecalibacterium et de Ruminococcaceae, espèces reconnues pour leurs propriétés anti-inflammatoires.",
      ]),
      div(),
      h2("Biomarqueurs sérologiques : ASCA et anti-GP2"),
      p("Parmi les marqueurs sérologiques étudiés, les anticorps ASCA (anti-Saccharomyces cerevisiae) et anti-GP2 (anti-glycoprotéine 2 pancréatique) se démarquent comme des outils cliniques particulièrement pertinents. Ces tests ELISA standardisés présentent des avantages décisifs pour leur intégration en routine :"),
      ul([
        "Standardisation élevée des protocoles analytiques",
        "Coût accessible par rapport au séquençage du microbiome",
        "Facilité d'implémentation dans les laboratoires de biologie médicale",
        "Corrélation avec les indices de sévérité clinique",
      ]),
      q("Les anticorps ASCA et anti-GP2 constituent des alternatives pratiques et économiques au séquençage métagénomique pour le suivi des MICI en routine diagnostique."),
      h2("Interactions génome-microbiome"),
      p("L'étude met en lumière des interactions complexes entre les facteurs de risque génétiques et la composition du microbiome. Certains variants génétiques associés aux MICI influencent directement la structure de la communauté microbienne intestinale, suggérant que le développement de la maladie résulte d'une interférence entre prédisposition génétique et dysrégulation du microbiote. Ces données ouvrent des perspectives pour des stratégies thérapeutiques ciblées combinant modulation du microbiome et thérapies biologiques."),
    ],
  },

  /* ────────────────────────────────────────────────────────────────────────
     Article 3 : Validation clinique de l'interprétation ANA par IA en routine
     ──────────────────────────────────────────────────────────────────────── */
  {
    title:    "Validation clinique de l'interprétation ANA HEp-2 par IA en routine diagnostique",
    subtitle: "Performances comparables aux immunologistes expérimentés sur 2 671 échantillons consécutifs",
    excerpt:  "Une étude de grande envergure publiée dans Clinica Chimica Acta évalue les performances réelles du système akiron® NEO pour l'interprétation automatisée des ANA en immunofluorescence sur cellules HEp-2.",
    tags:     ["Intelligence Artificielle", "ANA", "HEp-2", "Validation clinique", "Automatisation"],
    body: [
      p("L'immunofluorescence indirecte (IFI) sur cellules HEp-2 demeure la méthode de référence pour le dépistage des anticorps anti-nucléaires (ANA) dans les maladies auto-immunes rhumatologiques systémiques (SARD), incluant le lupus érythémateux systémique, la sclérose systémique et le syndrome de Sjögren. Cependant, l'interprétation manuelle des patterns IFI reste chronophage, opérateur-dépendante et sujette à une variabilité inter-observateurs significative."),
      p("Une étude clinique de grande envergure, publiée dans la revue Clinica Chimica Acta, a évalué si l'interprétation automatisée par IA peut rivaliser avec la performance d'immunologistes expérimentés dans des conditions réelles de laboratoire. L'investigation a porté sur 2 671 échantillons sériques consécutifs, analysés en parallèle par lecture visuelle experte et par le système akiron® NEO."),
      div(),
      h2("Performances en conditions réelles"),
      p("L'étude a évalué trois critères clés : la discrimination positif/négatif, l'attribution des titres et la reconnaissance des patterns de fluorescence selon les critères ICAP (International Consensus on ANA Patterns)."),
      ul([
        "Bonne concordance globale pour la classification positif/négatif des ANA",
        "Amélioration significative de l'accord lors de l'exclusion des échantillons faiblement positifs",
        "Valeurs kappa jusqu'à 0,650 pour les patterns nucléaires aux titres cliniquement significatifs (≥ 1:320)",
        "Concordance encore plus élevée pour l'identification des patterns mitotiques (κ jusqu'à 0,736)",
        "Légère réduction de concordance pour les patterns cytoplasmiques, cohérente avec la littérature",
      ]),
      q("La variabilité dans l'interprétation des ANA reflète la complexité méthodologique inhérente à la technique, et non une limitation de l'IA. L'accord entre l'IA et les experts est comparable à la variabilité inter-observateurs entre immunologistes expérimentés."),
      div(),
      h2("Architecture Deep Learning du système akiron® NEO"),
      p("La plateforme akiron® NEO applique des réseaux de neurones convolutifs (CNN) hiérarchiques entraînés pour des tâches analytiques spécifiques :"),
      ul([
        "Détection de la phase du cycle cellulaire",
        "Reconnaissance des patterns nucléaires et cytoplasmiques",
        "Analyse des cellules en mitose (métaphase)",
        "Intégration du marquage DAPI pour l'identification précise des métaphases",
      ]),
      p("L'ensemble de ces sorties est intégré pour générer des interprétations ANA standardisées, alignées sur la nomenclature ICAP. Cette approche modulaire permet une analyse robuste et reproductible, indépendante de l'expérience de l'opérateur."),
      h2("Corrélations cliniques"),
      p("Dans un sous-ensemble d'échantillons ayant bénéficié d'un immunoblot de confirmation, la reconnaissance de patterns par l'IA a démontré des associations sérologiques attendues et cliniquement cohérentes :"),
      ul([
        "Tous les patterns centromères (AC-3) correspondaient à une positivité anti-CENP-B",
        "Les patterns mouchetés montraient des associations avec les anticorps anti-Ro52, SS-A, SS-B, Sm et U1-nRNP",
        "Les patterns homogènes étaient corrélés avec la présence d'anti-dsDNA",
      ]),
      h2("Conclusion"),
      p("L'interprétation ANA HEp-2 par IA démontre des performances diagnostiques comparables à celles d'immunologistes expérimentés en pratique de routine à grande échelle. Si la revue par un expert reste indispensable pour les cas complexes, l'automatisation améliore l'efficacité du flux de travail, renforce la reproductibilité des résultats et réduit la subjectivité inhérente à la classification ICAP."),
    ],
  },

  /* ────────────────────────────────────────────────────────────────────────
     Article 4 : Biomarqueurs sérologiques dans la CSP – anti-GP2 IgA
     ──────────────────────────────────────────────────────────────────────── */
  {
    title:    "Biomarqueurs sérologiques dans la CSP : focus sur les anti-GP2 IgA",
    subtitle: "Améliorer le diagnostic et la stratification du risque dans la cholangite sclérosante primitive",
    excerpt:  "La cholangite sclérosante primitive (CSP) est une maladie inflammatoire chronique des voies biliaires dont le diagnostic reste difficile. Les anticorps anti-GP2 IgA émergent comme un biomarqueur sérologique prometteur pour la stratification du risque.",
    tags:     ["CSP", "Biomarqueurs", "Anti-GP2", "Foie", "Cholangite"],
    body: [
      p("La cholangite sclérosante primitive (CSP) est une maladie inflammatoire chronique des voies biliaires, caractérisée par une fibrose progressive pouvant évoluer vers une cirrhose et un carcinome des voies biliaires (cholangiocarcinome). Sa physiopathologie reste incomplètement élucidée, ce qui complique aussi bien son diagnostic que sa prise en charge thérapeutique."),
      div(),
      h2("Le défi diagnostique de la CSP"),
      p("Le diagnostic de la CSP repose traditionnellement sur des examens d'imagerie comme la cholangio-IRM (CPRM) et des marqueurs non spécifiques tels que la phosphatase alcaline. En l'absence de marqueurs sérologiques spécifiques de la maladie, le diagnostic est souvent tardif et la stratification du risque reste imprécise."),
      p("Les principaux obstacles identifiés dans la prise en charge de la CSP sont :"),
      ul([
        "Absence de biomarqueur diagnostique spécifique validé",
        "Hétérogénéité clinique et progression variable de la maladie",
        "Chevauchement fréquent avec d'autres pathologies hépatobiliaires auto-immunes",
        "Manque d'outils fiables pour prédire le risque de complications (cirrhose, cholangiocarcinome)",
      ]),
      h2("Les anti-GP2 IgA : un biomarqueur prometteur"),
      p("La glycoprotéine 2 (GP2) est une protéine pancréatique impliquée dans la défense immunitaire intestinale. Sa présence à la surface des cellules M de l'épithélium des plaques de Peyer lui confère un rôle dans la surveillance immunitaire luminale. La détection d'anticorps anti-GP2 IgA dans le sérum de patients atteints de CSP suggère une dérégulation de l'axe intestin-foie, caractéristique de cette pathologie."),
      p("Les données disponibles indiquent que la présence d'anti-GP2 IgA est associée à :"),
      ul([
        "Des phénotypes de maladie plus sévères",
        "Un risque accru d'évolution vers une insuffisance hépatique terminale",
        "Une augmentation du risque de cholangiocarcinome",
        "Une activité inflammatoire plus marquée des voies biliaires",
      ]),
      q("Les anti-GP2 IgA constituent l'un des biomarqueurs sérologiques les plus prometteurs pour la stratification du risque dans la CSP, ouvrant la voie à une médecine de précision dans la prise en charge de cette maladie."),
      div(),
      h2("Autres marqueurs immunologiques pertinents"),
      p("Outre les anti-GP2 IgA, d'autres marqueurs sérologiques méritent attention dans le bilan de la CSP :"),
      ul([
        "IgG4 élevées (présentes chez environ 10 % des patients) : associées à une progression plus agressive de la maladie et à un risque accru de complications",
        "Anticorps pANCA (péri-nucléaires anti-neutrophiles) : fréquemment détectés dans la CSP mais manquant de spécificité diagnostique",
        "Anticorps anti-GP2 IgG : complémentaires aux IgA pour une évaluation sérologique complète",
      ]),
      h2("Application clinique et outils disponibles"),
      p("Medipan et GA Generic Assays proposent des kits ELISA validés pour la détection des anti-GP2 IgA et IgG, permettant leur intégration en routine dans les laboratoires de biologie médicale. Ces tests offrent plusieurs avantages pratiques :"),
      ul([
        "Standardisation analytique rigoureuse",
        "Facilité d'implémentation dans les automates ELISA existants",
        "Valeurs seuils définies pour une interprétation clinique directe",
        "Complémentarité avec les marqueurs hépatiques conventionnels",
      ]),
      p("L'intégration des anti-GP2 IgA dans le bilan sérologique de la CSP représente une avancée significative vers une meilleure stratification des patients, une surveillance plus personnalisée et une identification précoce des sujets à risque élevé de complications. Ces biomarqueurs ouvrent la voie à une approche plus précise et individualisée de la prise en charge de cette maladie complexe."),
    ],
  },
];

/* ── Publication ── */
console.log(`\n🚀 Publication de ${articles.length} articles...\n`);
let published = 0;

for (const article of articles) {
  const sl = toSlug(article.title);
  try {
    const ref = await db.collection("articles").add({
      title:       article.title,
      subtitle:    article.subtitle,
      excerpt:     article.excerpt,
      slug:        sl,
      coverImage:  "",
      body:        article.body,
      tags:        article.tags,
      status:      "published",
      authorName,
      authorId:    authorUid,
      createdAt:   now,
      publishedAt: now,
    });
    console.log(`✅ ${article.title}`);
    console.log(`   ID: ${ref.id}  |  slug: /blog/${sl}\n`);
    published++;
  } catch (err) {
    console.error(`❌ Erreur pour "${article.title}":`, err.message);
  }
}

console.log(`\n✔ ${published}/${articles.length} articles publiés.`);
