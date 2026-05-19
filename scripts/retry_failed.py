import urllib.request, os, io
from PIL import Image

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "equipements")
SIZE = 800
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

RETRY = [
    ("INS00008", "https://www.erbalachema.com/images/produkty/vystrizek640-251120015501.jpg"),
    ("INS00079", "https://www.erbalachema.com/images/produkty/galerie/ec-90-210507100041.jpg"),
    ("INS00070", "https://www.erbalachema.com/images/produkty/dsc-2150-170628025359.jpg"),
]

PDF_FALLBACK = {
    "INS00008": "INS00008_ERBA_XL640.png",
    "INS00079": "INS00079_ERBA_EC90.png",
    "INS00070": "INS00070_ERBA_ECL760.png",
}

def square_crop(img, size):
    canvas = Image.new("RGB", (size, size), (255, 255, 255))
    img = img.convert("RGB")
    img.thumbnail((size, size), Image.LANCZOS)
    canvas.paste(img, ((size - img.width)//2, (size - img.height)//2))
    return canvas

for ref, url in RETRY:
    out = os.path.join(OUTPUT_DIR, f"{ref}.jpg")
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        img = Image.open(io.BytesIO(data))
        square_crop(img, SIZE).save(out, "JPEG", quality=88)
        print(f"[OK] {ref} -> downloaded from web")
    except Exception as e:
        print(f"[TIMEOUT] {ref} -> using PDF fallback")
        src = os.path.join(OUTPUT_DIR, PDF_FALLBACK[ref])
        img = Image.open(src)
        square_crop(img, SIZE).save(out, "JPEG", quality=88)
        print(f"[PDF] {ref} -> converted from PDF extract")
