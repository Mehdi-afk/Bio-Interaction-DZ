import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  escapeHtml, sanitizeHeader, isValidEmail, isNonEmptyString,
  isSameOrigin, rateLimit, rateLimitResponse,
  verifyBearer, unauthorizedResponse, forbiddenResponse, badRequestResponse,
} from "@/src/lib/api-security";

const RECIPIENT = "messaoudenemehdi0@gmail.com";

export async function POST(req: NextRequest) {
  // ── CSRF gate (same-origin) ──────────────────────────────────────────────────
  if (!isSameOrigin(req)) return badRequestResponse("Origine non autorisée.");

  // ── Auth ─────────────────────────────────────────────────────────────────────
  const decoded = await verifyBearer(req);
  if (!decoded) return unauthorizedResponse();
  if (!decoded.emailVerified) return forbiddenResponse();

  // ── Rate limit (per IP) — 5 devis / 15 min ──────────────────────────────────
  const limit = rateLimit(req, "send-devis", { capacity: 5, refillPerMin: 0.34 });
  if (!limit.ok) return rateLimitResponse(limit.retryAfter);

  // ── Parse + validate input ──────────────────────────────────────────────────
  let body: unknown;
  try { body = await req.json(); } catch { return badRequestResponse(); }

  const { organisme, nom, tel, email, products } = (body ?? {}) as {
    organisme?: unknown; nom?: unknown; tel?: unknown; email?: unknown; products?: unknown;
  };

  if (!isNonEmptyString(nom, 120))   return badRequestResponse("Nom invalide.");
  if (!isValidEmail(email))          return badRequestResponse("Email invalide.");

  const cleanOrganisme = typeof organisme === "string" ? organisme.slice(0, 200) : "";
  const cleanTel       = typeof tel       === "string" ? tel.slice(0, 40)        : "";

  if (!Array.isArray(products) || products.length > 200) {
    return badRequestResponse("Liste de produits invalide.");
  }
  const cleanProducts = (products as unknown[]).map((p) => {
    if (typeof p !== "object" || !p) return null;
    const o = p as { name?: unknown; ref?: unknown };
    if (typeof o.name !== "string" || typeof o.ref !== "string") return null;
    return { name: o.name.slice(0, 200), ref: o.ref.slice(0, 80) };
  }).filter((p): p is { name: string; ref: string } => p !== null);

  // ── Send email ──────────────────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);

  const subjectName = sanitizeHeader(cleanOrganisme || nom, 120);

  const productRows = cleanProducts
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #E5E3DC;">${escapeHtml(p.name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #E5E3DC;color:#6E6E6E;">Réf. ${escapeHtml(p.ref)}</td>
        </tr>`,
    )
    .join("");

  const { error } = await resend.emails.send({
    from: "bioInteraction <onboarding@resend.dev>",
    to: RECIPIENT,
    replyTo: email,
    subject: `[bioInteraction] Demande de devis — ${subjectName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1B1F1D;">
        <div style="background:#29A864;padding:20px 24px;border-radius:10px 10px 0 0;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Nouvelle demande de devis</h1>
        </div>
        <div style="border:1px solid #E5E3DC;border-top:none;padding:24px;border-radius:0 0 10px 10px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
            <tr><td style="padding:8px 0;color:#6E6E6E;width:140px;">Organisme</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(cleanOrganisme || "—")}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Nom</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(nom)}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Téléphone</td><td style="padding:8px 0;">${escapeHtml(cleanTel || "—")}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#29A864;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Compte UID</td><td style="padding:8px 0;color:#A9ADAA;font-family:monospace;font-size:12px;">${escapeHtml(decoded.uid)}</td></tr>
          </table>

          ${
            cleanProducts.length > 0
              ? `<p style="font-size:12px;color:#6E6E6E;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin:0 0 8px;">Produits souhaités (${cleanProducts.length})</p>
                 <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #E5E3DC;border-radius:8px;overflow:hidden;">
                   <thead><tr style="background:#F7F6F2;">
                     <th style="padding:8px 12px;text-align:left;color:#6E6E6E;font-weight:600;">Produit</th>
                     <th style="padding:8px 12px;text-align:left;color:#6E6E6E;font-weight:600;">Référence</th>
                   </tr></thead>
                   <tbody>${productRows}</tbody>
                 </table>`
              : `<p style="color:#6E6E6E;font-size:14px;">Aucun produit sélectionné — demande de renseignements généraux.</p>`
          }
        </div>
        <p style="font-size:11px;color:#A9ADAA;text-align:center;margin-top:16px;">bioInteraction — Distribution médicale · Alger</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error (devis):", error);
    return NextResponse.json({ error: "Échec de l'envoi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
