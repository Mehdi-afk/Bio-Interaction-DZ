/**
 * LDBIO Diagnostics — scraper + matching + génération TypeScript
 * Run: node scripts/scrape-ldbio.mjs
 *
 * Output:
 *   data/ldbio_index.json
 *   data/ldbio_matching_report.json
 *   src/data/fiches-ldbio.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

const BASE = "https://ldbiodiagnostics.com/myldbio_notices/";

// ── Helpers ───────────────────────────────────────────────────────────────────

async function fetchPage(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.text();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/** Parse file items from a folder HTML page → [{name, url}] */
function parseFileItems(html) {
  const items = [...html.matchAll(/class="eeSFL_Item">([\s\S]*?)<\/tr>/gi)];
  const result = [];
  for (const [, block] of items) {
    const nameMatch = block.match(/eeSFL_RealFileName[^>]*>\s*([^\s<][^<]*?)\s*</);
    const linkMatch = [...block.matchAll(/href="(https:\/\/[^"]+\.pdf)"/gi)];
    if (nameMatch && linkMatch.length > 0) {
      result.push({ name: nameMatch[1].trim(), url: linkMatch[0][1] });
    }
  }
  return result;
}

/** Build folder URL for a given category and language */
function folderUrl(category, lang) {
  const folder = encodeURIComponent(`NOTICES/${category}/${lang}`);
  return `${BASE}?eeFront=1&ee=1&eeFolder=${folder}&eeListID=1`;
}

// ── ÉTAPE 1 : Scraping ────────────────────────────────────────────────────────

const CATEGORIES = ["1_IMMUNOBLOTS", "2_RAPID-TESTS", "3_OTHERS"];
const LANGS      = ["FRANCAIS", "ENGLISH"];

console.log("═══ ÉTAPE 1 — Scraping LDBIO ═══\n");

// Map: normalizedName → { FR: {name,url}, EN: {name,url} }
const byName = {};

for (const cat of CATEGORIES) {
  console.log(`▶ Catégorie : ${cat}`);
  for (const lang of LANGS) {
    const url  = folderUrl(cat, lang);
    let html;
    try {
      html = await fetchPage(url);
    } catch (e) {
      console.log(`  ⚠ ${lang} — erreur: ${e.message}`);
      continue;
    }
    const files = parseFileItems(html);
    const code  = lang === "FRANCAIS" ? "FR" : "EN";
    console.log(`  ${code}: ${files.length} fichiers`);

    for (const { name, url: fileUrl } of files) {
      // Normalize key: strip version (_vs##), lang suffix (_fr_en, _fr, _en), extension
      const key = name
        .replace(/\.pdf$/i, "")
        .replace(/-vs\d+.*/i, "")   // remove version and everything after
        .toUpperCase()
        .trim();

      if (!byName[key]) byName[key] = { key, rawName: name };
      byName[key][code] = { name, url: fileUrl };
    }

    await sleep(400); // polite delay
  }
}

// ── ÉTAPE 2 : Sélection FR > EN par fichier ────────────────────────────────────

const index = [];
const noticeSummary = { fr: 0, en_fallback: 0, unavailable: 0 };

for (const [key, entry] of Object.entries(byName)) {
  if (entry.FR) {
    index.push({
      key,
      nom: entry.rawName.replace(/\.pdf$/i,"").replace(/-vs\d+.*/i,"").replace(/-/g," ").trim(),
      langue_telechargee: "FR",
      fallback_en: false,
      url: entry.FR.url,
      fichier_nom: entry.FR.name,
    });
    noticeSummary.fr++;
  } else if (entry.EN) {
    index.push({
      key,
      nom: entry.rawName.replace(/\.pdf$/i,"").replace(/-vs\d+.*/i,"").replace(/-/g," ").trim(),
      langue_telechargee: "EN",
      fallback_en: true,
      url: entry.EN.url,
      fichier_nom: entry.EN.name,
    });
    noticeSummary.en_fallback++;
  } else {
    noticeSummary.unavailable++;
  }
}

console.log(`\n✓ ${index.length} notices scrapées`);
console.log(`  FR: ${noticeSummary.fr} | EN fallback: ${noticeSummary.en_fallback} | indisponible: ${noticeSummary.unavailable}`);

mkdirSync(join(ROOT, "data"), { recursive: true });
writeFileSync(join(ROOT, "data", "ldbio_index.json"), JSON.stringify(index, null, 2));
console.log(`✓ Index → data/ldbio_index.json`);

// ── ÉTAPE 3 : Matching avec nos produits ──────────────────────────────────────

console.log("\n═══ ÉTAPE 3 — Matching ═══\n");

import { readFileSync } from "fs";

const tsSource = readFileSync(join(ROOT, "src", "data", "products-reactifs.ts"), "utf-8");

// Extract LDBIO products — two-pass to handle any field order
// Pass 1: ref + marque (stable order)
const pass1Re = /"ref"\s*:\s*"([^"]+)"[\s\S]*?"marque"\s*:\s*"([^"]+)"/g;
// Pass 2: desc (look near the ref)
const allProducts = [];
let pm;
const ldbioPairs = [];
while ((pm = pass1Re.exec(tsSource)) !== null) {
  if (pm[2].includes("LDBIO") || pm[2].toLowerCase().includes("ldbio")) {
    ldbioPairs.push({ ref: pm[1].trim(), marque: pm[2].trim(), pos: pm.index });
  }
}
for (const pair of ldbioPairs) {
  const block = tsSource.slice(pair.pos, pair.pos + 600);
  const descMatch = block.match(/"desc"\s*:\s*"([^"]+)"/);
  if (descMatch) {
    allProducts.push({ ref: pair.ref, desc: descMatch[1].trim(), marque: pair.marque });
  }
}
console.log(`✓ ${allProducts.length} produits LDBIO trouvés`);

/** Normalize a string for fuzzy matching */
function norm(s) {
  return s.toUpperCase()
    .replace(/\s*WB\s*(IGG|IGM|IGA|IGG\s*IGM)\s*/gi, " ")
    .replace(/\s*ICT\s*(IGG|IGM|IGA|IGG\s*IGM)?\s*/gi, " ICT ")
    .replace(/[\s\-_]+/g, " ")
    .replace(/\bIG([AGME])\b/g, "IG$1")
    .trim();
}

/** Simple token overlap similarity [0–1] */
function similarity(a, b) {
  const ta = new Set(norm(a).split(" ").filter(Boolean));
  const tb = new Set(norm(b).split(" ").filter(Boolean));
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / Math.max(ta.size, tb.size);
}

// Manual reference overrides (where name matching would fail)
const MANUAL_MAP = {
  "TOP-WBGM":    "TOXOPLASMA WB IGG IGM",
  "TXA-WBG":     "TOXOCARA WB IGG",
  "LES-WBG":     "LEISHMANIA WB IGG",
  "ECH-WBG":     "ECHINOCOCCUS WB IGG",
  "CYS-WBG":     "CYSTICERCOSIS WB IGG",
  "TRI ES-WBG":  "TRICHINELLA ES WB IGG",
  "SCH II-WBG":  "SCHISTO II WB IGG",
  "FAS ES-WBG":  "FASCIOLA ES WB IGG",
  "ASP-WBG":     "ASPERGILLUS WB IGG",
  "CHA-WB G":    "CHAGAS WB IGG",
  "PEO-WBG":     "PEO WB IGG",
  "TOXO Ab ICT": "TOXOPLASMA ICT",
  "BILZ Ab ICT": "SCHISTOSOMA ICT",
  "ASPG Ab ICT": "ASPERGILLUS ICT",
  "MPEO Ab ICT": "PEO ICT",
  "TOXO II G":   "TOXO II IGG",
  "T2MM":        "TOXO II IGM",
  // Accessories & consumables — no notice expected
  "WB-DE125": null,
  "WB-IG30":  null,
  "WB-IM60":  null,
  "WB-IA30":  null,
  "WB-SA125": null,
  "WB-LC60":  null,
  "B200":     null,
  "WBPP08":   null,
};

const matches    = [];
const nonMatches = [];
const fallbackEN = [];

for (const product of allProducts) {
  // Skip accessories/consumables intentionally excluded
  if (MANUAL_MAP[product.ref] === null) continue;

  const targetNorm = MANUAL_MAP[product.ref]
    ? norm(MANUAL_MAP[product.ref])
    : norm(product.desc);

  let bestScore = 0;
  let bestFiche = null;

  for (const fiche of index) {
    const ficheNorm = norm(fiche.nom);
    const score = similarity(targetNorm, ficheNorm);
    if (score > bestScore) { bestScore = score; bestFiche = fiche; }
  }

  if (bestScore >= 0.6 && bestFiche) {
    const entry = {
      ref: product.ref,
      desc: product.desc,
      score: Math.round(bestScore * 100),
      langue: bestFiche.langue_telechargee,
      fallback_en: bestFiche.fallback_en,
      url: bestFiche.url,
      fiche_nom: bestFiche.fichier_nom,
    };
    matches.push(entry);
    if (bestFiche.fallback_en) fallbackEN.push(product.ref);
    console.log(`  ✓ [${Math.round(bestScore*100)}%] ${product.ref} → ${bestFiche.fichier_nom} (${bestFiche.langue_telechargee})`);
  } else {
    nonMatches.push({ ref: product.ref, desc: product.desc, bestScore: Math.round(bestScore * 100) });
    console.log(`  ✗ ${product.ref} (${product.desc}) — score ${Math.round(bestScore*100)}%`);
  }
}

console.log(`\n✓ ${matches.length} matchés | ${nonMatches.length} non matchés | ${fallbackEN.length} fallback EN`);

const report = {
  generatedAt: new Date().toISOString(),
  stats: { total: allProducts.length, matched: matches.length, unmatched: nonMatches.length, fallbackEN: fallbackEN.length },
  matches,
  non_matches: nonMatches,
  fallback_en_utilises: fallbackEN,
};
writeFileSync(join(ROOT, "data", "ldbio_matching_report.json"), JSON.stringify(report, null, 2));
console.log(`✓ Rapport → data/ldbio_matching_report.json`);

// ── ÉTAPE 4 : Génération TypeScript ───────────────────────────────────────────

console.log("\n═══ ÉTAPE 4 — Génération TypeScript ═══\n");

let ts = `// AUTO-GENERATED — scripts/scrape-ldbio.mjs
// Source: https://ldbiodiagnostics.com/myldbio_notices/
// ${matches.length} réactifs LDBIO avec notice (FR prioritaire, EN fallback)

export type LdbioFiche = {
  url:        string;
  langue:     "FR" | "EN";
  fallback:   boolean; // true = pas de version FR, notice EN utilisée
};

/** Map ref produit → notice LDBIO */
export const FICHES_LDBIO: Record<string, LdbioFiche> = {\n`;

for (const m of matches) {
  ts += `  "${m.ref}": { url: "${m.url}", langue: "${m.langue}", fallback: ${m.fallback_en} },\n`;
}
ts += `};\n`;

const dest = join(ROOT, "src", "data", "fiches-ldbio.ts");
writeFileSync(dest, ts);
console.log(`✓ Généré → src/data/fiches-ldbio.ts (${matches.length} entrées)`);
