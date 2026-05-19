import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/src/lib/firebase-admin";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

// Simple token check: client sends the admin's Firebase ID token
async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const token = req.headers.get("x-admin-email");
  return token === ADMIN_EMAIL;
}

// GET /api/admin/users — list all users
export async function GET(req: NextRequest) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const snap = await adminDb.collection("users").orderBy("createdAt", "desc").get();
  const users = snap.docs.map((d) => {
    const data = d.data();
    return {
      uid:       data.uid,
      name:      data.name,
      email:     data.email,
      status:    data.status,
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
    };
  });

  return NextResponse.json({ users });
}

// PATCH /api/admin/users — update user status
export async function PATCH(req: NextRequest) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
  }

  const { uid, status } = (await req.json()) as { uid: string; status: string };
  if (!uid || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
  }

  await adminDb.collection("users").doc(uid).update({ status });
  return NextResponse.json({ ok: true });
}
