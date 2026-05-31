import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  escapeHtml, sanitizeHeader, isValidEmail, isNonEmptyString,
  isSameOrigin, rateLimit, rateLimitResponse, badRequestResponse,
} from "@/src/lib/api-security";

const RECIPIENT = "messaoudenemehdi8@gmail.com";

export async function POST(req: NextRequest) {
  // ── CSRF gate ──────────────────────────────────────────────────────────────
  if (!isSameOrigin(req)) return badRequestResponse("Origine non autorisée.");

  // ── Rate limit — 3 messages / 10 min par IP ────────────────────────────────
  const limit = rateLimit(req, "send-contact", { capacity: 3, refillPerMin: 0.3 });
  if (!limit.ok) return rateLimitResponse(limit.retryAfter);

  // ── Parse + validate ───────────────────────────────────────────────────────
  let body: unknown;
  try { body = await req.json(); } catch { return badRequestResponse(); }

  const { nom, email, sujet, message } = (body ?? {}) as {
    nom?: unknown; email?: unknown; sujet?: unknown; message?: unknown;
  };

  if (!isNonEmptyString(nom, 120))      return badRequestResponse("Nom invalide.");
  if (!isValidEmail(email))             return badRequestResponse("Email invalide.");
  if (!isNonEmptyString(message, 5000)) return badRequestResponse("Message invalide.");

  const cleanSujet = typeof sujet === "string" ? sujet.slice(0, 200) : "";

  // ── Send ───────────────────────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "bioInteraction <onboarding@resend.dev>",
    to: RECIPIENT,
    replyTo: email,
    subject: sanitizeHeader(`[bioInteraction] Message de ${nom} — ${cleanSujet || "Sans sujet"}`, 200),
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1B1F1D;">
        <div style="background:#29A864;padding:20px 24px;border-radius:10px 10px 0 0;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Nouveau message de contact</h1>
        </div>
        <div style="border:1px solid #E5E3DC;border-top:none;padding:24px;border-radius:0 0 10px 10px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6E6E6E;width:130px;">Nom</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(nom)}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#29A864;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Sujet</td><td style="padding:8px 0;">${escapeHtml(cleanSujet || "—")}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #E5E3DC;margin:16px 0;">
          <p style="color:#6E6E6E;font-size:12px;margin:0 0 8px;">Message :</p>
          <p style="white-space:pre-wrap;font-size:15px;line-height:1.7;margin:0;">${escapeHtml(message)}</p>
        </div>
        <p style="font-size:11px;color:#A9ADAA;text-align:center;margin-top:16px;">bioInteraction — Distribution médicale · Alger</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error (contact):", error);
    return NextResponse.json({ error: "Échec de l'envoi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
