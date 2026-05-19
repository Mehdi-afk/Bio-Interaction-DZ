import { NextResponse } from "next/server";

export async function GET() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!raw) {
    return NextResponse.json({ error: "FIREBASE_SERVICE_ACCOUNT non défini" });
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return NextResponse.json({ error: "JSON invalide : " + (e as Error).message, rawLength: raw.length });
  }

  // Try firebase-admin init
  try {
    const { adminDb } = await import("@/src/lib/firebase-admin");
    await adminDb.collection("users").limit(1).get();
    return NextResponse.json({
      ok: true,
      project_id: parsed.project_id,
      client_email: parsed.client_email,
      key_starts: (parsed.private_key as string)?.slice(0, 40),
    });
  } catch (e) {
    return NextResponse.json({
      error: "firebase-admin init failed : " + (e as Error).message,
      project_id: parsed.project_id,
      has_private_key: !!parsed.private_key,
    });
  }
}
