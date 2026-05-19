import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "BioInteraction <no-reply@biointeractiondz.com>";

export async function POST(req: NextRequest) {
  const { email, name, action } = (await req.json()) as {
    email:  string;
    name:   string;
    action: "approved" | "rejected";
  };

  if (!email || !action) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  const subject =
    action === "approved"
      ? "Votre compte BioInteraction a été approuvé"
      : "Mise à jour concernant votre compte BioInteraction";

  const html =
    action === "approved"
      ? `<p>Bonjour ${name},</p>
         <p>Votre compte BioInteraction a été <strong>approuvé</strong>. Vous pouvez désormais vous connecter.</p>
         <p><a href="https://biointeractiondz.com/auth/login">Se connecter →</a></p>
         <p>Cordialement,<br/>L'équipe BioInteraction</p>`
      : `<p>Bonjour ${name},</p>
         <p>Votre demande de compte BioInteraction n'a pas pu être approuvée. Pour toute question, contactez-nous à <a href="mailto:contact@biointeractiondz.com">contact@biointeractiondz.com</a>.</p>
         <p>Cordialement,<br/>L'équipe BioInteraction</p>`;

  try {
    await resend.emails.send({ from: FROM, to: email, subject, html });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Échec d'envoi de l'email." }, { status: 500 });
  }
}
