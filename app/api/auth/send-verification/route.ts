import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { adminAuth } from "@/src/lib/firebase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "BioInteraction <noreply@biointeractiondz.com>";
const BASE   = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biointeractiondz.com";

export async function POST(req: NextRequest) {
  const { uid, email, name } = (await req.json()) as {
    uid:   string;
    email: string;
    name:  string;
  };

  if (!uid || !email) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  try {
    const link = await adminAuth.generateEmailVerificationLink(email, {
      url: `${BASE}/auth/action`,
    });

    await resend.emails.send({
      from:    FROM,
      to:      email,
      subject: "Confirmez votre adresse email — BioInteraction",
      html:    `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px 24px">
          <img src="${BASE}/images/icon-color.svg" width="44" alt="BioInteraction" style="margin-bottom:24px"/>
          <h2 style="color:#1B1F1D;font-size:22px;margin:0 0 12px">Bonjour ${name},</h2>
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
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[send-verification]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
