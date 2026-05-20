// AUTO-GENERATED — scripts/scrape-ldbio.mjs
// Source: https://ldbiodiagnostics.com/myldbio_notices/
// 17 réactifs LDBIO avec notice (FR prioritaire, EN fallback)

export type LdbioFiche = {
  url:        string;
  langue:     "FR" | "EN";
  fallback:   boolean; // true = pas de version FR, notice EN utilisée
};

/** Map ref produit → notice LDBIO */
export const FICHES_LDBIO: Record<string, LdbioFiche> = {
  "TOP-WBGM": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/TOXOPLASMA-WB-IgG-IgM-vs20-fr_en.pdf", langue: "FR", fallback: false },
  "TXA-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/TOXOCARA-WB-IgG-vs16-fr_en.pdf", langue: "FR", fallback: false },
  "LES-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/LEISHMANIA-WB-IgG-vs17-fr_en.pdf", langue: "FR", fallback: false },
  "ECH-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/ECHINOCOCCUS-WB-IgG-vs17-fr_en.pdf", langue: "FR", fallback: false },
  "CYS-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/CYSTICERCOSIS-WB-IgG-vs21-fr_en.pdf", langue: "FR", fallback: false },
  "TRI ES-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/TRICHINELLA-ES-WB-IgG-vs17-fr_en.pdf", langue: "FR", fallback: false },
  "SCH II-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/SCHISTO-II-WB-IgG-vs24-fr_en.pdf", langue: "FR", fallback: false },
  "FAS ES-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/FASCIOLA-ES-WB-IgG-vs19-fr_en.pdf", langue: "FR", fallback: false },
  "TOXO II G": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/LDBIO-TOXO-II-IgG-vs14-fr_en.pdf", langue: "FR", fallback: false },
  "T2MM": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/LDBIO-TOXO-II-IgM-vs06-fr_en.pdf", langue: "FR", fallback: false },
  "ASP-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/ASPERGILLUS-WB-IgG-vs15-fr_en.pdf", langue: "FR", fallback: false },
  "CHA-WB G": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/CHAGAS-WB-IgG-vs06-fr_en.pdf", langue: "FR", fallback: false },
  "PEO-WBG": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/1_IMMUNOBLOTS/FRANCAIS/PEO-WB-IgG-vs04-fr_en.pdf", langue: "FR", fallback: false },
  "TOXO Ab ICT": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/2_RAPID-TESTS/FRANCAIS/TOXOPLASMA-ICT-IgG-IgM-vs13-fr-en.pdf", langue: "FR", fallback: false },
  "BILZ Ab ICT": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/2_RAPID-TESTS/FRANCAIS/SCHISTOSOMA-ICT-IgG-IgM-vs11-fr_en.pdf", langue: "FR", fallback: false },
  "ASPG Ab ICT": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/2_RAPID-TESTS/FRANCAIS/ASPERGILLUS-ICT-IgG-IgM-vs09-fr-en.pdf", langue: "FR", fallback: false },
  "MPEO Ab ICT": { url: "https://ldbiodiagnostics.com/wp-content/uploads/simple-file-list/NOTICES/2_RAPID-TESTS/FRANCAIS/PEO-ICT-IgG-IgM-vs03-fr-en.pdf", langue: "FR", fallback: false },
};
