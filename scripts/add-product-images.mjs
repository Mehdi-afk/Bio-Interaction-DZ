/**
 * Add image fields to all products in products-reactifs.ts
 * Run: node scripts/add-product-images.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");
const BASE  = "/images/reactifs/";

const REF_IMAGE = {
  "TOP-WBGM":     BASE + "ldbio-toxoplasma-wb.jpg",
  "TXA-WBG":      BASE + "ldbio-toxocara-wb.png",
  "LES-WBG":      BASE + "ldbio-leishmania-wb.png",
  "ECH-WBG":      BASE + "ldbio-echinococcus-wb.png",
  "CYS-WBG":      BASE + "ldbio-cysticercosis-wb.png",
  "TRI ES-WBG":   BASE + "ldbio-trichinella-wb.png",
  "SCH II-WBG":   BASE + "ldbio-schisto-wb.png",
  "FAS ES-WBG":   BASE + "ldbio-fasciola-wb.png",
  "TOXO II G":    BASE + "ldbio-toxo-ii-igg.png",
  "T2MM":         BASE + "ldbio-toxo-ii-igm.png",
  "ASP-WBG":      BASE + "ldbio-aspergillus-wb.jpg",
  "CHA-WB G":     BASE + "ldbio-chagas-wb.png",
  "PEO-WBG":      BASE + "ldbio-peo-wb.png",
  "TOXO Ab ICT":  BASE + "ldbio-toxo-ict.jpg",
  "BILZ Ab ICT":  BASE + "ldbio-schisto-ict.jpg",
  "ASPG Ab ICT":  BASE + "ldbio-asp-ict.jpg",
  "MPEO Ab ICT":  BASE + "ldbio-peo-ict.png",
};

function getImage(ref, marque) {
  if (REF_IMAGE[ref]) return REF_IMAGE[ref];
  if (marque === "ERBA") {
    if (ref.startsWith("XSYS")) return BASE + "erba-xsys-kit.jpg";
    if (ref.startsWith("BLT"))  return BASE + "erba-blt-kit.jpg";
    if (ref.startsWith("HEM"))  return BASE + "erba-hem-reagent.jpg";
    if (ref.startsWith("EHL"))  return BASE + "erba-ehl-reagent.jpg";
    return BASE + "erba-imu-kit.jpg";
  }
  if (marque === "HOB Biotech") {
    if (ref.startsWith("BL-") || ref.startsWith("BIOLINE")) return BASE + "ldbio-aspergillus-wb.jpg";
    return BASE + "ga-ifa-kit.jpg";
  }
  if (marque === "Generic Assays") {
    if (/^8/.test(ref)) return BASE + "ga-ifa-kit.jpg";
    if (ref === "4289") return BASE + "ldbio-aspergillus-wb.jpg";
    return BASE + "ga-ifa-kit.jpg";
  }
  if (marque.includes("LDBIO")) return BASE + "ldbio-aspergillus-wb.jpg";
  return null;
}

const filePath = join(ROOT, "src", "data", "products-reactifs.ts");
let src = readFileSync(filePath, "utf-8");

// Build ref → image map
const refRe = /"ref"\s*:\s*"([^"]+)"[\s\S]*?"marque"\s*:\s*"([^"]+)"/g;
const imageMap = {};
let pm;
while ((pm = refRe.exec(src)) !== null) {
  const img = getImage(pm[1].trim(), pm[2].trim());
  if (img) imageMap[pm[1].trim()] = img;
}
console.log(`Image map: ${Object.keys(imageMap).length} entries`);

let updated = 0;
const lines = src.split("\n");
const out = [];

// ── Pass 1: handle multiline products (opening { on its own line) ─────────
let insideProduct = false;
let productBuf = [];
let depth = 0;

function flushProduct() {
  if (productBuf.length === 0) return;
  const joined = productBuf.join("\n");
  const isProduct = /"kind"\s*:\s*"product"/.test(joined);
  if (!isProduct) { out.push(...productBuf); productBuf = []; return; }

  const ref = joined.match(/"ref"\s*:\s*"([^"]+)"/)?.[1]?.trim();
  const img = ref ? imageMap[ref] : null;

  if (!img || joined.includes('"image"')) {
    out.push(...productBuf); productBuf = []; return;
  }

  // Find closing brace line
  const closingIdx = productBuf.length - 1;
  let lastContentIdx = closingIdx - 1;
  while (lastContentIdx >= 0 && productBuf[lastContentIdx].trim() === "") lastContentIdx--;
  if (lastContentIdx < 0) { out.push(...productBuf); productBuf = []; return; }

  // Add comma to last field if missing
  if (!/,\s*$/.test(productBuf[lastContentIdx].trimEnd())) {
    productBuf[lastContentIdx] = productBuf[lastContentIdx].replace(/(\S)\s*$/, "$1,");
  }

  const closingIndent = (productBuf[closingIdx].match(/^(\s*)/) || ["",""])[1];
  productBuf.splice(closingIdx, 0, `${closingIndent}    "image":  "${img}"`);
  updated++;
  out.push(...productBuf);
  productBuf = [];
}

for (const line of lines) {
  const trimmed = line.trim();
  if (!insideProduct) {
    if (trimmed === "{") {
      insideProduct = true; depth = 1; productBuf = [line];
    } else {
      out.push(line);
    }
  } else {
    productBuf.push(line);
    for (const ch of trimmed) {
      if (ch === "{") depth++;
      if (ch === "}") depth--;
    }
    if (depth <= 0) { flushProduct(); insideProduct = false; }
  }
}
if (productBuf.length > 0) flushProduct();

// ── Pass 2: handle single-line products  { "ref": "...", ... }, ──────────
const result = out.join("\n").replace(
  /(\{[^{}\n]*"kind"\s*:\s*"product"[^{}\n]*?)(\s*\},?)/g,
  (match, content, closing) => {
    if (content.includes('"image"')) return match;
    const ref = content.match(/"ref"\s*:\s*"([^"]+)"/)?.[1]?.trim();
    const img = ref ? imageMap[ref] : null;
    if (!img) return match;
    // Add comma to last field if needed
    const fixedContent = content.replace(/("[^"]*")\s*$/, '$1,');
    updated++;
    return `${fixedContent} "image":  "${img}"${closing}`;
  }
);

writeFileSync(filePath, result);
console.log(`Done: ${updated} products updated`);
