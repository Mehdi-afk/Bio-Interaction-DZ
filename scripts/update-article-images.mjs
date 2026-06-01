/**
 * Télécharge les images des articles Medipan, les uploade dans Firebase Storage
 * et met à jour les documents Firestore avec coverImage + blocs image dans le body.
 * Run : node scripts/update-article-images.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, "..");

/* ── .env.local ── */
function loadEnv() {
  const text = readFileSync(join(ROOT, ".env.local"), "utf8");
  const env  = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[m[1]] = val.replace(/\\n/g, "\n");
  }
  return env;
}
const env = loadEnv();

/* ── Firebase Admin ── */
const { initializeApp, cert } = await import("firebase-admin/app");
const { getFirestore }        = await import("firebase-admin/firestore");
const { getStorage }          = await import("firebase-admin/storage");

initializeApp({
  credential: cert({
    projectId:   env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey:  env.FIREBASE_PRIVATE_KEY,
  }),
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});

const db     = getFirestore();
const bucket = getStorage().bucket();

/* ── Helpers ── */
async function downloadImage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} pour ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function getContentType(url) {
  if (url.match(/\.png/i))  return "image/png";
  if (url.match(/\.webp/i)) return "image/webp";
  return "image/jpeg";
}

function getExt(url) {
  if (url.match(/\.png/i))  return ".png";
  if (url.match(/\.webp/i)) return ".webp";
  return ".jpg";
}

async function uploadToStorage(buffer, storagePath, contentType) {
  const file  = bucket.file(storagePath);
  const token = randomUUID();
  await file.save(buffer, {
    contentType,
    metadata: { metadata: { firebaseStorageDownloadTokens: token } },
  });
  const encoded = encodeURIComponent(storagePath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encoded}?alt=media&token=${token}`;
}

/* ── Configuration des articles ──────────────────────────────────────────
   Chaque entrée contient :
   - id          : ID Firestore de l'article
   - name        : label pour les logs
   - coverUrl    : URL de l'image de couverture (featured image)
   - bodyImages  : images inline à insérer dans le body
       - url            : URL de l'image
       - caption        : légende en français
       - afterBlockIdx  : index du bloc après lequel insérer l'image
   ──────────────────────────────────────────────────────────────────────── */
const ARTICLES = [
  {
    id:       "GuAWNPJRf37kOfoYKjbd",
    name:     "Article 1 — ANA AI Pilot Study",
    coverUrl: "https://www.medipan.de/wp-content/uploads/2025/10/KI_AdobeStock_1417252655-scaled.jpeg",
    bodyImages: [
      {
        url:           "https://www.medipan.de/wp-content/uploads/2023/05/wemakegoodvideos_Medipan_small_-3-e1759311983803-1024x702.jpg",
        caption:       "Le système akiron® NEO en conditions de laboratoire",
        afterBlockIdx: 7,  // après la liste ol "3 étapes"
      },
    ],
  },
  {
    id:       "Ozpjapg8HaTDPvKRHNyn",
    name:     "Article 2 — Microbiome IBD",
    coverUrl: "https://www.medipan.de/wp-content/uploads/2025/12/AdobeStock_1662442962-scaled.jpeg",
    bodyImages: [
      {
        url:           "https://www.medipan.de/wp-content/uploads/2025/12/3D-Darm-AdobeStock_334934694-1024x616.jpeg",
        caption:       "Représentation 3D du microbiome intestinal et de la muqueuse digestive",
        afterBlockIdx: 6,  // après la liste ol "4 caractéristiques"
      },
    ],
  },
  {
    id:       "dNROEKVo8L9it0DA8LQq",
    name:     "Article 3 — ANA HEp-2 Clinical Validation",
    coverUrl: "https://www.medipan.de/wp-content/uploads/2026/02/akironNEOinlab-e1772002787969.png",
    bodyImages: [
      {
        url:           "https://www.medipan.de/wp-content/uploads/2026/02/hep2-ifa-patterns.jpg",
        caption:       "Exemples de patterns ANA HEp-2 IFA reconnus par le système akiron® NEO",
        afterBlockIdx: 5,  // après la liste ul des résultats
      },
    ],
  },
  {
    id:       "0C7fVGhP5zCNoKk67afp",
    name:     "Article 4 — PSC Anti-GP2 IgA",
    coverUrl: "https://www.medipan.de/wp-content/uploads/2026/03/AdobeStock_1248714755-scaled-e1773989015794.jpeg",
    bodyImages: [
      {
        url:           "https://www.medipan.de/wp-content/uploads/2026/03/AdobeStock_1852276009-scaled-e1773987680464-1024x853.jpeg",
        caption:       "Les voies biliaires intrahépatiques dans la cholangite sclérosante primitive (CSP)",
        afterBlockIdx: 9,  // après la liste ul "associations anti-GP2"
      },
    ],
  },
];

/* ── Traitement ── */
console.log(`\n🖼  Mise à jour des images pour ${ARTICLES.length} articles...\n`);

for (const art of ARTICLES) {
  console.log(`📄 ${art.name}`);

  try {
    const docRef = db.collection("articles").doc(art.id);
    const snap   = await docRef.get();
    if (!snap.exists) { console.log("   ❌ Article introuvable\n"); continue; }

    const data = snap.data();
    let body   = [...(data.body ?? [])];

    /* Cover image */
    const coverBuf = await downloadImage(art.coverUrl);
    const coverExt = getExt(art.coverUrl);
    const coverUrl = await uploadToStorage(
      coverBuf,
      `blog-covers/${art.id}${coverExt}`,
      getContentType(art.coverUrl),
    );
    console.log(`   ✓ Cover uploadée`);

    /* Body images */
    let offset = 0;
    for (const img of art.bodyImages) {
      const imgBuf = await downloadImage(img.url);
      const imgExt = getExt(img.url);
      const imgUrl = await uploadToStorage(
        imgBuf,
        `blog-images/${art.id}/${randomUUID()}${imgExt}`,
        getContentType(img.url),
      );
      console.log(`   ✓ Image inline uploadée`);

      const block = { type: "image", url: imgUrl, caption: img.caption, align: "full" };
      body.splice(img.afterBlockIdx + offset + 1, 0, block);
      offset++;
    }

    await docRef.update({ coverImage: coverUrl, body });
    console.log(`   ✅ Article mis à jour\n`);

  } catch (err) {
    console.error(`   ❌ Erreur : ${err.message}\n`);
  }
}

console.log("✔ Terminé.");
