/**
 * Replace generic images with better product-specific images.
 * Must run AFTER download-better-images.mjs.
 * Run: node scripts/update-product-images.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");
const BASE  = "/images/reactifs/";

const filePath = join(ROOT, "src", "data", "products-reactifs.ts");
let src = readFileSync(filePath, "utf-8");

// Build a lookup: ref → { marque }
const refMarque = {};
const refRe = /"ref"\s*:\s*"([^"]+)"[\s\S]*?"marque"\s*:\s*"([^"]+)"/g;
let m;
while ((m = refRe.exec(src)) !== null) {
  refMarque[m[1].trim()] = m[2].trim();
}

function betterImage(ref, marque, currentImage) {
  // ERBA XSYS: real Erba XL System Packs box photo
  if (currentImage === BASE + "erba-xsys-kit.jpg") {
    return BASE + "erba-xl-syspack.jpg";
  }

  // Generic Assays IFA (refs starting with 8 digits) → CytoBead slide strips
  if (marque === "Generic Assays" && /^8/.test(ref) && currentImage === BASE + "ga-ifa-kit.jpg") {
    return BASE + "ga-cytobead-ifa.png";
  }

  // Generic Assays ELISA (Medizym, non-IFA refs) → microplate stock photo
  if (marque === "Generic Assays" && !/^8/.test(ref) && currentImage === BASE + "ga-ifa-kit.jpg") {
    return BASE + "ga-medizym-elisa.jpg";
  }

  // HOB Biotech BioCLIA → CLIA kit with reagent bottles
  if (marque === "HOB Biotech" && currentImage === BASE + "ga-ifa-kit.jpg") {
    return BASE + "hob-bioclia-kit.jpg";
  }

  return null; // no change
}

let updated = 0;

// Replace image fields in-place using regex
const result = src.replace(
  /"ref"\s*:\s*"([^"]+)"([\s\S]*?)"image"\s*:\s*"([^"]+)"/g,
  (match, ref, between, currentImage) => {
    const marque = refMarque[ref.trim()] || "";
    const newImg = betterImage(ref.trim(), marque, currentImage);
    if (!newImg || newImg === currentImage) return match;
    updated++;
    return match.replace(`"image":  "${currentImage}"`, `"image":  "${newImg}"`)
                .replace(`"image": "${currentImage}"`,  `"image":  "${newImg}"`);
  }
);

writeFileSync(filePath, result);
console.log(`Done: ${updated} image fields updated`);
