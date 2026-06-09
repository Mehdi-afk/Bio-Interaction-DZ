/**
 * Publier l'article : Performance diagnostique des tests IgG Aspergillus-spécifiques dans l'APC
 * Source : Journal of Thoracic Disease, 2024 — traduction française
 * Run : node scripts/publish-article-aspergillus-igg.mjs
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
   ARTICLE : Tests IgG Aspergillus-spécifiques dans l'aspergillose pulmonaire chronique
   ══════════════════════════════════════════════════════════════════════════ */

const articles = [
  {
    title:    "Tests IgG Aspergillus-spécifiques dans l'aspergillose pulmonaire chronique : ICT versus ELISA",
    subtitle: "L'immunochromatographie rapide (ICT) surpasse l'ELISA en sensibilité et spécificité pour le diagnostic de l'APC",
    excerpt:  "Une étude comparative évalue les performances diagnostiques du test immunochromatographique rapide (ICT) et du test ELISA pour la détection des IgG spécifiques à Aspergillus chez des patients atteints d'aspergillose pulmonaire chronique (APC), en analysant les variations selon les sous-types cliniques et les facteurs influençants.",
    tags:     ["Mycologie", "Aspergillus", "Diagnostic", "IgG", "Sérologie", "Pneumologie"],
    body: [
      p("L'aspergillose pulmonaire chronique (APC) est un syndrome fongique progressif causé par des espèces du genre Aspergillus, principalement Aspergillus fumigatus. Elle se caractérise par des lésions pulmonaires cavitaires, une fibrose et une destruction progressive du parenchyme pulmonaire sain. Sa prise en charge diagnostique reste un défi clinique, notamment dans les pays à ressources limitées où l'accès aux examens spécialisés est restreint."),
      p("Une étude rétrospective multicentrique, impliquant des équipes de Chine (Université médicale de Guangzhou) et du Royaume-Uni (Manchester), a comparé les performances de deux méthodes de détection des IgG spécifiques à Aspergillus : le test immunochromatographique rapide (ICT-POCT) et le test ELISA quantitatif, en prenant comme référence le système ImmunoCAP."),
      div(),

      h2("Contexte clinique : une maladie sous-diagnostiquée"),
      p("L'APC regroupe plusieurs entités cliniques distinctes, selon la morphologie des lésions et la sévérité de la maladie :"),
      ul([
        "L'aspergillose cavitaire chronique (ACC) : la forme la plus fréquente (57 % des cas dans cette étude)",
        "L'aspergillose pulmonaire fibrante chronique (APFC) : forme évoluée avec fibrose étendue (20,5 %)",
        "L'aspergillose invasive subaiguë (AISA) : forme intermédiaire chez les patients partiellement immunodéprimés (9,8 %)",
        "L'aspergillome simple (AS) : cavité pulmonaire colonisée par une masse fongique (8 %)",
        "Les nodules aspergillaires (NA) : lésions nodulaires pulmonaires (8 %)",
      ]),
      p("Le diagnostic repose sur une combinaison de critères cliniques, radiologiques et microbiologiques définis par les lignes directrices ESCMID/ERS. La faible sensibilité des cultures fongiques et le coût élevé des tests spécialisés (galactomannane, PCR) limitent l'accès au diagnostic dans de nombreux contextes."),
      div(),

      h2("Méthodologie de l'étude"),
      p("L'étude a inclus 112 patients atteints d'APC confirmée et 61 témoins présentant d'autres pathologies pulmonaires (BPCO, bronchiectasie, tuberculose séquellaire). Les trois tests ont été réalisés en parallèle sur des prélèvements sériques :"),
      ul([
        "ImmunoCAP (Phadia) : méthode quantitative de référence, avec seuil de positivité à 40 mg/L",
        "ELISA quantitatif Dynamiker Aspergillus fumigatus IgG : seuil positif ≥ 120 AU/mL, zone grise entre 80 et 120 AU/mL",
        "ICT-POCT LDBio : test immunochromatographique à flux latéral, lecture visuelle après 30 minutes",
      ]),
      p("La population étudiée présentait une prédominance masculine (72,3 %), un âge médian de 63 ans, et d'importants antécédents de tuberculose (53,6 %) et de bronchiectasie (33 %), deux conditions prédisposantes majeures à l'APC."),
      div(),

      h2("Résultats : nette supériorité de l'ICT sur l'ELISA"),
      p("Les résultats confirment la supériorité diagnostique du test ICT par rapport à l'ELISA Dynamiker, avec une performance proche du système ImmunoCAP de référence :"),
      ul([
        "ICT-POCT : sensibilité 88,4 % — spécificité 95,1 % — VPP 97,1 % — VPN 81,7 %",
        "ELISA (seuil 80 AU/mL) : sensibilité 58,9 % — spécificité 82,0 % — VPP 85,7 % — VPN 52,1 %",
        "ELISA (seuil 120 AU/mL) : sensibilité réduite à 25,9 % — spécificité améliorée à 96,7 %",
        "ImmunoCAP (référence) : 90,2 % des patients APC positifs au-delà du seuil de 40 mg/L",
      ]),
      q("Le test ICT démontre des performances diagnostiques comparables à l'ImmunoCAP et significativement supérieures à l'ELISA Dynamiker, en particulier chez les patients naïfs de tout traitement antifongique."),
      p("L'analyse par sous-type clinique révèle que l'ICT maintient une sensibilité élevée dans l'ACC (89,1 %) et l'aspergillome simple (88,9 %), deux formes représentant la majorité des cas d'APC. La spécificité reste stable à 95,1 % quel que soit le sous-type."),
      div(),

      h2("Impact du traitement antifongique antérieur"),
      p("Un facteur critique mis en évidence par l'étude est l'effet délétère du traitement antifongique préalable sur les performances des deux tests. Parmi les 112 patients, 43 (38 %) avaient déjà initié une thérapie antifongique active avant le prélèvement."),
      p("Chez les patients traités, la baisse de sensibilité est significative pour les deux méthodes :"),
      ul([
        "ICT : 28 % de résultats faux-négatifs chez les patients sous traitement (vs seulement 1 % chez les non-traités)",
        "ELISA : 47 % de résultats faux-négatifs chez les patients traités (vs 38 % chez les non-traités)",
        "Sous-type ACC sous traitement : sensibilité ICT à 78,6 % — ELISA à 50 %",
        "Aspergillose fibrante sous traitement : sensibilité ICT à 57,1 % — ELISA à 14,3 %",
      ]),
      p("Cette observation s'explique par la cinétique des IgG spécifiques : contrairement au galactomannane antigène (qui persiste en l'absence de traitement), les anticorps IgG déclinent rapidement après l'initiation d'un traitement antifongique efficace. Ce phénomène peut d'ailleurs être exploité pour le suivi de la réponse thérapeutique."),
      div(),

      h2("Influence des comorbidités pulmonaires"),
      p("L'étude analyse également l'impact des pathologies pulmonaires sous-jacentes sur les performances diagnostiques. Les résultats varient sensiblement selon les comorbidités :"),
      ul([
        "BPCO sans corticostéroïdes : ICT à 100 % de sensibilité, ELISA à 71,4 %",
        "BPCO avec corticostéroïdes : sensibilité réduite pour les deux tests (ICT à 60 %, ELISA à 60 %)",
        "Bronchiectasie : ICT à 97,3 % de sensibilité, ELISA à 64,9 %",
        "Antécédents de tuberculose cavitaire : ICT à 96,7 % de sensibilité, ELISA à 53,3 %",
      ]),
      p("L'utilisation de corticostéroïdes systémiques constitue un facteur limitant pour les deux méthodes, vraisemblablement en raison d'une inhibition de la réponse immunitaire humorale, réduisant la production d'IgG spécifiques."),
      div(),

      h2("Comparaison avec d'autres biomarqueurs"),
      p("L'étude positionne le test ICT dans le panorama des biomarqueurs disponibles pour l'APC. La comparaison avec le galactomannane (GM) mesuré dans le lavage broncho-alvéolaire (LBA) est particulièrement instructive :"),
      ul([
        "Sensibilité ICT : 88,4 % — versus 20,2 % pour le GM-LBA (seuil 1,0)",
        "Avantage des IgG : persistance pendant des semaines à des mois après clairance antigénique, contrairement au GM qui s'élimine rapidement",
        "Utilité pour le suivi : la décroissance des IgG sous traitement peut servir d'indicateur de réponse thérapeutique",
        "Accessibilité : l'ICT ne nécessite pas d'infrastructure lourde, contrairement à la fibroscopie bronchique pour le LBA",
      ]),
      q("La sensibilité du test ICT IgG Aspergillus-spécifique (88,4 %) est significativement supérieure à celle du galactomannane dans le LBA (20,2 %), en faisant l'outil sérologique de premier choix pour le diagnostic de l'APC."),
      div(),

      h2("Implications pour les laboratoires et la pratique clinique"),
      p("Les résultats de cette étude ont des implications directes pour l'organisation du diagnostic de l'APC, particulièrement dans des contextes à ressources limitées comme l'Algérie, où l'accès à l'ImmunoCAP et aux explorations endoscopiques peut être difficile."),
      p("Les recommandations pratiques issues de cette étude peuvent être résumées ainsi :"),
      ol([
        "Réaliser les tests IgG Aspergillus avant toute initiation d'un traitement antifongique pour maximiser la sensibilité diagnostique",
        "Privilégier l'ICT en première intention pour son rapport sensibilité/spécificité optimal et sa rapidité d'exécution (résultat en 30 minutes)",
        "Tenir compte des comorbidités (corticothérapie, BPCO) dans l'interprétation des résultats",
        "Utiliser le suivi sériel des IgG comme indicateur de réponse au traitement antifongique",
        "Combiner l'ICT avec d'autres biomarqueurs (GM sérique, culture) pour les cas complexes",
      ]),
      p("La disponibilité d'un test ICT rapide, performant et peu coûteux représente une avancée majeure pour le diagnostic de l'APC dans les pays en développement. Il offre une alternative fiable aux plateformes analytiques sophistiquées, tout en maintenant des performances diagnostiques proches du gold standard ImmunoCAP."),
      div(),

      h2("Conclusion"),
      p("Cette étude comparative démontre que le test immunochromatographique rapide (ICT) pour la détection des IgG Aspergillus-spécifiques offre des performances diagnostiques supérieures à l'ELISA Dynamiker, avec une sensibilité de 88,4 % et une spécificité de 95,1 %. Sa performance est particulièrement robuste dans l'aspergillose cavitaire chronique (ACC) et chez les patients naïfs de traitement antifongique."),
      p("Le traitement antifongique et la corticothérapie systémique réduisent la sensibilité des deux méthodes, soulignant l'importance d'un prélèvement précoce. Par sa rapidité, son accessibilité et sa précision diagnostique, le test ICT se positionne comme un outil de premier choix pour le diagnostic de l'APC, notamment dans les structures de santé disposant de ressources analytiques limitées."),
      q("Source : Duan et al., Journal of Thoracic Disease, 2024. Étude rétrospective menée à l'Hôpital affilié de l'Université médicale de Guangzhou (Chine) en collaboration avec l'Université de Manchester (Royaume-Uni)."),
    ],
  },
];

/* ── Publication ── */
console.log(`\n🚀 Publication de ${articles.length} article(s)...\n`);
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

console.log(`\n✔ ${published}/${articles.length} article(s) publié(s).`);
