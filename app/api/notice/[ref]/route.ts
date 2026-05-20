import { NextRequest, NextResponse } from "next/server";
import { FICHES_MEDIPAN } from "@/src/data/fiches-medipan";

const MEDIPAN_BASE = "https://www.medipan.de/?sdm_process_download=1&download_id=";
const PASSWORD     = "0815";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;
  const fiche   = FICHES_MEDIPAN[ref];

  if (!fiche) {
    return NextResponse.json({ error: "Notice non disponible" }, { status: 404 });
  }

  try {
    const body = new URLSearchParams({ pass_text: PASSWORD, download_id: fiche.dlId });
    const upstream = await fetch(`${MEDIPAN_BASE}${fiche.dlId}`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer":      "https://www.medipan.de/sdm_categories/ifu/",
      },
      body: body.toString(),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "Erreur source" }, { status: 502 });
    }

    const pdf = await upstream.arrayBuffer();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${ref}_${fiche.langue}.pdf"`,
        "Cache-Control":       "public, max-age=86400", // cache 24h
      },
    });
  } catch {
    return NextResponse.json({ error: "Erreur réseau" }, { status: 502 });
  }
}
