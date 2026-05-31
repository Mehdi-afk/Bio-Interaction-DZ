import type { Metadata } from "next";
import { Suspense } from "react";
import EquipementsContent from "@/src/components/catalogue/EquipementsContent";

export const metadata: Metadata = {
  title: "Nos Équipements",
  description:
    "20 instruments de précision — analyseurs biochimie, automates hématologie, " +
    "coagulomètres, analyseurs urines et chaînes ELISA. Marque ERBA, Generic Assays, HOB Biotech.",
};

export default function EquipementsPage() {
  return (
    <Suspense>
      <EquipementsContent />
    </Suspense>
  );
}
