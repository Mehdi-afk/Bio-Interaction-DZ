import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/src/lib/firebase-admin";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

function verifyAdmin(req: NextRequest): boolean {
  return req.headers.get("x-admin-email") === ADMIN_EMAIL;
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  try {
    const snap = await adminDb.collection("users").orderBy("createdAt", "desc").get();
    const users = snap.docs.map((d) => {
      const data = d.data();
      return {
        uid:       data.uid       ?? d.id,
        name:      data.name      ?? "",
        email:     data.email     ?? "",
        status:    data.status    ?? "pending",
        createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
      };
    });
    return NextResponse.json({ users });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[admin/users GET]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  try {
    const { uid, status } = (await req.json()) as { uid: string; status: string };
    if (!uid || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
    }
    await adminDb.collection("users").doc(uid).update({ status });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[admin/users PATCH]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
