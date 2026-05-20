/**
 * ÉTAPE 1 — Scraping + parsing des fiches techniques ERBA Lachema (XSYS)
 * Génère : data/fiches_techniques_index.json
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");

// ── Fetch the ERBA page ───────────────────────────────────────────────────────

const URL_SOURCE = "https://www.erbalachema.com/en/product-support/instructions/instructions-diagnostic-kits/xsys/";
console.log("Fetching:", URL_SOURCE);
const resp = await fetch(URL_SOURCE, {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
  },
});
if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
const html = await resp.text();
console.log(`✓ Page reçue (${Math.round(html.length / 1024)} kB)`);

// Extract all rows: href + filename
const rowRe = /class="row"[^>]*>.*?href="([^"]+stahnout[^"]+)"[^>]*>.*?class="red">([^<]+)<\/span>/gs;

const fiches = [];
let m;
while ((m = rowRe.exec(html)) !== null) {
  const url      = m[1].trim();
  const filename = m[2].trim(); // e.g. "XSYS0001 ALB 440_AP_A.pdf"

  // Extract reference(s) from filename
  // Pattern: XSYSxxxx or XSYSxxxx_XSYSyyyy (multi-ref)
  const refs = [...filename.matchAll(/XSYS\d{4,}/g)].map((x) => x[0]);

  // Determine document type from suffix
  // _IFU_ = Instructions For Use (main notice)
  // _AP_  = Application Protocol
  // _K    = calibrator
  // _C    = control
  // _M    = misc
  let docType = "autre";
  if (/_IFU_/i.test(filename)) docType = "IFU";
  else if (/_AP_/i.test(filename)) docType = "AP";
  else if (/_K[._]/i.test(filename)) docType = "calibrateur";
  else if (/_[CM][._]/i.test(filename)) docType = "controle";

  // Determine language from suffix (last letter before .pdf)
  // _A = all / English, _F = French, _E = English, _D = German...
  const langMatch = filename.match(/_([A-Z])\.pdf$/i);
  const langue = langMatch ? langMatch[1].toUpperCase() : "EN";

  // Extract short name (between first ref and docType suffix)
  // e.g. "XSYS0001 ALB 440_AP_A.pdf" → "ALB 440"
  const namePart = filename
    .replace(/XSYS\d{4,}\s*/g, "")
    .replace(/_?(IFU|AP|[KCM])_?[A-Z]?\.pdf$/i, "")
    .replace(/^[_ ]+|[_ ]+$/g, "")
    .trim();

  const entry = {
    nom:           namePart,
    references:    refs,
    type:          docType,
    langue,
    url_source:    url.startsWith("http") ? url : `https://www.erbalachema.com${url}`,
    fichier_nom:   filename,
  };

  fiches.push(entry);
}

console.log(`✓ ${fiches.length} fiches parsées`);

// Save index
const indexPath = join(ROOT, "data", "fiches_techniques_index.json");
writeFileSync(indexPath, JSON.stringify(fiches, null, 2), "utf-8");
console.log(`✓ Index sauvegardé → ${indexPath}`);

// Summary by type
const byType = fiches.reduce((acc, f) => {
  acc[f.type] = (acc[f.type] ?? 0) + 1; return acc;
}, {});
console.log("  Types:", byType);
