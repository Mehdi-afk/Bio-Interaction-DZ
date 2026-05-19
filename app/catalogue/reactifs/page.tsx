import type { Metadata } from "next";
import { Suspense } from "react";
import ReactifsContent from "@/src/components/catalogue/ReactifsContent";

export const metadata: Metadata = {
  title: "Nos Produit Réactifs",
  description:
    "353 références de réactifs analytiques — biochimie, hématologie, hémostase, " +
    "auto-immunité, allergie, parasitologie. ERBA, Generic Assays, HOB Biotech, LDBIO.",
};

export default function ReactifsPage() {
  return (
    <Suspense>
      <ReactifsContent />
    </Suspense>
  );
}
