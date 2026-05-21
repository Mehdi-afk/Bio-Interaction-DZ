/**
 * Download better product-specific images to replace generic ones
 * Run: node scripts/download-better-images.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");
const DEST  = join(ROOT, "public", "images", "reactifs");
mkdirSync(DEST, { recursive: true });

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const IMAGES = [
  // ERBA: real photo of XL System Packs boxes + reagent bottles (MSF Unicat catalog)
  {
    file: "erba-xl-syspack.jpg",
    url:  "https://unicat.msf.org/web/image/product.image/631589/image_1024/%28Erba%20XL200%29%20REAGENT%20ALBUMIN%2C%2010x44ml%20XSYS0001",
  },
  // Generic Assays IFA: real CytoBead slide strips (purple/orange/silver) from Medipan
  {
    file: "ga-cytobead-ifa.png",
    url:  "https://www.medipan.de/wp-content/uploads/2021/01/ifa.png",
  },
  // Generic Assays ELISA: microplate with scientist (Medipan official site image)
  {
    file: "ga-medizym-elisa.jpg",
    url:  "https://www.medipan.de/wp-content/uploads/2023/10/MTP-Labrorant_AdobeStock_299915758-1-scaled.jpeg",
  },
  // HOB Biotech BioCLIA: CLIA kit with colorful reagent bottles + bead tray
  {
    file: "hob-bioclia-kit.jpg",
    url:  "https://i0.wp.com/www.igbiotechnology.com/wp-content/uploads/2017/12/AFP.jpg",
  },
];

let ok = 0, fail = 0;

for (const { file, url } of IMAGES) {
  const dest = join(DEST, file);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  ✓ ${file} (${Math.round(buf.length/1024)}KB)`);
    ok++;
    await sleep(400);
  } catch (e) {
    console.log(`  ✗ ${file} — ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} OK, ${fail} failed`);
