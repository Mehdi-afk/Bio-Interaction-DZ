import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = "messaoudenemehdi8@gmail.com";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { organisme, nom, tel, email, products } = await req.json() as {
    organisme: string;
    nom: string;
    tel: string;
    email: string;
    products: { name: string; ref: string }[];
  };

  if (!nom || !email) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const productRows = products
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #E5E3DC;">${p.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #E5E3DC;color:#6E6E6E;">Réf. ${p.ref}</td>
        </tr>`
    )
    .join("");

  const { error } = await resend.emails.send({
    from: "bioInteraction <onboarding@resend.dev>",
    to: RECIPIENT,
    replyTo: email,
    subject: `[bioInteraction] Demande de devis — ${organisme || nom}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1B1F1D;">
        <div style="background:#29A864;padding:20px 24px;border-radius:10px 10px 0 0;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Nouvelle demande de devis</h1>
        </div>
        <div style="border:1px solid #E5E3DC;border-top:none;padding:24px;border-radius:0 0 10px 10px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
            <tr><td style="padding:8px 0;color:#6E6E6E;width:140px;">Organisme</td><td style="padding:8px 0;font-weight:600;">${organisme || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Nom</td><td style="padding:8px 0;font-weight:600;">${nom}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Téléphone</td><td style="padding:8px 0;">${tel || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6E6E6E;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#29A864;">${email}</a></td></tr>
          </table>

          ${
            products.length > 0
              ? `<p style="font-size:12px;color:#6E6E6E;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin:0 0 8px;">Produits souhaités (${products.length})</p>
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
