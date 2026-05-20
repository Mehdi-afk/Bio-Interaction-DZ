"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const params = useSearchParams();
  const email  = params.get("email") ?? "";

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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h1 className="font-serif text-[22px] text-[#1B1F1D] mb-2">Vérifiez votre email</h1>
          <p className="text-[13px] text-[#6E6E6E] leading-[1.7] mb-2">
            Un lien de vérification a été envoyé à
          </p>
          {email && (
            <p className="text-[14px] font-medium text-[#1B1F1D] mb-4">{email}</p>
          )}
          <p className="text-[13px] text-[#6E6E6E] leading-[1.7] mb-6">
            Cliquez sur le lien dans l&apos;email pour confirmer votre adresse,
            puis connectez-vous.
          </p>

          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center w-full py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium no-underline hover:bg-[#48BC7E] transition-colors duration-150"
          >
            Se connecter
          </Link>
        </div>

        <p className="text-center text-[12px] text-[#C4C7C5] mt-6">
          <Link href="/" className="hover:text-[#29A864] transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
