/**
 * Match all ERBA products to IFU notices scraped from erbalachema.com
 * Run: node scripts/match-erba-full.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");

const BASE = "https://www.erbalachema.com/en/akce/prilohy/priloha/stahnout/";

// Map ref → IFU URL (including multi-ref entries)
const REF_TO_URL = {
  // ── XSYS ──────────────────────────────────────────────────────────────────
  "XSYS0001": BASE + "4205/",
  "XSYS0002": BASE + "4210/",
  "XSYS0003": BASE + "4206/",
  "XSYS0004": BASE + "4230/",
  "XSYS0007": BASE + "4207/",
  "XSYS0008": BASE + "4208/",
  "XSYS0009": BASE + "4209/",
  "XSYS0011": BASE + "4211/",
  "XSYS0012": BASE + "4212/",
  "XSYS0013": BASE + "4213/",
  "XSYS0015": BASE + "4214/",
  "XSYS0016": BASE + "4215/",
  "XSYS0017": BASE + "4216/",
  "XSYS0018": BASE + "4220/",
  "XSYS0020": BASE + "4217/",
  "XSYS0021": BASE + "4218/",
  "XSYS0022": BASE + "4602/",
  "XSYS0023": BASE + "4221/",
  "XSYS0024": BASE + "4222/",
  "XSYS0027": BASE + "4223/",
  "XSYS0028": BASE + "4224/",
  "XSYS0029": BASE + "4225/",
  "XSYS0034": BASE + "4226/",
  "XSYS0040": BASE + "4254/",
  "XSYS0041": BASE + "4227/",
  "XSYS0042": BASE + "4228/",
  "XSYS0043": BASE + "4229/",
  "XSYS0044": BASE + "4232/",
  "XSYS0046": BASE + "4233/",
  "XSYS0047": BASE + "4234/",
  "XSYS0048": BASE + "4235/",
  "XSYS0049": BASE + "4237/",
  "XSYS0050": BASE + "4237/",
  "XSYS0051": BASE + "4238/",
  "XSYS0052": BASE + "4239/",
  "XSYS0053": BASE + "4240/",
  "XSYS0054": BASE + "4241/",
  "XSYS0055": BASE + "4242/",
  "XSYS0056": BASE + "4243/",
  "XSYS0057": BASE + "4244/",
  "XSYS0061": BASE + "4245/",
  "XSYS0062": BASE + "4246/",
  "XSYS0064": BASE + "4247/",
  "XSYS0065": BASE + "4248/",
  "XSYS0066": BASE + "4249/",
  "XSYS0067": BASE + "4250/",
  "XSYS0070": BASE + "4209/",
  "XSYS0071": BASE + "4227/",
  "XSYS0075": BASE + "4217/",
  "XSYS0076": BASE + "5055/",
  "XSYS0078": BASE + "4230/",
  "XSYS0081": BASE + "4251/",
  "XSYS0082": BASE + "4252/",
  "XSYS0083": BASE + "4253/",
  "XSYS0084": BASE + "4255/",
  "XSYS0085": BASE + "5051/",
  "XSYS0086": BASE + "4597/",
  "XSYS0087": BASE + "4256/",
  "XSYS0088": BASE + "4257/",
  "XSYS0093": BASE + "4214/",
  "XSYS0094": BASE + "4234/",
  "XSYS0095": BASE + "4258/",
  "XSYS0096": BASE + "4259/",
  "XSYS0097": BASE + "4260/",
  "XSYS0098": BASE + "4267/",
  "XSYS0099": BASE + "4261/",
  "XSYS0100": BASE + "4262/",
  "XSYS0101": BASE + "4263/",
  "XSYS0102": BASE + "5112/",
  "XSYS0103": BASE + "5113/",
  "XSYS0104": BASE + "4266/",
  "XSYS0105": BASE + "5114/",
  "XSYS0122": BASE + "4226/",
  "XSYS0123": BASE + "4183/",
  "XSYS0124": BASE + "4185/",
  "XSYS0125": BASE + "4339/",
  "XSYS0126": BASE + "4824/",
  "XSYS0127": BASE + "4825/",

  // ── BLT ───────────────────────────────────────────────────────────────────
  "BLT00001": BASE + "4126/",
  "BLT00003": BASE + "4127/",
  "BLT00004": BASE + "4127/",
  "BLT00005": BASE + "4128/",
  "BLT00006": BASE + "4129/",
  "BLT00007": BASE + "4130/",
  "BLT00009": BASE + "4132/",
  "BLT00010": BASE + "4133/",
  "BLT00011": BASE + "4134/",
  "BLT00012": BASE + "4135/",
  "BLT00013": BASE + "4136/",
  "BLT00014": BASE + "4137/",
  "BLT00015": BASE + "4138/",
  "BLT00016": BASE + "4138/",
  "BLT00017": BASE + "4607/",  // CK 100 (same as CK MB 100 page covers CK)
  "BLT00018": BASE + "4607/",
  "BLT00020": BASE + "4139/",
  "BLT00021": BASE + "4141/",
  "BLT00022": BASE + "4143/",
  "BLT00023": BASE + "4144/",
  "BLT00024": BASE + "4144/",
  "BLT00025": BASE + "4145/",
  "BLT00028": BASE + "4601/",
  "BLT00029": BASE + "4147/",
  "BLT00030": BASE + "4148/",
  "BLT00032": BASE + "4149/",
  "BLT00033": BASE + "4150/",
  "BLT00034": BASE + "4151/",
  "BLT00035": BASE + "4151/",
  "BLT00036": BASE + "4151/",
  "BLT00037": BASE + "4152/",
  "BLT00038": BASE + "4153/",
  "BLT00039": BASE + "4153/",
  "BLT00041": BASE + "4156/",
  "BLT00042": BASE + "4157/",
  "BLT00043": BASE + "4157/",  // LDL C DIRECT 80 — closest match
  "BLT00045": BASE + "4158/",
  "BLT00047": BASE + "4159/",
  "BLT00048": BASE + "4159/",
  "BLT00049": BASE + "4160/",
  "BLT00050": BASE + "4161/",
  "BLT00051": BASE + "4161/",
  "BLT00052": BASE + "4162/",
  "BLT00053": BASE + "4162/",
  "BLT00054": BASE + "4163/",
  "BLT00055": BASE + "4163/",
  "BLT00057": BASE + "4164/",
  "BLT00058": BASE + "4164/",
  "BLT00059": BASE + "4164/",
  "BLT00060": BASE + "4165/",
  "BLT00061": BASE + "4165/",
  "BLT00062": BASE + "4166/",
  "BLT00063": BASE + "4167/",
  "BLT00064": BASE + "4167/",
  "BLT00065": BASE + "4168/",
  "BLT00066": BASE + "4169/",
  "BLT00067": BASE + "4170/",
  "BLT00069": BASE + "4171/",
  "BLT00070": BASE + "4172/",
  "BLT00071": BASE + "4173/",
  "BLT00072": BASE + "4174/",
  "BLT00073": BASE + "4175/",
  "BLT00074": BASE + "4178/",
  "BLT00077": BASE + "4180/",
  "BLT00078": BASE + "4179/",
  "BLT00079": BASE + "4181/",
  "BLT00080": BASE + "4183/",
  "BLT00081": BASE + "4185/",
  "BLT00083": BASE + "4186/",
  "BLT20004": BASE + "4188/",
  "BLT20009": BASE + "4189/",
  "BLT20010": BASE + "4189/",
  "BLT20011": BASE + "4190/",
  "BLT20013": BASE + "4191/",
  "BLT20014": BASE + "4192/",
  "BLT20015": BASE + "4193/",
  "BLT20016": BASE + "4194/",
  "BLT20017": BASE + "4195/",
  "BLT20029": BASE + "4196/",
  "BLT20030": BASE + "4197/",
  "BLT20031": BASE + "4197/",
  "BLT20032": BASE + "4198/",
  "BLT20033": BASE + "4199/",
  "BLT20034": BASE + "4609/",
  "BLT20035": BASE + "4200/",
  "BLT20036": BASE + "4201/",
  "BLT20037": BASE + "4201/",
  "BLT20039": BASE + "4202/",
  "BLT20041": BASE + "4203/",
  "BLT20042": BASE + "4204/",

  // ── REG ───────────────────────────────────────────────────────────────────
  "REG00054": BASE + "4709/",
  "REG00055": BASE + "4862/",
  "REG00059": BASE + "4863/",

  // ── HEM ───────────────────────────────────────────────────────────────────
  "HEM00001": BASE + "4781/",
  "HEM00002": BASE + "4782/",
  "HEM00003": BASE + "4783/",
  "HEM00004": BASE + "4784/",
  "HEM00005": BASE + "4785/",
  "HEM00006": BASE + "4786/",
  "HEM00007": BASE + "4787/",
  "HEM00008": BASE + "4787/",
  "HEM00016": BASE + "4788/",
  "HEM00019": BASE + "3851/",
  "HEM00020": BASE + "3852/",
  "HEM00021": BASE + "3853/",
  "HEM00022": BASE + "3855/",
  "HEM00023": BASE + "3856/",
  "HEM00024": BASE + "3857/",
  "HEM00025": BASE + "3857/",
  "HEM00026": BASE + "3857/",
  "HEM00027": BASE + "3858/",
  "HEM00028": BASE + "3859/",
  "HEM00029": BASE + "3860/",
  "HEM00030": BASE + "3861/",
  "HEM00031": BASE + "3862/",
  "HEM00032": BASE + "3863/",
  "HEM00033": BASE + "3864/",
  "HEM00034": BASE + "3864/",
  "HEM00035": BASE + "3864/",
  "HEM00044": BASE + "4844/",
  "HEM00045": BASE + "4845/",
  "HEM00046": BASE + "4846/",
  "HEM00047": BASE + "4846/",
  "HEM00048": BASE + "4847/",
  "HEM00049": BASE + "4847/",
  "HEM00050": BASE + "4847/",
  "HEM00051": BASE + "4848/",
  "HEM00052": BASE + "4848/",
  "HEM00053": BASE + "4849/",
  "HEM00054": BASE + "4849/",
  "HEM00055": BASE + "4850/",
  "HEM00056": BASE + "4850/",
  "HEM00057": BASE + "4850/",
  "HEM00058": BASE + "4850/",
  "HEM00059": BASE + "4851/",
  "HEM00060": BASE + "4851/",
  "HEM00061": BASE + "4851/",
  "HEM00062": BASE + "4851/",
  "HEM00063": BASE + "4852/",
  "HEM00064": BASE + "4852/",
  "HEM00065": BASE + "4845/",
  "HEM00066": BASE + "4846/",
  "HEM00067": BASE + "4847/",
  "HEM00068": BASE + "4848/",
  "HEM00071": BASE + "3857/",
  "HEM00072": BASE + "3864/",

  // ── EHL ───────────────────────────────────────────────────────────────────
  "EHL00001": BASE + "3766/",
  "EHL00002": BASE + "3766/",
  "EHL00003": BASE + "3765/",
  "EHL00004": BASE + "3765/",
  "EHL00005": BASE + "3767/",
  "EHL00006": BASE + "3769/",
  "EHL00007": BASE + "3770/",
  "EHL00008": BASE + "3771/",
  "EHL00009": BASE + "3772/",
  "EHL00011": BASE + "3773/",
  "EHL00012": BASE + "3775/",
  "EHL00013": BASE + "3776/",
  "EHL00014": BASE + "3777/",
  "EHL00015": BASE + "3778/",
  "EHL00016": BASE + "3779/",
  "EHL00017": BASE + "3781/",
  "EHL00018": BASE + "3782/",
  "EHL00019": BASE + "3784/",
  "EHL00020": BASE + "3785/",
  "EHL00021": BASE + "3787/",
  "EHL00024": BASE + "3789/",
  "EHL00025": BASE + "3768/",
  "EHL00026": BASE + "3770/",
  "EHL00027": BASE + "3763/",
  "EHL00028": BASE + "3773/",
  "EHL00029": BASE + "3790/",
  "EHL00030": BASE + "3791/",
  "EHL00031": BASE + "3792/",
  "EHL00032": BASE + "3793/",
  "EHL00033": BASE + "3794/",
  "EHL00034": BASE + "3795/",
  "EHL00035": BASE + "3796/",
  "EHL00036": BASE + "3797/",
  "EHL00037": BASE + "3798/",
  "EHL00038": BASE + "3799/",
  "EHL00039": BASE + "3800/",
  "EHL00042": BASE + "3801/",
  "EHL00044": BASE + "3782/",
  "EHL00045": BASE + "3802/",
  "EHL00046": BASE + "3789/",
  "EHL00047": BASE + "3789/",
  "EHL00048": BASE + "3803/",
  "EHL00049": BASE + "3805/",
};

// Load all ERBA products
const tsSource = readFileSync(join(ROOT, "src", "data", "products-reactifs.ts"), "utf-8");
const pass1Re = /"ref"\s*:\s*"([^"]+)"[\s\S]*?"marque"\s*:\s*"([^"]+)"/g;
const erbaProducts = [];
let pm;
while ((pm = pass1Re.exec(tsSource)) !== null) {
  if (!pm[2].includes("ERBA")) continue;
  const block = tsSource.slice(pm.index, pm.index + 600);
  const descMatch = block.match(/"desc"\s*:\s*"([^"]+)"/);
  erbaProducts.push({ ref: pm[1].trim(), desc: descMatch?.[1]?.trim() || "" });
}

console.log(`Total ERBA products: ${erbaProducts.length}`);

// Match and build entries
const entries = {};
const matched = [];
const unmatched = [];

for (const p of erbaProducts) {
  const url = REF_TO_URL[p.ref];
  if (url) {
    entries[p.ref] = { type: "IFU", label: "Notice IFU", langue: "A", url };
    matched.push(p.ref);
  } else {
    unmatched.push(p);
  }
}

console.log(`Matched: ${matched.length}`);
console.log(`Unmatched: ${unmatched.length}`);
if (unmatched.length) {
  console.log("Unmatched:");
  unmatched.forEach(p => console.log(`  - ${p.ref} (${p.desc})`));
}

// Generate TypeScript
let ts = `// AUTO-GENERATED — scripts/match-erba-full.mjs
// Source: https://www.erbalachema.com/en/product-support/instructions/
// ${matched.length} réactifs ERBA avec notice IFU (XSYS, BLT, HEM, EHL)

export type FicheTechnique = {
  type:   "IFU" | "autre";
  label:  string;
  langue: string;
  url:    string;
};

/** Map ref produit → notices ERBA */
export const FICHES_TECHNIQUES: Record<string, FicheTechnique[]> = {\n`;

for (const [ref, e] of Object.entries(entries).sort()) {
  ts += `  "${ref}": [{ type: "${e.type}", label: "${e.label}", langue: "${e.langue}", url: "${e.url}" }],\n`;
}
ts += `};\n`;

writeFileSync(join(ROOT, "src", "data", "fiches-techniques.ts"), ts);
console.log(`\nGenerated src/data/fiches-techniques.ts (${matched.length} entries)`);
