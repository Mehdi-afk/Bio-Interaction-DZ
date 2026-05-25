import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogueClient from "@/src/components/catalogue/CatalogueClient";
import { EQUIPEMENTS } from "@/src/data/products-equip";

export const metadata: Metadata = {
  title: "Nos Équipements",
  description:
    "20 instruments de précision — analyseurs biochimie, automates hématologie, " +
    "coagulomètres, analyseurs urines et chaînes ELISA. Marque ERBA, Generic Assays, HOB Biotech.",
};

const CATS = [
  { value: "biochimie",    label: "Biochimie Clinique" },
  { value: "hematologie",  label: "Hématologie" },
  { value: "hemostase",    label: "Hémostase" },
  { value: "urines",       label: "Analyse des Urines" },
  { value: "autoimmunite", label: "Auto-Immunité" },
];

const BRANDS = [
  { value: "ERBA",          label: "ERBA — Europe" },
  { value: "Generic Assays",label: "Generic Assays / Medipan" },
  { value: "HOB Biotech",   label: "HOB Biotech" },
];

export default function EquipementsPage() {
  return (
    <Suspense>
      <CatalogueClient
        items={EQUIPEMENTS}
        title="Équipements"
        cats={CATS}
        brands={BRANDS}
      />
    </Suspense>
  );
}
