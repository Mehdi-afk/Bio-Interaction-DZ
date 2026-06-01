import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(ROOT, "src/data/products-reactifs.ts"), "utf-8");

const refs = [
  "CLIA-ZnT8","CLIA-MDA5","MY02006 / MY02007C","MY01703 / MY01704C",
  "MY00405","MY01312","MY01315","MY01193","MY01195","MY01198","MY01199",
  "MY01203","MY01204","MY01205","MY01210","MY01211","MY01212","MY01213",
  "MY01214","MY01215","MY01216","MY01219","MY01220","MY01221","MY01222",
  "MY01224","MY01282","MY01283","MY01284","MY01285","MY01286","MY01287",
  "MY01288","MY01289","MY01290","MY01291","MY01292","MY01293","MY01294",
  "MY01295","MY01296","MY01297","MY01298","MY01299","MY01300","MY01301",
  "MY01302","MY01303","MY01306","MY01307","MY01317",
  "MB00268","MB00269","MB00272","MB00273","MB00274","MB00275","MB00276",
  "MB00277","MB00278","MB00279","MB00280","MB00281","MB00282","MB00283",
  "MB00284","MB00285","MB00286","MB00287",
  "4289","8260","4122","4131","4132","4282","4272","4277","4281","4471",
  "WB-DE125","WB-IG30","WB-IM60","WB-IA30","WB-SA125","WB-LC60","B200","WBPP08"
];

function escape(s) {
  return s.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}

for (const ref of refs) {
  const esc = escape(ref);
  // single-line: ref and nom on same line
  const m1 = src.match(new RegExp('"ref"\\s*:\\s*"' + esc + '"[^\\n]*"nom"\\s*:\\s*"([^"]+)"'));
  const m2 = src.match(new RegExp('"nom"\\s*:\\s*"([^"]+)"[\\s\\S]{0,400}"ref"\\s*:\\s*"' + esc + '"'));
  const nom = m1?.[1] ?? m2?.[1] ?? "?";
  console.log(`${ref} | ${nom}`);
}
