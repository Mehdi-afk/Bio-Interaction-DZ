import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const src     = readFileSync(join(ROOT, "src/data/products-reactifs.ts"), "utf-8");
const hobSrc  = readFileSync(join(ROOT, "src/data/fiches-hob.ts"), "utf-8");
const medSrc  = readFileSync(join(ROOT, "src/data/fiches-medipan.ts"), "utf-8");
const ldbSrc  = readFileSync(join(ROOT, "src/data/fiches-ldbio.ts"), "utf-8");
const techSrc = readFileSync(join(ROOT, "src/data/fiches-techniques.ts"), "utf-8");

const keyRe = /"([^"]+)"\s*:/g;
const hobRefs  = new Set([...hobSrc.matchAll(keyRe)].map(m => m[1]));
const medRefs  = new Set([...medSrc.matchAll(keyRe)].map(m => m[1]));
const ldbRefs  = new Set([...ldbSrc.matchAll(keyRe)].map(m => m[1]));
const techRefs = new Set([...techSrc.matchAll(keyRe)].map(m => m[1]));
const allWithNotice = new Set([...medRefs, ...ldbRefs, ...hobRefs, ...techRefs]);

// Extract all product blocks
const blockRe = /\{([^{}]*"ref"\s*:\s*"[^"]+"[^{}]*)\}/gs;
const products = [];
for (const [, body] of src.matchAll(blockRe)) {
  const ref   = body.match(/"ref"\s*:\s*"([^"]+)"/)?.[1]?.trim();
  const nom   = body.match(/"desc"\s*:\s*"([^"]+)"/)?.[1]?.trim();
  const marque = body.match(/"marque"\s*:\s*"([^"]+)"/)?.[1]?.trim();
  if (ref) products.push({ ref, nom: nom ?? "?", marque: marque ?? "?" });
}

const without = products.filter(p => !allWithNotice.has(p.ref));
console.log(`Total sans notice: ${without.length}\n`);

const groups = {};
for (const p of without) {
  const g = p.marque;
  (groups[g] ??= []).push(p);
}

for (const [marque, items] of Object.entries(groups).sort((a,b) => b[1].length - a[1].length)) {
  console.log(`\n=== ${marque} (${items.length}) ===`);
  for (const p of items) console.log(`  ${p.ref} — ${p.nom}`);
}
