// AUTO-GENERATED — scripts/generate-fiches-ts.mjs
// Source: https://www.erbalachema.com/en/product-support/instructions/instructions-diagnostic-kits/xsys/
// 10 réactifs avec fiche technique (sur 240 produits ERBA XSYS)

export type FicheTechnique = {
  type:   "IFU" | "AP" | "autre";
  label:  string;
  langue: string;
  url:    string;
};

/** Map ref → fiches techniques disponibles (IFU en premier) */
export const FICHES_TECHNIQUES: Record<string, FicheTechnique[]> = {
  "XSYS0001": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4205/" },
  ],
  "XSYS0003": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4206/" },
  ],
  "XSYS0028": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4224/" },
  ],
  "XSYS0007": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4207/" },
  ],
  "XSYS0085": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/5051/" },
  ],
  "XSYS0029": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4225/" },
  ],
  "XSYS0012": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4212/" },
  ],
  "XSYS0043": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4229/" },
  ],
  "XSYS0044": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4232/" },
  ],
  "XSYS0027": [
    { type: "IFU", label: "Notice IFU", langue: "A", url: "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/4223/" },
  ],
};
