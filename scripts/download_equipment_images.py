"""
Télécharge les images d'équipements depuis les sites fabricants,
les recadre en carré (800x800) et les sauve dans public/images/equipements/
"""
import urllib.request
import os
import sys
from PIL import Image
import io

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "equipements")
os.makedirs(OUTPUT_DIR, exist_ok=True)

SIZE = 800  # pixels — carré final

IMAGES = [
    ("INS00002", "https://www.erbalachema.com/images/produkty/erba-xl200-01-240923040157.jpg"),
    ("INS00008", "https://www.erbalachema.com/images/produkty/vystrizek640-251120015501.jpg"),
    ("INS00009", "https://www.erbalachema.com/images/produkty/xl1000-130319075743.jpg"),
    ("INS00014", "https://www.erbalachema.com/images/produkty/chem7-251121111336.jpg"),
    ("INS00079", "https://www.erbalachema.com/images/produkty/galerie/ec-90-210507100041.jpg"),
    ("INS00077", "https://www.erbalachema.com/images/produkty/h360-main-screen-190507124257.jpg"),
    ("INS00078", "https://www.erbalachema.com/images/produkty/2-251127055902.jpg"),
    ("INS00071", "https://www.erbalachema.com/images/produkty/elite-580-foto-171110072032.jpg"),
    ("INS00087", "https://www.erbalachema.com/images/produkty/erba-h7100-render-01-260204105516.jpg"),
    ("INS00060", "https://www.erbalachema.com/images/produkty/ecl-412-251121123546.jpg"),
    ("INS00070", "https://www.erbalachema.com/images/produkty/dsc-2150-170628025359.jpg"),
    ("INS00064", "https://www.erbalachema.com/images/produkty/laura-smart-250416101843.jpg"),
    ("INS00065", "https://www.erbalachema.com/images/produkty/laura-xl-ikona-210203091111.jpg"),
    ("52000131", "https://www.erbalachema.com/images/produkty/galerie/lisawashii-210507100901.jpg"),
    ("52000121", "https://www.erbalachema.com/images/produkty/galerie/lisascan-em-210507100914.jpg"),
    ("5075",     "https://www.medipan.de/wp-content/uploads/2023/03/Device-Picture-REF-5075-e1698671554752.png"),
]

# Ces 4 produits n'ont pas d'URL web disponible — on convertit les extraits PDF existants
PDF_FALLBACKS = ["4450", "MA01073", "MA00502", "MA00243"]
PDF_NAMES = {
    "4450":    "4450_MEDIPAN_AKIRON_NEO.png",
    "MA01073": "MA01073_HOB_BIOCLIA1900.png",
    "MA00502": "MA00502_HOB_BIOCLIA500.png",
    "MA00243": "MA00243_HOB_BIOCLIA6500.png",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def square_crop(img: Image.Image, size: int) -> Image.Image:
    """Centre-crop puis resize en carré blanc."""
    # Fond blanc + image centrée (object-contain)
    canvas = Image.new("RGB", (size, size), (255, 255, 255))
    img = img.convert("RGB")
    img.thumbnail((size, size), Image.LANCZOS)
    x = (size - img.width) // 2
    y = (size - img.height) // 2
    canvas.paste(img, (x, y))
    return canvas

ok, errors = [], []

# Téléchargement des URLs web
for ref, url in IMAGES:
    out = os.path.join(OUTPUT_DIR, f"{ref}.jpg")
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
        img = Image.open(io.BytesIO(data))
        result = square_crop(img, SIZE)
        result.save(out, "JPEG", quality=88, optimize=True)
        kb = os.path.getsize(out) // 1024
        print(f"[OK] {ref:12s} -> {ref}.jpg  ({kb} KB)")
        ok.append(ref)
    except Exception as e:
        print(f"[ERR] {ref:12s} -> {e}")
        errors.append(ref)

# Conversion des extraits PDF pour les 4 produits sans URL
for ref in PDF_FALLBACKS:
    src = os.path.join(OUTPUT_DIR, PDF_NAMES[ref])
    out = os.path.join(OUTPUT_DIR, f"{ref}.jpg")
    try:
        img = Image.open(src)
        result = square_crop(img, SIZE)
        result.save(out, "JPEG", quality=88, optimize=True)
        kb = os.path.getsize(out) // 1024
        print(f"[PDF] {ref:12s} -> {ref}.jpg  ({kb} KB)")
        ok.append(ref)
    except Exception as e:
        print(f"[ERR] {ref:12s} -> {e}")
        errors.append(ref)

print(f"\n{'='*50}")
print(f"  Succes : {len(ok)}/20   Erreurs : {len(errors)}")
