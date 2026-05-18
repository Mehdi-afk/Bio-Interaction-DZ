import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogueClient from "@/src/components/catalogue/CatalogueClient";
import { REACTIFS } from "@/src/data/products-reactifs";

export const metadata: Metadata = {
  title: "Catalogue Réactifs",
  description:
    "353 références de réactifs analytiques — biochimie, hématologie, hémostase, " +
    "auto-immunité, allergie, parasitologie. ERBA, Generic Assays, HOB Biotech, LDBIO.",
};

const CATS = [
  { value: "biochimie",    label: "Biochimie Clinique" },
  { value: "hematologie",  label: "Hématologie" },
  { value: "hemostase",    label: "Hémostase" },
  { value: "urines",       label: "Analyse des Urines" },
  { value: "elisa",        label: "Chaîne ELISA" },
  { value: "autoimmunite", label: "Auto-Immunité" },
  { value: "allergie",     label: "Allergie" },
  { value: "parasitologie",label: "Parasitologie & Mycologie" },
];

const BRANDS = [
  { value: "ERBA",          label: "ERBA — Europe" },
  { value: "Generic Assays",label: "Generic Assays / Medipan" },
  { value: "HOB Biotech",   label: "HOB Biotech" },
  { value: "LDBIO",         label: "LDBIO Diagnostics" },
];

export default function ReactifsPage() {
  return (
    <Suspense>
      <CatalogueClient
        items={REACTIFS}
        title="Catalogue"
        cats={CATS}
        brands={BRANDS}
        showTypeFilter
      />
    </Suspense>
  );
}
