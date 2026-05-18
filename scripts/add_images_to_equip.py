"""
Ajoute le champ "image" a chaque produit dans products-equip.ts
en se basant sur le mapping REF -> fichier image.
"""
import re
import os

FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "products-equip.ts")

IMAGE_MAP = {
    "INS00002": "/images/equipements/INS00002_ERBA_XL200.png",
    "INS00008": "/images/equipements/INS00008_ERBA_XL640.png",
    "INS00009": "/images/equipements/INS00009_ERBA_XL1000.png",
    "INS00014": "/images/equipements/INS00014_ERBA_CHEM7.png",
    "INS00079": "/images/equipements/INS00079_ERBA_EC90.png",
    "INS00077": "/images/equipements/INS00077_ERBA_H360.png",
    "INS00078": "/images/equipements/INS00078_ERBA_H560.png",
    "INS00071": "/images/equipements/INS00071_ERBA_ELITE580.png",
    "INS00087": "/images/equipements/INS00087_ERBA_H7100.png",
    "INS00060": "/images/equipements/INS00060_ERBA_ECL412.png",
    "INS00070": "/images/equipements/INS00070_ERBA_ECL760.png",
    "INS00064": "/images/equipements/INS00064_ERBA_LAURA_SMART.png",
    "INS00065": "/images/equipements/INS00065_ERBA_LAURA_XL.png",
    "52000131": "/images/equipements/52000131_ERBA_LISA_WASH.png",
    "52000121": "/images/equipements/52000121_ERBA_LISA_SCAN.png",
    "5075":     "/images/equipements/5075_GENERIC_ASSAYS_DOTDIVER2.png",
    "4450":     "/images/equipements/4450_MEDIPAN_AKIRON_NEO.png",
    "MA01073":  "/images/equipements/MA01073_HOB_BIOCLIA1900.png",
    "MA00502":  "/images/equipements/MA00502_HOB_BIOCLIA500.png",
    "MA00243":  "/images/equipements/MA00243_HOB_BIOCLIA6500.png",
}

with open(FILE, encoding="utf-8") as f:
    content = f.read()

updated = 0
for ref, img_path in IMAGE_MAP.items():
    # Cherche un bloc produit avec cette ref, sans champ image deja present
    # Remplace la ligne "conditionnement": "..." par la meme + "image": "..."
    pattern = r'("ref":\s*"' + re.escape(ref) + r'".*?"conditionnement":\s*"[^"]*")'

    def replacer(m, img=img_path):
        block = m.group(1)
        if '"image"' not in block:
            return block + ',\n        "image": "' + img + '"'
        return block

    new_content, n = re.subn(pattern, replacer, content, flags=re.DOTALL)
    if n > 0:
        content = new_content
        updated += 1
        print(f"[OK] {ref}")
    else:
        print(f"[SKIP] {ref} — pattern non trouve ou image deja presente")

with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{updated}/{len(IMAGE_MAP)} produits mis a jour dans products-equip.ts")
