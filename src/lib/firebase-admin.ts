import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  const privateKey   = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail  = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId    = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (privateKey && clientEmail && projectId) {
    // Strip surrounding quotes if Vercel stored them literally, then restore newlines
    const cleanKey = privateKey
      .replace(/^"|"$/g, "")
      .replace(/\\n/g, "\n");
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey: cleanKey }),
    });
  }

  // Fallback: full JSON blob (legacy)
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed.private_key) parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
    return initializeApp({ credential: cert(parsed) });
  }

  throw new Error("Firebase Admin : aucune credential trouvée (FIREBASE_PRIVATE_KEY + FIREBASE_CLIENT_EMAIL requis)");
}

export const adminDb = getFirestore(getAdminApp());
