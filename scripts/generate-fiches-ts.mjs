/**
 * ÉTAPE 3 — Génère src/data/fiches-techniques.ts
 * à partir de data/matching_report.json
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");

const report = JSON.parse(
  readFileSync(join(ROOT, "data", "matching_report.json"), "utf-8")
);

const TYPE_LABEL = { IFU: "Notice IFU", AP: "Protocole AP", autre: "Document" };

let out = `// AUTO-GENERATED — scripts/generate-fiches-ts.mjs
// Source: https://www.erbalachema.com/en/product-support/instructions/instructions-diagnostic-kits/xsys/
// ${report.stats.matched} réactifs avec fiche technique (sur ${report.stats.totalProducts} produits ERBA XSYS)

export type FicheTechnique = {
  type:   "IFU" | "AP" | "autre";
  label:  string;
  langue: string;
  url:    string;
};

/** Map ref → fiches techniques disponibles (IFU en premier) */
export const FICHES_TECHNIQUES: Record<string, FicheTechnique[]> = {\n`;

for (const { ref, fiches } of report.matched) {
  const items = fiches.map((f) => {
    const label = TYPE_LABEL[f.type] ?? "Document";
    return `    { type: "${f.type}", label: "${label}", langue: "${f.langue}", url: "${f.url}" }`;
  }).join(",\n");
  out += `  "${ref}": [\n${items},\n  ],\n`;
}

out += `};\n`;

const dest = join(ROOT, "src", "data", "fiches-techniques.ts");
writeFileSync(dest, out, "utf-8");
console.log(`✓ Généré → ${dest}`);
console.log(`  ${report.matched.length} références avec fiches`);
