"use client";

import { useSearchParams } from "next/navigation";
import CatalogueClient from "@/src/components/catalogue/CatalogueClient";
import EquipementsLanding from "@/src/components/catalogue/EquipementsLanding";
import EquipementsCatBanner from "@/src/components/catalogue/EquipementsCatBanner";
import { EQUIPEMENTS } from "@/src/data/products-equip";

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

export default function EquipementsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");
  const all = searchParams.get("all");

  if (!cat && !all) return <EquipementsLanding />;

  const catLabel = CATS.find((c) => c.value === cat)?.label;

  return (
    <CatalogueClient
      items={EQUIPEMENTS}
      title={all ? "Tous les équipements" : (catLabel ?? "Équipements")}
      cats={CATS}
      brands={BRANDS}
      backHref="/catalogue/equipements"
      defaultView="grid"
      hideSidebar={!!cat}
      hideSectionLabels={!!cat}
      catBanner={cat ? <EquipementsCatBanner cat={cat} /> : undefined}
    />
  );
}
