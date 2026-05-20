/**
 * ÉTAPE 2 — Matching fiches techniques ↔ produits existants
 * Génère : data/matching_report.json
 *          data/fiches_by_ref.json  (lookup ref → fiches, prêt pour l'app)
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");

// ── Load scraped index ────────────────────────────────────────────────────────

const fiches = JSON.parse(
  readFileSync(join(ROOT, "data", "fiches_techniques_index.json"), "utf-8")
);

// ── Load existing products ────────────────────────────────────────────────────
// Parse products-reactifs.ts by extracting ref values (fast, no TS compilation needed)

const tsSource = readFileSync(
  join(ROOT, "src", "data", "products-reactifs.ts"), "utf-8"
);

// Extract all product blocks: ref, desc, marque, type
const productRe = /"ref"\s*:\s*"([^"]+)"[\s\S]*?"kind"\s*:\s*"product"[\s\S]*?"desc"\s*:\s*"([^"]+)"[\s\S]*?"marque"\s*:\s*"([^"]+)"/g;

const products = [];
let pm;
while ((pm = productRe.exec(tsSource)) !== null) {
  products.push({
    ref:    pm[1].trim(),
    desc:   pm[2].trim(),
    marque: pm[3].trim(),
  });
}
console.log(`✓ ${products.length} produits chargés depuis products-reactifs.ts`);

// ── Build lookup: ref → list of fiches ───────────────────────────────────────

// Build a flat ref→fiches map from the scraped data
const fichesByRef = {};

for (const fiche of fiches) {
  // Skip calibrateurs and controles for the main download button
  // (keep only IFU and AP — actual product instructions)
  if (!["IFU", "AP", "autre"].includes(fiche.type)) continue;

  for (const ref of fiche.references) {
    if (!fichesByRef[ref]) fichesByRef[ref] = [];
    fichesByRef[ref].push({
      type:       fiche.type,
      langue:     fiche.langue,
      url:        fiche.url_source,
      nom:        fiche.nom,
      fichier:    fiche.fichier_nom,
    });
  }
}

// Sort each ref: IFU first, then AP, then other
const typeOrder = { IFU: 0, AP: 1, autre: 2 };
for (const ref of Object.keys(fichesByRef)) {
  fichesByRef[ref].sort((a, b) =>
    (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9)
  );
}

// ── Match products ────────────────────────────────────────────────────────────

const matched   = [];
const unmatched = [];

for (const product of products) {
  const fiches = fichesByRef[product.ref];
  if (fiches && fiches.length > 0) {
    matched.push({
      ref:    product.ref,
      desc:   product.desc,
      marque: product.marque,
      fiches,
    });
  } else {
    unmatched.push({
      ref:    product.ref,
      desc:   product.desc,
      marque: product.marque,
    });
  }
}

console.log(`✓ ${matched.length} produits matchés`);
console.log(`  ${unmatched.length} sans fiche`);

// ── Save outputs ──────────────────────────────────────────────────────────────

const report = {
  generatedAt: new Date().toISOString(),
  stats: {
    totalProducts:   products.length,
    matched:         matched.length,
    unmatched:       unmatched.length,
    totalFiches:     fiches.length,
    refsAvailable:   Object.keys(fichesByRef).length,
  },
  matched,
  unmatched,
};

writeFileSync(
  join(ROOT, "data", "matching_report.json"),
  JSON.stringify(report, null, 2),
  "utf-8"
);
console.log(`✓ Rapport → data/matching_report.json`);

// Save the clean ref→fiches lookup (used by the app)
writeFileSync(
  join(ROOT, "data", "fiches_by_ref.json"),
  JSON.stringify(fichesByRef, null, 2),
  "utf-8"
);
console.log(`✓ Lookup → data/fiches_by_ref.json`);

// Show sample
console.log("\n── Exemple de matchs ──");
matched.slice(0, 5).forEach((m) => {
  console.log(`  ${m.ref} → ${m.fiches.length} fiche(s) [${m.fiches.map(f => f.type).join(", ")}]`);
});

if (unmatched.length > 0) {
  console.log(`\n── Premiers non-matchés ──`);
  unmatched.slice(0, 10).forEach((u) => console.log(`  ${u.ref} (${u.desc})`));
}
