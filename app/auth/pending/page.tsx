import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Compte en attente" };

export default function PendingPage() {
  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12 bg-[#FAFAF8]">
      <div className="w-full max-w-[420px]">

        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/images/icon-color.svg" width={52} height={52} alt="BioInteraction" />
          </Link>
        </div>

        <div className="bg-white border border-[#E5E3DC] rounded-2xl px-8 py-9 shadow-[0_2px_16px_rgba(0,0,0,0.06)] text-center">
          <div className="w-14 h-14 bg-[#FEF3CD] rounded-full flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="font-serif text-[22px] text-[#1B1F1D] mb-2">Compte en attente</h1>
          <p className="text-[13px] text-[#6E6E6E] leading-[1.7] mb-6">
            Votre compte est en cours de validation par un administrateur.
            Vous recevrez un e-mail dès que votre demande sera traitée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium no-underline hover:bg-[#48BC7E] transition-colors duration-150"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

      </div>
    </div>
  );
}
