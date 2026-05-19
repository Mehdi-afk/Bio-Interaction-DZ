import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "BioInteraction <noreply@biointeractiondz.com>";
const ADMIN  = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export async function POST(req: NextRequest) {
  const { email, name, action } = (await req.json()) as {
    email:  string;
    name:   string;
    action: "approved" | "rejected" | "new_signup";
  };

  if (!email || !action) {
    return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
  }

  // Notification to admin on new signup
  if (action === "new_signup") {
    try {
      await resend.emails.send({
        from:    FROM,
        to:      ADMIN,
        subject: `Nouvelle demande de compte — ${name}`,
        html:    `<p>Une nouvelle demande de compte a été soumise :</p>
                  <ul>
                    <li><strong>Nom :</strong> ${name}</li>
                    <li><strong>Email :</strong> ${email}</li>
                  </ul>
                  <p><a href="https://biointeractiondz.com/admin">Voir les demandes en attente →</a></p>`,
      });
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Échec d'envoi de l'email." }, { status: 500 });
    }
  }

  // Notification to user on approve/reject
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
