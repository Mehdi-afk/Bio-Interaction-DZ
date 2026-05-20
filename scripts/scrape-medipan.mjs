/**
 * Medipan / Generic Assays — scraper IFU + matching + génération TypeScript
 * Run: node scripts/scrape-medipan.mjs
 *
 * Les PDFs sont téléchargés via POST (password=0815) → servis en clair par le serveur.
 * Stockés dans : public/fiches-techniques/ (servis statiquement par Next.js)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir  = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, "..");
const DATA   = join(ROOT, "data");
mkdirSync(DATA, { recursive: true });

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Referer":    "https://www.medipan.de/sdm_categories/ifu/",
};
const PASSWORD = "0815";
const BASE_DL  = "https://www.medipan.de/?sdm_process_download=1&download_id=";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── ÉTAPE 1 : Parse la page HTML locale ───────────────────────────────────────

console.log("═══ ÉTAPE 1 — Parsing HTML Medipan ═══\n");
const html = readFileSync(join(DATA, "medipan_page.html"), "utf-8");

// Extract: REF → { lang → downloadId }
const blockRe = /Instructions for Use \[REF (\d+)\]\[(\w+)\]/g;
const refMap  = {};
let m;
while ((m = blockRe.exec(html)) !== null) {
  const ref  = m[1];
  const lang = m[2];
  const pos  = m.index;
  const near = html.substring(pos, pos + 2000);
  const idM  = near.match(/download_id=(\d+)/);
  if (!idM) continue;
  if (!refMap[ref]) refMap[ref] = {};
  refMap[ref][lang] = idM[1];
}

const siteRefs = Object.keys(refMap);
console.log(`✓ ${siteRefs.length} REFs trouvés sur le site`);
console.log(`  Langues disponibles: ${[...new Set(Object.values(refMap).flatMap(Object.keys))].join(", ")}`);

// ── ÉTAPE 2 : Charge les produits Generic Assays ───────────────────────────────

console.log("\n═══ ÉTAPE 2 — Produits Generic Assays ═══\n");
const tsSource = readFileSync(join(ROOT, "src", "data", "products-reactifs.ts"), "utf-8");

// Two-pass extraction (handles any field order)
const pass1Re = /"ref"\s*:\s*"([^"]+)"[\s\S]*?"marque"\s*:\s*"([^"]+)"/g;
const gaProducts = [];
let pm;
while ((pm = pass1Re.exec(tsSource)) !== null) {
  if (pm[2] !== "Generic Assays") continue;
  const block    = tsSource.slice(pm.index, pm.index + 600);
  const descMatch = block.match(/"desc"\s*:\s*"([^"]+)"/);
  if (descMatch) gaProducts.push({ ref: pm[1].trim(), desc: descMatch[1].trim() });
}
console.log(`✓ ${gaProducts.length} produits Generic Assays chargés`);

// Match our products vs site
const toDownload = gaProducts.filter(p => siteRefs.includes(p.ref));
const noMatch    = gaProducts.filter(p => !siteRefs.includes(p.ref));
console.log(`✓ ${toDownload.length} matchés | ${noMatch.length} sans notice Medipan`);
if (noMatch.length) console.log("  Sans notice:", noMatch.map(p => p.ref).join(", "));

// ── ÉTAPE 3 : Téléchargement des PDFs ─────────────────────────────────────────

console.log("\n═══ ÉTAPE 3 — Téléchargement PDFs (POST + password) ═══\n");

const index    = [];
const matches  = [];
const nonMatch = [];
const fallbackEN = [];

for (const product of toDownload) {
  const langs = refMap[product.ref] ?? {};

  // Priority: fra > eng
  let chosenLang = null;
  let chosenId   = null;
  let isFallback = false;

  if (langs.fra) {
    chosenLang = "fra"; chosenId = langs.fra;
  } else if (langs.eng) {
    chosenLang = "eng"; chosenId = langs.eng; isFallback = true;
  } else {
    console.log(`  ⚠ ${product.ref} (${product.desc}) — ni FR ni EN disponible`);
    nonMatch.push({ ref: product.ref, desc: product.desc, reason: "no_fr_en" });
    continue;
  }

  const langCode = chosenLang === "fra" ? "FR" : "EN";

  // Verify the download ID works (quick HEAD-like test via POST)
  process.stdout.write(`  ✓ ${product.ref}_${langCode} (dlId: ${chosenId})… `);
  console.log(`[${langCode}]`);

  const entry = {
    ref:       product.ref,
    desc:      product.desc,
    langue:    langCode,
    fallback:  isFallback,
    dlId:      chosenId,          // used by the API proxy route
    apiPath:   `/api/notice/${product.ref}`,
  };
  index.push(entry);
  matches.push(entry);
  if (isFallback) fallbackEN.push(product.ref);
}

for (const p of noMatch.filter(x => !x.reason)) {
  nonMatch.push({ ref: p.ref, desc: p.desc, reason: "no_site_match" });
}

console.log(`\n✓ ${matches.length} notices téléchargées`);
console.log(`  FR: ${matches.filter(m => !m.fallback).length} | EN fallback: ${fallbackEN.length}`);
console.log(`  Échecs: ${nonMatch.length}`);

// Save reports
writeFileSync(join(DATA, "medipan_index.json"), JSON.stringify(index, null, 2));
const report = {
  generatedAt: new Date().toISOString(),
  stats: { total: gaProducts.length, matched: matches.length, unmatched: nonMatch.length, fallbackEN: fallbackEN.length },
  matches,
  non_matches: nonMatch,
  fallback_en_utilises: fallbackEN,
  fichiers_chiffres_ok: [], // server decrypts before serving
  fichiers_chiffres_echec: [],
};
writeFileSync(join(DATA, "medipan_matching_report.json"), JSON.stringify(report, null, 2));
console.log("✓ Rapports → data/medipan_index.json + data/medipan_matching_report.json");

// ── ÉTAPE 4 : Génération TypeScript ───────────────────────────────────────────

console.log("\n═══ ÉTAPE 4 — Génération TypeScript ═══\n");

let ts = `// AUTO-GENERATED — scripts/scrape-medipan.mjs
// Source: https://www.medipan.de/sdm_categories/ifu/
// ${matches.length} réactifs Generic Assays avec notice IFU (FR prioritaire, EN fallback)
// Téléchargement via API proxy : /api/notice/[ref]

export type MedipanFiche = {
  dlId:     string;  // SDM download ID sur medipan.de
  langue:   "FR" | "EN";
  fallback: boolean; // true = pas de version FR disponible
};

/** Map ref produit → notice IFU Medipan/Generic Assays */
export const FICHES_MEDIPAN: Record<string, MedipanFiche> = {\n`;

for (const entry of matches) {
  ts += `  "${entry.ref}": { dlId: "${entry.dlId}", langue: "${entry.langue}", fallback: ${entry.fallback} },\n`;
}
ts += `};\n`;

const dest = join(ROOT, "src", "data", "fiches-medipan.ts");
writeFileSync(dest, ts);
console.log(`✓ Généré → src/data/fiches-medipan.ts (${matches.length} entrées)`);
