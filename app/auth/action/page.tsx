"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/src/lib/firebase";
import Link from "next/link";
import Image from "next/image";

function ActionContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const mode    = params.get("mode");
    const oobCode = params.get("oobCode");

    if (mode !== "verifyEmail" || !oobCode) {
      setStatus("error");
      setMessage("Lien invalide ou expiré.");
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        setStatus("success");
        // Redirect to login after 3s
        setTimeout(() => router.push("/auth/login"), 3000);
      })
      .catch((e) => {
        setStatus("error");
        const code = (e as { code?: string }).code ?? "";
        if (code === "auth/invalid-action-code" || code === "auth/expired-action-code") {
          setMessage("Ce lien a expiré ou a déjà été utilisé.");
        } else {
          setMessage("Une erreur est survenue. Réessayez depuis la page de connexion.");
        }
      });
  }, [params, router]);

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12 bg-[#FAFAF8]">
      <div className="w-full max-w-[420px]">
        <div className="flex justify-center mb-8">
          <Link href="/"><Image src="/images/icon-color.svg" width={52} height={52} alt="BioInteraction" /></Link>
        </div>
        <div className="bg-white border border-[#E5E3DC] rounded-2xl px-8 py-9 shadow-[0_2px_16px_rgba(0,0,0,0.06)] text-center">

          {status === "loading" && (
            <>
              <div className="w-14 h-14 bg-[#EDF8F1] rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse">
                <svg viewBox="0 0 24 24" fill="none" stroke="#29A864" strokeWidth={2} strokeLinecap="round" className="w-7 h-7">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <p className="text-[14px] text-[#6E6E6E]">Vérification en cours…</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-14 h-14 bg-[#EDF8F1] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#29A864" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h1 className="font-serif text-[22px] text-[#1B1F1D] mb-2">Email confirmé !</h1>
              <p className="text-[13px] text-[#6E6E6E] leading-[1.7] mb-6">
                Votre adresse a été vérifiée. Votre demande d&apos;accès est maintenant
                soumise à l&apos;administrateur. Vous serez notifié par email lors de son approbation.
              </p>
              <p className="text-[12px] text-[#A9ADAA]">Redirection vers la connexion…</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-14 h-14 bg-[#F8E8EC] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#B30C2F" strokeWidth={2} strokeLinecap="round" className="w-7 h-7">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h1 className="font-serif text-[22px] text-[#1B1F1D] mb-2">Lien invalide</h1>
              <p className="text-[13px] text-[#6E6E6E] leading-[1.7] mb-6">{message}</p>
              <Link href="/auth/login" className="inline-flex items-center justify-center w-full py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium no-underline hover:bg-[#48BC7E] transition-colors">
                Retour à la connexion
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default function ActionPage() {
  return <Suspense><ActionContent /></Suspense>;
}
