/**
 * Download product images for each reagent sub-category
 * Run: node scripts/download-images.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");
const DEST  = join(ROOT, "public", "images", "reactifs");
mkdirSync(DEST, { recursive: true });

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const IMAGES = [
  // ── LDBIO — Immunoblots WB (per product) ────────────────────────────────
  { file: "ldbio-toxoplasma-wb.jpg",   url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/06/LDBIO_produits_EN__0010_TOXOPLASMA-Western-blot-IgG-IgM-1.jpg" },
  { file: "ldbio-toxocara-wb.png",     url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/WB_TXA_fr.png" },
  { file: "ldbio-leishmania-wb.png",   url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/WB_LESH_fr.png" },
  { file: "ldbio-echinococcus-wb.png", url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/ECH_fr.png" },
  { file: "ldbio-cysticercosis-wb.png",url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/CYS_fr.png" },
  { file: "ldbio-trichinella-wb.png",  url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/WB_TRI_en.png" },
  { file: "ldbio-schisto-wb.png",      url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/WB_SCH_en.png" },
  { file: "ldbio-fasciola-wb.png",     url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/FAS_en.png" },
  { file: "ldbio-toxo-ii-igg.png",     url: "https://ldbiodiagnostics.com/wp-content/uploads/2024/07/Images-SI-TII-EN.png" },
  { file: "ldbio-toxo-ii-igm.png",     url: "https://ldbiodiagnostics.com/wp-content/uploads/2022/07/TII-IgM-EN.png" },
  { file: "ldbio-aspergillus-wb.jpg",  url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/02/LDBIO_produits_EN__0001_ASPERGILLUS-Western-blot-IgG.jpg" },
  { file: "ldbio-chagas-wb.png",       url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/09/CHA-en.png" },
  { file: "ldbio-peo-wb.png",          url: "https://ldbiodiagnostics.com/wp-content/uploads/2022/07/WB-PEO-EN.png" },
  // ── LDBIO — Rapid tests ICT (per product) ────────────────────────────────
  { file: "ldbio-toxo-ict.jpg",        url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/04/ICT_TOXO-1-scaled.jpg" },
  { file: "ldbio-schisto-ict.jpg",     url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/04/ICT_SCH-1-scaled.jpg" },
  { file: "ldbio-asp-ict.jpg",         url: "https://ldbiodiagnostics.com/wp-content/uploads/2020/04/ICT_ASP-scaled.jpg" },
  { file: "ldbio-peo-ict.png",         url: "https://ldbiodiagnostics.com/wp-content/uploads/2022/07/Test-rapide-PEO.png" },
  // ── ERBA — generic images per kit family ─────────────────────────────────
  { file: "erba-xsys-kit.jpg",         url: "https://www.erbalachema.com/images/produkty/35-130319075456.jpg" },
  { file: "erba-blt-kit.jpg",          url: "https://www.erbalachema.com/images/produkty/bltsmall-110131102011.jpg" },
  { file: "erba-imu-kit.jpg",          url: "https://www.erbalachema.com/images/produkty/iltsmall-110112110838.jpg" },
];

let ok = 0, fail = 0;

for (const { file, url } of IMAGES) {
  const dest = join(DEST, file);
  if (existsSync(dest)) {
    console.log(`  skip (exists) ${file}`);
    ok++;
    continue;
  }
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  ✓ ${file} (${Math.round(buf.length/1024)}KB)`);
    ok++;
    await sleep(300);
  } catch (e) {
    console.log(`  ✗ ${file} — ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} OK, ${fail} failed`);
