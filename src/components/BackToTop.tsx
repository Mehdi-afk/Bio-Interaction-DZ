"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const CATALOGUE_PATHS = ["/catalogue/reactifs", "/catalogue/equipements"];

export default function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isCatalogue = CATALOGUE_PATHS.includes(pathname);

  useEffect(() => {
    if (!isCatalogue) { setVisible(false); return; }
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCatalogue, pathname]);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut"
      className="
        fixed bottom-[76px] right-6 z-[2900]
        flex items-center justify-center w-11 h-11 rounded-full
        bg-[#29A864] text-white border-none
        shadow-[0_4px_20px_rgba(41,168,100,0.45)]
        cursor-pointer
        transition-[background,box-shadow] duration-150
        hover:bg-[#48BC7E] hover:shadow-[0_6px_24px_rgba(41,168,100,0.55)]
      "
    >
      <svg
        viewBox="0 0 20 20" fill="none" stroke="currentColor"
        strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
        className="w-5 h-5 animate-nudge-up"
        aria-hidden="true"
      >
        <path d="M10 15V5M5 10l5-5 5 5" />
      </svg>
    </button>
  );
}
