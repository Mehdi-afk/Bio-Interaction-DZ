"""
Recrée les 11 images basse qualité à partir des extraits PDF haute résolution.
Crop carré centré sur la zone de l'appareil (côté droit de la page catalogue).
"""
from PIL import Image
import os

DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "equipements")
SIZE = 800

# (id, fichier_pdf_source, x0%, y0%, x1%, y1%)
# La photo de l'appareil est dans la moitié droite de la page (x > 44%)
# et dans le tiers central en hauteur (y ~ 22% à 68%)
REBUILDS = [
    ("INS00002", "INS00002_ERBA_XL200.png",      0.44, 0.22, 1.00, 0.72),
    ("INS00008", "INS00008_ERBA_XL640.png",       0.44, 0.22, 1.00, 0.72),
    ("INS00009", "INS00009_ERBA_XL1000.png",      0.44, 0.22, 1.00, 0.72),
    ("INS00014", "INS00014_ERBA_CHEM7.png",       0.44, 0.22, 1.00, 0.72),
    ("INS00060", "INS00060_ERBA_ECL412.png",      0.44, 0.22, 1.00, 0.72),
    ("INS00064", "INS00064_ERBA_LAURA_SMART.png", 0.44, 0.22, 1.00, 0.72),
    ("INS00070", "INS00070_ERBA_ECL760.png",      0.44, 0.22, 1.00, 0.72),
    ("INS00071", "INS00071_ERBA_ELITE580.png",    0.22, 0.15, 0.85, 0.60),
    ("INS00077", "INS00077_ERBA_H360.png",        0.20, 0.15, 0.85, 0.62),
    ("INS00078", "INS00078_ERBA_H560.png",        0.20, 0.15, 0.85, 0.62),
    ("INS00087", "INS00087_ERBA_H7100.png",       0.20, 0.15, 0.85, 0.62),
]

def square_crop(img, size):
    canvas = Image.new("RGB", (size, size), (255, 255, 255))
    img = img.convert("RGB")
    img.thumbnail((size, size), Image.LANCZOS)
    canvas.paste(img, ((size - img.width) // 2, (size - img.height) // 2))
    return canvas

for ref, src_name, x0, y0, x1, y1 in REBUILDS:
    src = os.path.join(DIR, src_name)
    out = os.path.join(DIR, f"{ref}.jpg")
    try:
        img = Image.open(src)
        w, h = img.size
        box = (int(x0*w), int(y0*h), int(x1*w), int(y1*h))
        cropped = img.crop(box)
        result = square_crop(cropped, SIZE)
        result.save(out, "JPEG", quality=92, optimize=True)
        kb = os.path.getsize(out) // 1024
        print(f"[OK] {ref:12s} crop={box} -> {kb}KB")
    except Exception as e:
        print(f"[ERR] {ref:12s} -> {e}")

print("\nTermine.")
