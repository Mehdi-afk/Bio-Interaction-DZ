"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import CatalogueClient from "@/src/components/catalogue/CatalogueClient";
import ReactifsLanding from "@/src/components/catalogue/ReactifsLanding";
import ReactifsSubcategoryLanding from "@/src/components/catalogue/ReactifsSubcategoryLanding";
import { REACTIFS } from "@/src/data/products-reactifs";
import type { GridItem, SectionLabel } from "@/src/data/products-reactifs";

const CATS = [
  { value: "biochimie",    label: "Biochimie Clinique" },
  { value: "hematologie",  label: "Hématologie" },
  { value: "hemostase",    label: "Hémostase" },
  { value: "urines",       label: "Analyse des Urines" },
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

// Returns sections (with product count) that contain at least one product matching `cat`
function getSectionsForCat(items: GridItem[], cat: string) {
  const result: { label: string; count: number }[] = [];
  let currentSection: string | null = null;
  let count = 0;

  for (const item of items) {
    if (item.kind === "section") {
      if (currentSection !== null && count > 0) result.push({ label: currentSection, count });
      currentSection = item.label;
      count = 0;
    } else if (item.cat === cat) {
      count++;
    }
  }
  if (currentSection !== null && count > 0) result.push({ label: currentSection, count });
  return result;
}

// Returns only items (section header + products) belonging to the given section label
function getItemsForSection(items: GridItem[], sectionLabel: string): GridItem[] {
  const result: GridItem[] = [];
  let inSection = false;

  for (const item of items) {
    if (item.kind === "section") {
      inSection = item.label === sectionLabel;
      if (inSection) result.push(item);
    } else if (inSection) {
      result.push(item);
    }
  }
  return result;
}

export default function ReactifsContent() {
  const searchParams = useSearchParams();
  const cat     = searchParams.get("cat");
  const section = searchParams.get("section");
  const marque  = searchParams.get("marque");
  const q       = searchParams.get("q");
  const all     = searchParams.get("all");

  // Always call hooks before any conditional return
  const sections = useMemo(() => cat ? getSectionsForCat(REACTIFS, cat) : [], [cat]);

  // ── 1. No cat and no "all" → category landing ──
  if (!cat && !all) return <ReactifsLanding />;

  // ── 2. "all" param → show full catalogue ──
  if (all) {
    return (
      <CatalogueClient
        items={REACTIFS}
        title="Tous les réactifs"
        cats={CATS}
        brands={BRANDS}
        showTypeFilter
        backHref="/catalogue/reactifs"
      />
    );
  }

  // ── 2. Compat redirect (marque or q present) → skip landing, show filtered catalogue ──
  if (marque || q) {
    return (
      <CatalogueClient
        items={REACTIFS}
        title="Réactifs compatibles"
        cats={CATS}
        brands={BRANDS}
        showTypeFilter
        backHref="/catalogue/reactifs"
      />
    );
  }

  // ── 3. Cat set, no section, multiple sections → sub-category landing ──
  if (!section && sections.length > 1) {
    return <ReactifsSubcategoryLanding cat={cat!} sections={sections} />;
  }

  // ── 4. Section set (or single section) → filtered catalogue ──
  const items = section ? getItemsForSection(REACTIFS, section) : REACTIFS;
  const backHref = sections.length > 1
    ? `/catalogue/reactifs?cat=${cat}`
    : `/catalogue/reactifs`;

  return (
    <CatalogueClient
      items={items}
      title="Nos Réactifs"
      cats={CATS}
      brands={BRANDS}
      showTypeFilter
      backHref={backHref}
      hideSidebar={!!section}
    />
  );
}
