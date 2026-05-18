"""
Extraction et recadrage des images d'équipements du catalogue BioInteraction.
PDF source : catalogue biointeraction 26.pdf
Sortie     : public/images/equipements/*.png
"""
import fitz  # PyMuPDF
import os

PDF_PATH = r"C:\Users\PC\Documents\Fiche Technique\catalogue biointeraction 26.pdf"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "equipements")
os.makedirs(OUTPUT_DIR, exist_ok=True)

ZOOM = 3  # 216 DPI — haute résolution

# Coordonnées de recadrage normalisées (0.0 → 1.0)
# La photo de l'appareil est systématiquement dans la moitié droite de la page
# x_start=0.45 exclut le texte/boîtes réactifs à gauche
CROP = {
    "default": {"x0": 0.44, "y0": 0.18, "x1": 1.00, "y1": 0.88},
    # Appareils d'hémato centrés (pas de split gauche/droite)
    "hema":    {"x0": 0.25, "y0": 0.15, "x1": 0.85, "y1": 0.88},
    # Page 29 : LISA WASH en haut, LISA SCAN en bas
    "lisa_wash": {"x0": 0.30, "y0": 0.05, "x1": 0.90, "y1": 0.50},
    "lisa_scan": {"x0": 0.30, "y0": 0.50, "x1": 0.90, "y1": 0.95},
}

EQUIPEMENTS = [
    {"ref": "INS00002", "page": 5,  "filename": "INS00002_ERBA_XL200.png",         "crop": "default"},
    {"ref": "INS00008", "page": 6,  "filename": "INS00008_ERBA_XL640.png",         "crop": "default"},
    {"ref": "INS00009", "page": 7,  "filename": "INS00009_ERBA_XL1000.png",        "crop": "default"},
    {"ref": "INS00014", "page": 10, "filename": "INS00014_ERBA_CHEM7.png",         "crop": "default"},
    {"ref": "INS00079", "page": 12, "filename": "INS00079_ERBA_EC90.png",          "crop": "default"},
    {"ref": "INS00077", "page": 14, "filename": "INS00077_ERBA_H360.png",          "crop": "hema"},
    {"ref": "INS00078", "page": 16, "filename": "INS00078_ERBA_H560.png",          "crop": "hema"},
    {"ref": "INS00071", "page": 18, "filename": "INS00071_ERBA_ELITE580.png",      "crop": "hema"},
    {"ref": "INS00087", "page": 20, "filename": "INS00087_ERBA_H7100.png",         "crop": "hema"},
    {"ref": "INS00060", "page": 22, "filename": "INS00060_ERBA_ECL412.png",        "crop": "default"},
    {"ref": "INS00070", "page": 23, "filename": "INS00070_ERBA_ECL760.png",        "crop": "default"},
    {"ref": "INS00064", "page": 25, "filename": "INS00064_ERBA_LAURA_SMART.png",   "crop": "default"},
    {"ref": "INS00065", "page": 27, "filename": "INS00065_ERBA_LAURA_XL.png",      "crop": "default"},
    {"ref": "52000131", "page": 29, "filename": "52000131_ERBA_LISA_WASH.png",     "crop": "lisa_wash"},
    {"ref": "52000121", "page": 29, "filename": "52000121_ERBA_LISA_SCAN.png",     "crop": "lisa_scan"},
    {"ref": "5075",     "page": 34, "filename": "5075_GENERIC_ASSAYS_DOTDIVER2.png","crop": "default"},
    {"ref": "4450",     "page": 37, "filename": "4450_MEDIPAN_AKIRON_NEO.png",     "crop": "default"},
    {"ref": "MA01073",  "page": 40, "filename": "MA01073_HOB_BIOCLIA1900.png",     "crop": "default"},
    {"ref": "MA00502",  "page": 41, "filename": "MA00502_HOB_BIOCLIA500.png",      "crop": "default"},
    {"ref": "MA00243",  "page": 42, "filename": "MA00243_HOB_BIOCLIA6500.png",     "crop": "default"},
]

doc = fitz.open(PDF_PATH)
mat = fitz.Matrix(ZOOM, ZOOM)
ok = []
errors = []

for eq in EQUIPEMENTS:
    try:
        page = doc[eq["page"] - 1]
        w, h = page.rect.width, page.rect.height
        c = CROP[eq["crop"]]
        clip = fitz.Rect(w * c["x0"], h * c["y0"], w * c["x1"], h * c["y1"])
        pix = page.get_pixmap(matrix=mat, clip=clip)
        out_path = os.path.join(OUTPUT_DIR, eq["filename"])
        pix.save(out_path)
        size_kb = os.path.getsize(out_path) // 1024
        print(f"[OK] {eq['ref']:12s} -> {eq['filename']}  ({size_kb} KB)")
        ok.append(eq["ref"])
    except Exception as e:
        print(f"[ERR] {eq['ref']:12s} -> ERREUR : {e}")
        errors.append(eq["ref"])

doc.close()
print(f"\n{'='*55}")
print(f"  Extrait : {len(ok)}/20   Erreurs : {len(errors)}")
print(f"  Dossier : {OUTPUT_DIR}")
