import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { AppProvider } from "@/src/context/AppContext";
import { AuthProvider } from "@/src/context/AuthContext";
import ModalDevis from "@/src/components/ModalDevis";
import ModalContact from "@/src/components/ModalContact";
import Toast from "@/src/components/Toast";
import BackToTop from "@/src/components/BackToTop";
import RevealObserver from "@/src/components/RevealObserver";
import SmartGuide from "@/src/components/SmartGuide";

// ── Polices ───────────────────────────────────────────────────────────────────
// Originale : Google CDN  ?family=DM+Sans:wght@300;400;500;600;700&family=Geist:wght@400;500;600
// Next.js auto-héberge les fichiers woff2 au build — plus de requête CDN externe.

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-serif",
  display: "swap",
});

// ── Métadonnées globales ──────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://biointeractiondz.com"),

  title: {
    default: "bioInteraction — Réactifs & Équipements de Laboratoire",
    // Chaque page peut surcharger : export const metadata = { title: "Catalogue" }
    // → rendu : "Catalogue | bioInteraction"
    template: "%s | bioInteraction",
  },

  description:
    "Distribution spécialisée en réactifs et équipements de laboratoire " +
    "pour les établissements de santé algériens. " +
    "ERBA, Generic Assays, HOB Biotech, LDBIO Diagnostics.",

  openGraph: {
    siteName: "bioInteraction",
    title: "bioInteraction — Réactifs & Équipements de Laboratoire",
    description:
      "Votre partenaire de confiance pour l'approvisionnement en réactifs " +
      "analytiques et équipements de précision depuis 2016.",
    locale: "fr_DZ",
    type: "website",
    // og:image — à remplacer par une bannière réelle (1200×630 px) dans /public/og-image.png
    images: [{ url: "/icon-color.svg", width: 240, height: 240, alt: "bioInteraction" }],
  },

  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-color.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// ── Layout racine ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${geist.variable} h-full`}
    >
      {/*
        font-sans → DM Sans (via --font-dm-sans, défini dans globals.css @theme)
        font-serif → Geist (via --font-dm-serif, titres h1/h2, logo)
        bg-white  → #FFFFFF  (--bg du projet original)
        text-[#1B1F1D] → couleur de texte principale (--text du projet original)
      */}
      <body className="min-h-full flex flex-col antialiased font-sans bg-white text-[#1B1F1D]">
        <AuthProvider>
        <AppProvider>
          <Navbar />

          {/*
            pt-[68px] : compense la Navbar fixed (height: var(--nav-h) = 68px).
            flex-1    : pousse le Footer en bas même sur les pages courtes.
          */}
          <main className="flex-1 pt-[68px]">
            {children}
          </main>

          <Footer />

          {/* Global overlays */}
          <ModalDevis />
          <ModalContact />
          <Toast />
          <BackToTop />
          <RevealObserver />
          <SmartGuide />
        </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
