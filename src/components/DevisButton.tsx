"use client";

import { useApp } from "@/src/context/AppContext";

export default function DevisButton({
  label = "Demander un devis",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { openDevis } = useApp();
  return (
    <button onClick={openDevis} className={className}>
      {label}
    </button>
  );
}
