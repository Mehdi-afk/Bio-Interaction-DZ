import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/src/lib/resend";
import {
  escapeHtml, sanitizeHeader, isValidEmail,
  isSameOrigin, rateLimit, rateLimitResponse,
  requireAdmin, forbiddenResponse, badRequestResponse,
} from "@/src/lib/api-security";

const FROM  = "BioInteraction <noreply@biointeractiondz.com>";

const VALID_ACTIONS = new Set(["approved", "rejected", "new_signup"]);

export async function POST(req: NextRequest) {
  const resend = getResend();
  const ADMIN  = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

  // ── CSRF gate ──────────────────────────────────────────────────────────────
  if (!isSameOrigin(req)) return badRequestResponse("Origine non autorisée.");

  // ── Rate limit (per IP) ────────────────────────────────────────────────────
  const limit = rateLimit(req, "admin-notify", { capacity: 10, refillPerMin: 2 });
  if (!limit.ok) return rateLimitResponse(limit.retryAfter);

  // ── Parse ──────────────────────────────────────────────────────────────────
  let body: unknown;
  try { body = await req.json(); } catch { return badRequestResponse(); }

  const { email, name, action } = (body ?? {}) as {
    email?: unknown; name?: unknown; action?: unknown;
  };

  if (typeof action !== "string" || !VALID_ACTIONS.has(action)) {
    return badRequestResponse("Action invalide.");
  }
  if (!isValidEmail(email)) return badRequestResponse("Email invalide.");

  const safeName  = escapeHtml(typeof name === "string" ? name.slice(0, 120) : "");
  const safeEmail = escapeHtml(email);

  // ── Auth ───────────────────────────────────────────────────────────────────
  // `new_signup` is triggered from the signup flow by the freshly-created user,
  // so we only require a valid Firebase token whose email matches the payload.
  // All other actions (approved/rejected) are admin-only.
  if (action === "new_signup") {
    const { verifyBearer, unauthorizedResponse } = await import("@/src/lib/api-security");
    const decoded = await verifyBearer(req);
    if (!decoded) return unauthorizedResponse();
    if (decoded.email !== email) return forbiddenResponse();

    try {
      await resend.emails.send({
        from:    FROM,
        to:      ADMIN,
        subject: sanitizeHeader(`Nouvelle demande de compte — ${safeName}`),
        html:    `<p>Une nouvelle demande de compte a été soumise :</p>
                  <ul>
                    <li><strong>Nom :</strong> ${safeName}</li>
                    <li><strong>Email :</strong> ${safeEmail}</li>
                  </ul>
                  <p><a href="https://biointeractiondz.com/admin">Voir les demandes en attente →</a></p>`,
      });
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Échec d'envoi de l'email." }, { status: 500 });
    }
  }

  // approved / rejected → admin only
  const decoded = await requireAdmin(req);
  if (!decoded) return forbiddenResponse();

  const subject =
    action === "approved"
      ? "Votre compte BioInteraction a été approuvé"
      : "Mise à jour concernant votre compte BioInteraction";

  const html =
    action === "approved"
      ? `<p>Bonjour ${safeName},</p>
         <p>Votre compte BioInteraction a été <strong>approuvé</strong>. Vous pouvez désormais vous connecter.</p>
         <p><a href="https://biointeractiondz.com/auth/login">Se connecter →</a></p>
         <p>Cordialement,<br/>L'équipe BioInteraction</p>`
      : `<p>Bonjour ${safeName},</p>
         <p>Votre demande de compte BioInteraction n'a pas pu être approuvée. Pour toute question, contactez-nous à <a href="mailto:contact@biointeractiondz.com">contact@biointeractiondz.com</a>.</p>
         <p>Cordialement,<br/>L'équipe BioInteraction</p>`;

  try {
    await resend.emails.send({ from: FROM, to: email, subject: sanitizeHeader(subject), html });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Échec d'envoi de l'email." }, { status: 500 });
  }
}
