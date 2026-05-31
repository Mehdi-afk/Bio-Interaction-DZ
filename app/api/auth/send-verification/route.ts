import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { adminAuth } from "@/src/lib/firebase-admin";
import {
  escapeHtml, sanitizeHeader, isValidEmail,
  isSameOrigin, rateLimit, rateLimitResponse, badRequestResponse,
  verifyBearer, unauthorizedResponse, forbiddenResponse,
} from "@/src/lib/api-security";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "BioInteraction <noreply@biointeractiondz.com>";
const BASE   = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biointeractiondz.com";

export async function POST(req: NextRequest) {
  // ── CSRF gate ──────────────────────────────────────────────────────────────
  if (!isSameOrigin(req)) return badRequestResponse("Origine non autorisée.");

  // ── Rate limit — 3 emails / 10 min par IP (anti-spam Resend) ───────────────
  const limit = rateLimit(req, "send-verification", { capacity: 3, refillPerMin: 0.3 });
  if (!limit.ok) return rateLimitResponse(limit.retryAfter);

  // ── Parse + validate ───────────────────────────────────────────────────────
  let body: unknown;
  try { body = await req.json(); } catch { return badRequestResponse(); }

  const { uid, email, name } = (body ?? {}) as {
    uid?: unknown; email?: unknown; name?: unknown;
  };

  if (typeof uid !== "string" || !uid)  return badRequestResponse();
  if (!isValidEmail(email))             return badRequestResponse();

  // ── Auth — must come from the freshly-signed-up user themselves ─────────────
  const decoded = await verifyBearer(req);
  if (!decoded)                          return unauthorizedResponse();
  if (decoded.uid !== uid || decoded.email !== email) return forbiddenResponse();

  const safeName = escapeHtml(typeof name === "string" ? name.slice(0, 120) : "");

  try {
    const link = await adminAuth.generateEmailVerificationLink(email, {
      url: `${BASE}/auth/action`,
    });

    await resend.emails.send({
      from:    FROM,
      to:      email,
      subject: sanitizeHeader("Confirmez votre adresse email — BioInteraction"),
      html:    `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px 24px">
          <img src="${BASE}/images/icon-color.svg" width="44" alt="BioInteraction" style="margin-bottom:24px"/>
          <h2 style="color:#1B1F1D;font-size:22px;margin:0 0 12px">Bonjour ${safeName},</h2>
          <p style="color:#6E6E6E;line-height:1.7;margin:0 0 24px">
            Cliquez sur le bouton ci-dessous pour confirmer votre adresse e-mail
            et soumettre votre demande d'accès à BioInteraction.
          </p>
          <a href="${link}"
             style="display:inline-block;padding:12px 28px;background:#29A864;color:#fff;
                    border-radius:10px;text-decoration:none;font-weight:600;font-size:15px">
            Confirmer mon adresse →
          </a>
          <p style="color:#C4C7C5;font-size:12px;margin-top:32px">
            Si vous n'avez pas créé de compte, ignorez cet email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Don't leak Firebase internals to the client
    console.error("[send-verification]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Impossible d'envoyer l'email." }, { status: 500 });
  }
}
