import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT = "messaoudenemehdi8@gmail.com";

export async function POST(req: NextRequest) {
  const { nom, email, sujet, message } = await req.json();

  if (!nom || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "bioInteraction <onboarding@resend.dev>",
    to: RECIPIENT,
    replyTo: email,
    subject: `[bioInteraction] Message de ${nom} — ${sujet || "Sans sujet"}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1B1F1D;">
        <div style="background:#29A864;padding:20px 24px;border-radius:10px 10px 0 0;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Nouveau message de contact</h1>
        </div>
        <div style="border:1px solid #E5E3DC;border-top:none;padding:24px;border-radius:0 0 10px 10px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6E6E6E;width:130px;">Nom</td><td style="padding:8px 0;font-weight:600;">${nom}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#29A864;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Sujet</td><td style="padding:8px 0;">${sujet || "—"}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #E5E3DC;margin:16px 0;">
          <p style="color:#6E6E6E;font-size:12px;margin:0 0 8px;">Message :</p>
          <p style="white-space:pre-wrap;font-size:15px;line-height:1.7;margin:0;">${message}</p>
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
