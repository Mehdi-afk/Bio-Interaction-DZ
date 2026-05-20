"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function AuthGateModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[950] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl px-8 py-10 shadow-2xl max-w-[400px] w-full text-center border border-[#E5E3DC]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#A9ADAA] hover:bg-[#F7F6F2] hover:text-[#1B1F1D] transition-colors text-[20px] leading-none border-none bg-transparent cursor-pointer"
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="flex justify-center mb-5">
          <Image src="/images/icon-color.svg" width={44} height={44} alt="BioInteraction" />
        </div>

        <h2 className="font-serif text-[22px] text-[#1B1F1D] mb-2">Accédez au blog</h2>
        <p className="text-[13px] text-[#6E6E6E] leading-[1.7] mb-7">
          Connectez-vous ou créez un compte pour lire nos articles et rester informé des dernières actualités.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center w-full py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium no-underline hover:bg-[#48BC7E] transition-colors duration-150"
          >
            Se connecter
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center w-full py-2.5 bg-white text-[#1B1F1D] border border-[#E5E3DC] rounded-xl text-[14px] font-medium no-underline hover:bg-[#F7F6F2] transition-colors duration-150"
          >
            Créer un compte
          </Link>
        </div>

        <button
          onClick={onClose}
          className="mt-5 text-[12px] text-[#A9ADAA] hover:text-[#6E6E6E] transition-colors border-none bg-transparent cursor-pointer"
        >
          Continuer sans connexion →
        </button>
      </div>
    </div>
  );
}
