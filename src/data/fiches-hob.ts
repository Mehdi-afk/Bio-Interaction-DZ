// IFU BioCLIA — HOB Biotech (fichiers locaux dans public/notices/bioclia/)
// Autoimmune : DOCX FR (2022-09) | Allergie : PDF FR

const B = "/notices/bioclia/";

export type HobFiche = {
  path:   string;        // URL relative au domaine
  langue: "FR";
  type:   "pdf" | "docx";
};

/** Map ref produit → notice IFU HOB Biotech / BioCLIA */
export const FICHES_HOB: Record<string, HobFiche> = {

  // ── Allergie ─────────────────────────────────────────────────────────────
  "MY01190": { path: B + "bioclia-allergy-G3.pdf",          langue: "FR", type: "pdf" },
  "MY01191": { path: B + "bioclia-allergy-G8.pdf",          langue: "FR", type: "pdf" },
  "MY01192": { path: B + "bioclia-allergy-G12.pdf",         langue: "FR", type: "pdf" },
  "MY01194": { path: B + "bioclia-allergy-T4.pdf",          langue: "FR", type: "pdf" },
  "MY01196": { path: B + "bioclia-allergy-F203.pdf",        langue: "FR", type: "pdf" },
  "MY01197": { path: B + "bioclia-allergy-T11.pdf",         langue: "FR", type: "pdf" },
  "MY01200": { path: B + "bioclia-allergy-K82.pdf",         langue: "FR", type: "pdf" },
  "MY01201": { path: B + "bioclia-allergy-T9.pdf",          langue: "FR", type: "pdf" },
  "MY01202": { path: B + "bioclia-allergy-F44.pdf",         langue: "FR", type: "pdf" },
  "MY01206": { path: B + "bioclia-allergy-F85.pdf",         langue: "FR", type: "pdf" },
  "MY01207": { path: B + "bioclia-allergy-F89.pdf",         langue: "FR", type: "pdf" },
  "MY01208": { path: B + "bioclia-allergy-F92.pdf",         langue: "FR", type: "pdf" },
  "MY01209": { path: B + "bioclia-allergy-T7.pdf",          langue: "FR", type: "pdf" },
  "MY01217": { path: B + "bioclia-allergy-T215.pdf",        langue: "FR", type: "pdf" },
  "MY01218": { path: B + "bioclia-allergy-G213.pdf",        langue: "FR", type: "pdf" },
  "MY01223": { path: B + "bioclia-allergy-Fx26.pdf",        langue: "FR", type: "pdf" },
  "MY01688": { path: B + "bioclia-allergy-BioCLIATOP.pdf",  langue: "FR", type: "pdf" },
  "MY01689": { path: B + "bioclia-allergy-Fx27.pdf",        langue: "FR", type: "pdf" },
  "MY01690": { path: B + "bioclia-allergy-Fx24.pdf",        langue: "FR", type: "pdf" },
  "MY01691": { path: B + "bioclia-allergy-F17.pdf",         langue: "FR", type: "pdf" },
  "MY01692": { path: B + "bioclia-allergy-Mx1.pdf",         langue: "FR", type: "pdf" },
  "MY01693": { path: B + "bioclia-allergy-Gx1.pdf",         langue: "FR", type: "pdf" },
  "MY01694": { path: B + "bioclia-allergy-D201.pdf",        langue: "FR", type: "pdf" },
  "MY01695": { path: B + "bioclia-allergy-F256.pdf",        langue: "FR", type: "pdf" },
  "MY01696": { path: B + "bioclia-allergy-F31.pdf",         langue: "FR", type: "pdf" },
  "MY01697": { path: B + "bioclia-allergy-I1.pdf",          langue: "FR", type: "pdf" },
  "MY01698": { path: B + "bioclia-allergy-I3.pdf",          langue: "FR", type: "pdf" },
  "MY01699": { path: B + "bioclia-allergy-M2.pdf",          langue: "FR", type: "pdf" },
  "MY01700": { path: B + "bioclia-allergy-F75.pdf",         langue: "FR", type: "pdf" },
  "MY01701": { path: B + "bioclia-allergy-F422.pdf",        langue: "FR", type: "pdf" },
  "MY01702": { path: B + "bioclia-allergy-F424.pdf",        langue: "FR", type: "pdf" },

  // ── Autoimmune — Connective tissue disease ────────────────────────────────
  "CLIA-dsDNA":     { path: B + "bioclia-dsDNA.docx",       langue: "FR", type: "docx" },
  "CLIA-Ro60":      { path: B + "bioclia-Ro60.docx",        langue: "FR", type: "docx" },
  "CLIA-SSBLa":     { path: B + "bioclia-SSB-La.docx",      langue: "FR", type: "docx" },
  "CLIA-nRNPSm":    { path: B + "bioclia-nRNP-Sm.docx",     langue: "FR", type: "docx" },
  "CLIA-Sm":        { path: B + "bioclia-Sm.docx",          langue: "FR", type: "docx" },
  "CLIA-Jo1":       { path: B + "bioclia-Jo-1.docx",        langue: "FR", type: "docx" },
  "CLIA-Scl70":     { path: B + "bioclia-Scl-70.docx",      langue: "FR", type: "docx" },
  "CLIA-Ro52":      { path: B + "bioclia-Ro52.docx",        langue: "FR", type: "docx" },
  "CLIA-RibP":      { path: B + "bioclia-Ribosomal-P.docx", langue: "FR", type: "docx" },
  "CLIA-PCNA":      { path: B + "bioclia-PCNA.docx",        langue: "FR", type: "docx" },
  "CLIA-PMScl":     { path: B + "bioclia-PM-Scl.docx",      langue: "FR", type: "docx" },
  "CLIA-His":       { path: B + "bioclia-Histone.docx",     langue: "FR", type: "docx" },
  "CLIA-CENPB":     { path: B + "bioclia-CENP-B.docx",      langue: "FR", type: "docx" },
  "CLIA-Nuc":       { path: B + "bioclia-Nucleosome.docx",  langue: "FR", type: "docx" },
  "CLIA-ENAMix1":   { path: B + "bioclia-ENA-Screen.docx",  langue: "FR", type: "docx" },
  "CLIA-CTD":       { path: B + "bioclia-CTD-Screen.docx",  langue: "FR", type: "docx" },

  // ── Autoimmune — Autoimmune liver disease ─────────────────────────────────
  "CLIA-AMAM2":     { path: B + "bioclia-AMA-M2.docx",      langue: "FR", type: "docx" },
  "CLIA-gp210":     { path: B + "bioclia-gp210.docx",       langue: "FR", type: "docx" },
  "CLIA-LC1":       { path: B + "bioclia-LC-1.docx",        langue: "FR", type: "docx" },
  "CLIA-LKM1":      { path: B + "bioclia-LKM-1.docx",       langue: "FR", type: "docx" },
  "CLIA-SLALP":     { path: B + "bioclia-SLA-LP.docx",      langue: "FR", type: "docx" },
  "CLIA-sp100":     { path: B + "bioclia-sp100.docx",       langue: "FR", type: "docx" },

  // ── Autoimmune — Rhumatisme articulaire (RA) ──────────────────────────────
  "CLIA-CCP":       { path: B + "bioclia-CCP.docx",         langue: "FR", type: "docx" },
  "CLIA-RFA":       { path: B + "bioclia-RF-IgA.docx",      langue: "FR", type: "docx" },
  "CLIA-RFG":       { path: B + "bioclia-RF-IgG.docx",      langue: "FR", type: "docx" },
  "CLIA-RFM":       { path: B + "bioclia-RF-IgM.docx",      langue: "FR", type: "docx" },
  "CLIA-RFAMG":     { path: B + "bioclia-RF-Screen.docx",   langue: "FR", type: "docx" },

  // ── Autoimmune — Syndrome des antiphospholipides ──────────────────────────
  "CLIA-aCLA":      { path: B + "bioclia-Cardiolipin-IgA.docx",  langue: "FR", type: "docx" },
  "CLIA-aCLG":      { path: B + "bioclia-Cardiolipin-IgG.docx",  langue: "FR", type: "docx" },
  "CLIA-aCLM":      { path: B + "bioclia-Cardiolipin-IgM.docx",  langue: "FR", type: "docx" },
  "CLIA-aCLAMG":    { path: B + "bioclia-Cardiolipin-Screen.docx", langue: "FR", type: "docx" },
  "CLIA-b2GP1A":    { path: B + "bioclia-b2GP1-IgA.docx",    langue: "FR", type: "docx" },
  "CLIA-b2GP1G":    { path: B + "bioclia-b2GP1-IgG.docx",    langue: "FR", type: "docx" },
  "CLIA-b2GP1M":    { path: B + "bioclia-b2GP1-IgM.docx",    langue: "FR", type: "docx" },
  "CLIA-b2GP1AMG":  { path: B + "bioclia-b2GP1-Screen.docx", langue: "FR", type: "docx" },

  // ── Autoimmune — Maladie cœliaque ─────────────────────────────────────────
  "CLIA-DGPA":      { path: B + "bioclia-DGP-IgA.docx",     langue: "FR", type: "docx" },
  "CLIA-DGPG":      { path: B + "bioclia-DGP-IgG.docx",     langue: "FR", type: "docx" },
  "CLIA-htTGA":     { path: B + "bioclia-tTG-IgA.docx",     langue: "FR", type: "docx" },
  "CLIA-htTGG":     { path: B + "bioclia-tTG-IgG.docx",     langue: "FR", type: "docx" },

  // ── Autoimmune — Vascularite ──────────────────────────────────────────────
  "CLIA-GBM":       { path: B + "bioclia-GBM.docx",         langue: "FR", type: "docx" },
  "CLIA-MPO":       { path: B + "bioclia-MPO.docx",         langue: "FR", type: "docx" },
  "CLIA-PR3":       { path: B + "bioclia-PR3.docx",         langue: "FR", type: "docx" },

  // ── Autoimmune — Diabète ──────────────────────────────────────────────────
  "CLIA-GAD":       { path: B + "bioclia-GAD.docx",         langue: "FR", type: "docx" },
  "CLIA-IA2":       { path: B + "bioclia-IA2.docx",         langue: "FR", type: "docx" },
  "CLIA-IAA":       { path: B + "bioclia-IAA.docx",         langue: "FR", type: "docx" },
  "CLIA-ICA":       { path: B + "bioclia-ICA.docx",         langue: "FR", type: "docx" },

  // ── Autoimmune — Autres ───────────────────────────────────────────────────
  "CLIA-IF":        { path: B + "bioclia-IF.docx",          langue: "FR", type: "docx" },
  "CLIA-PCA":       { path: B + "bioclia-PCA.docx",         langue: "FR", type: "docx" },

  // ── MY00xxx (anciens refs, même antigen que CLIA-xxx) ─────────────────────
  "MY00148 / MY00097C": { path: B + "bioclia-dsDNA.docx",       langue: "FR", type: "docx" },
  "MY00149 / MY00098C": { path: B + "bioclia-Ro60.docx",        langue: "FR", type: "docx" },
  "MY00150 / MY00099C": { path: B + "bioclia-SSB-La.docx",      langue: "FR", type: "docx" },
  "MY00151 / MY00100C": { path: B + "bioclia-nRNP-Sm.docx",     langue: "FR", type: "docx" },
  "MY00152 / MY00101C": { path: B + "bioclia-Sm.docx",          langue: "FR", type: "docx" },
  "MY00153 / MY00102C": { path: B + "bioclia-Jo-1.docx",        langue: "FR", type: "docx" },
  "MY00154 / MY00103C": { path: B + "bioclia-Scl-70.docx",      langue: "FR", type: "docx" },
  "MY00155 / MY00104C": { path: B + "bioclia-Ro52.docx",        langue: "FR", type: "docx" },
  "MY00156 / MY00105C": { path: B + "bioclia-Ribosomal-P.docx", langue: "FR", type: "docx" },
  "MY00157 / MY00106C": { path: B + "bioclia-PCNA.docx",        langue: "FR", type: "docx" },
  "MY00158 / MY00107C": { path: B + "bioclia-PM-Scl.docx",      langue: "FR", type: "docx" },
  "MY00159 / MY00108C": { path: B + "bioclia-Histone.docx",     langue: "FR", type: "docx" },
  "MY00160 / MY00109C": { path: B + "bioclia-CENP-B.docx",      langue: "FR", type: "docx" },
  "MY00161 / MY00110C": { path: B + "bioclia-Nucleosome.docx",  langue: "FR", type: "docx" },
  "MY00162 / MY00111C": { path: B + "bioclia-MPO.docx",         langue: "FR", type: "docx" },
  "MY00163 / MY00112C": { path: B + "bioclia-PR3.docx",         langue: "FR", type: "docx" },
  "MY00164 / MY00113C": { path: B + "bioclia-GBM.docx",         langue: "FR", type: "docx" },
  "MY00165 / MY00114C": { path: B + "bioclia-gp210.docx",       langue: "FR", type: "docx" },
  "MY00166 / MY00115C": { path: B + "bioclia-sp100.docx",       langue: "FR", type: "docx" },
  "MY00167 / MY00116C": { path: B + "bioclia-LKM-1.docx",       langue: "FR", type: "docx" },
  "MY00168 / MY00117C": { path: B + "bioclia-LC-1.docx",        langue: "FR", type: "docx" },
  "MY00169 / MY00118C": { path: B + "bioclia-AMA-M2.docx",      langue: "FR", type: "docx" },
  "MY00170 / MY00119C": { path: B + "bioclia-SLA-LP.docx",      langue: "FR", type: "docx" },
  "MY00171 / MY00120C": { path: B + "bioclia-Cardiolipin-IgA.docx",    langue: "FR", type: "docx" },
  "MY00172 / MY00121C": { path: B + "bioclia-Cardiolipin-IgG.docx",    langue: "FR", type: "docx" },
  "MY00173 / MY00122C": { path: B + "bioclia-Cardiolipin-IgM.docx",    langue: "FR", type: "docx" },
  "MY00174 / MY00123C": { path: B + "bioclia-Cardiolipin-Screen.docx", langue: "FR", type: "docx" },
  "MY00175 / MY00124C": { path: B + "bioclia-b2GP1-IgA.docx",    langue: "FR", type: "docx" },
  "MY00176 / MY00125C": { path: B + "bioclia-b2GP1-IgG.docx",    langue: "FR", type: "docx" },
  "MY00177 / MY00126C": { path: B + "bioclia-b2GP1-IgM.docx",    langue: "FR", type: "docx" },
  "MY00178 / MY00127C": { path: B + "bioclia-b2GP1-Screen.docx", langue: "FR", type: "docx" },
  "MY00179 / MY00128C": { path: B + "bioclia-RF-IgA.docx",       langue: "FR", type: "docx" },
  "MY00180 / MY00129C": { path: B + "bioclia-RF-IgG.docx",       langue: "FR", type: "docx" },
  "MY00181 / MY00130C": { path: B + "bioclia-RF-IgM.docx",       langue: "FR", type: "docx" },
  "MY00182 / MY00131C": { path: B + "bioclia-RF-Screen.docx",    langue: "FR", type: "docx" },
  "MY00183 / MY00132C": { path: B + "bioclia-CCP.docx",          langue: "FR", type: "docx" },
  "MY00184 / MY00133C": { path: B + "bioclia-IAA.docx",          langue: "FR", type: "docx" },
  "MY00189 / MY00138C": { path: B + "bioclia-tTG-IgA.docx",      langue: "FR", type: "docx" },
  "MY00190 / MY00139C": { path: B + "bioclia-tTG-IgG.docx",      langue: "FR", type: "docx" },
  "MY00191 / MY00140C": { path: B + "bioclia-DGP-IgA.docx",      langue: "FR", type: "docx" },
  "MY00192 / MY00141C": { path: B + "bioclia-DGP-IgG.docx",      langue: "FR", type: "docx" },
  "MY00193 / MY00142C": { path: B + "bioclia-GAD.docx",           langue: "FR", type: "docx" },
  "MY00194 / MY00143C": { path: B + "bioclia-IA2.docx",           langue: "FR", type: "docx" },
  "MY00195 / MY00144C": { path: B + "bioclia-ICA.docx",           langue: "FR", type: "docx" },
  "MY00196 / MY00145C": { path: B + "bioclia-PCA.docx",           langue: "FR", type: "docx" },
  "MY00197 / MY00146C": { path: B + "bioclia-IF.docx",            langue: "FR", type: "docx" },
  "MY00198 / MY00147C": { path: B + "bioclia-ENA-Screen.docx",    langue: "FR", type: "docx" },
  "MY00969 / MY00980C": { path: B + "bioclia-CTD-Screen.docx",    langue: "FR", type: "docx" },
};
