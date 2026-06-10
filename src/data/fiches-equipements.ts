// Brochures constructeurs pour les instruments du catalogue équipements.
// Clé = ref du produit dans products-equip.ts
// Source ERBA : product.erbamannheim.com / hematology.erbamannheim.com / hemostasis.erbamannheim.com
// Source Medipan/GA : www.medipan.de
// Source HOB : distributeurs officiels

export type FicheEquipement = {
  label: string;
  langue: "EN" | "FR";
  url:   string;
};

export const FICHES_EQUIPEMENTS: Record<string, FicheEquipement> = {

  // ── Biochimie Clinique — ERBA ───────────────────────────────────────────────
  "INS00002": {
    label:  "Brochure ERBA XL 200",
    langue: "EN",
    url:    "https://clinicalchemistry.erbamannheim.com/getattachment/Home/XL-200/Erba-XL-200-Brochure-WEB.pdf.aspx?lang=en-US&ext=.pdf",
  },
  "INS00008": {
    label:  "Brochure ERBA XL 640",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1205005860-XL%20640%20Brochure%20-%202020.pdf",
  },
  "INS00009": {
    label:  "Brochure ERBA XL 1000",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1230588509-XL%201000.pdf",
  },
  "INS00014": {
    label:  "Brochure ERBA Chem-7",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1606434903-Chem%207.pdf",
  },
  "INS00079": {
    label:  "Brochure ERBA EC 90",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1649039774-EC%2090_4Pg_%20150323_V3.pdf",
  },

  // ── Hématologie — ERBA ──────────────────────────────────────────────────────
  "INS00077": {
    label:  "Brochure ERBA H360",
    langue: "EN",
    url:    "https://electrolyte-analyser-ec90.erbamannheim.com/getmedia/eb600f73-635f-42c8-9147-b32da5bc3c60/Erba-H360-Brochure-English-WEB_2023.pdf.aspx?ext=.pdf",
  },
  "INS00078": {
    label:  "Brochure ERBA H560",
    langue: "EN",
    url:    "https://hematology.erbamannheim.com/getattachment/Home/Image-Content/Picture/H560_brochure.pdf.aspx?lang=en-US&ext=.pdf",
  },
  "INS00071": {
    label:  "Brochure ERBA ELite 580",
    langue: "EN",
    url:    "https://hematology.erbamannheim.com/getattachment/Home/Image-Content/Elite580/Erba-ELite-580-Brochure-WEB_2023.pdf.aspx?lang=en-US&ext=.pdf",
  },
  "INS00087": {
    label:  "Brochure ERBA H7100",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1131513505-H7100%20Product%20Launch%204%20page%20Brochure_26th%20Dec%2024.pdf",
  },

  // ── Hémostase — ERBA ────────────────────────────────────────────────────────
  "INS00060": {
    label:  "Brochure ERBA ECL 412",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1404363911-Erba%20ECL%20412%2029-11-16.pdf",
  },
  "INS00070": {
    label:  "Brochure ERBA ECL 760",
    langue: "EN",
    url:    "https://hemostasis.erbamannheim.com/getattachment/Home/ECL-760/Erba_ECL-760-Brochure-WEB_2023.pdf.aspx?lang=en-US&ext=.pdf",
  },

  // ── Analyse des Urines — ERBA ────────────────────────────────────────────────
  "INS00064": {
    label:  "Brochure LAURA Smart",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1731499791-Laura%20Smart_latest%20brochure%202020.pdf",
  },
  "INS00065": {
    label:  "Brochure LAURA XL",
    langue: "EN",
    url:    "https://product.erbamannheim.com/upload/docs/1601219041-LAURA%20XL%20Brochure%20_%204%20Pg_%20V01.pdf",
  },

  // ── Auto-Immunité — Generic Assays / Medipan ─────────────────────────────────
  "5075": {
    label:  "Brochure DOT DIVER 2.0",
    langue: "EN",
    url:    "https://www.medipan.de/wp-content/uploads/2024/09/Flyer-REF-5075DotDiver2.0eng.pdf",
  },
  "4450": {
    label:  "Brochure AKIRON NEO",
    langue: "EN",
    url:    "https://www.medipan.de/wp-content/uploads/2025/07/Flyer-REF-4450akiron%C2%AE-NEOeng-6.pdf",
  },

  // ── Auto-Immunité — HOB Biotech ───────────────────────────────────────────────
  // MA01073 (BioCLIA 1900) : aucun PDF public disponible chez le constructeur.
  "MA00502": {
    label:  "Brochure BioCLIA 500",
    langue: "EN",
    url:    "https://www.unimedica-iq.com/wp-content/uploads/2025/01/BioClia-500-1.pdf",
  },

  // ── Immunologie — ERBA (brochure commune LisaScan + LisaWash) ─────────────────
  "52000121": {
    label:  "Brochure ERBA LisaScan & LisaWash",
    langue: "EN",
    url:    "https://immunology.erbamannheim.com/getmedia/2719f66e-7dae-4c3d-bb2b-3637cfb600df/Erba_LisaScan-LisaWash_Print_2023.pdf.aspx?ext=.pdf",
  },
  "52000131": {
    label:  "Brochure ERBA LisaScan & LisaWash",
    langue: "EN",
    url:    "https://immunology.erbamannheim.com/getmedia/2719f66e-7dae-4c3d-bb2b-3637cfb600df/Erba_LisaScan-LisaWash_Print_2023.pdf.aspx?ext=.pdf",
  },
};
