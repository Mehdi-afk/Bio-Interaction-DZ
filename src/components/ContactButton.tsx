"use client";

import { useApp } from "@/src/context/AppContext";

export default function ContactButton({
  label = "Nous contacter",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { openContact } = useApp();
  return (
    <button onClick={openContact} className={className}>
      {label}
    </button>
  );
}
