"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      await signup(name.trim(), email, password);
      setDone(true);
    } catch (err: unknown) {

      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/email-already-in-use") {
        setError("Cette adresse e-mail est déjà utilisée.");
      } else if (code === "auth/invalid-email") {
        setError("Adresse e-mail invalide.");
      } else if (code === "VERIFICATION_EMAIL_FAILED") {
        setDone(true); // account created, email may retry later
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12 bg-[#FAFAF8]">
        <div className="w-full max-w-[420px]">
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Image src="/images/icon-color.svg" width={52} height={52} alt="BioInteraction" />
            </Link>
          </div>
          <div className="bg-white border border-[#E5E3DC] rounded-2xl px-8 py-9 shadow-[0_2px_16px_rgba(0,0,0,0.06)] text-center">
            <div className="w-14 h-14 bg-[#EDF8F1] rounded-full flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#29A864" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-serif text-[22px] text-[#1B1F1D] mb-2">Vérifiez votre email</h2>
            <p className="text-[13px] text-[#6E6E6E] leading-[1.7] mb-6">
              Un email de vérification a été envoyé à <strong>{email}</strong>.
              Confirmez votre adresse, puis votre compte sera examiné par un administrateur
              avant activation.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center w-full py-2.5 bg-[#29A864] text-white rounded-xl text-[14px] font-medium no-underline hover:bg-[#48BC7E] transition-colors duration-150"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12 bg-[#FAFAF8]">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/images/icon-color.svg" width={52} height={52} alt="BioInteraction" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E3DC] rounded-2xl px-8 py-9 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <h1 className="font-serif text-[26px] text-[#1B1F1D] mb-1">Créer un compte</h1>
          <p className="text-[13px] text-[#A9ADAA] mb-7">
            Déjà inscrit ?{" "}
            <Link href="/auth/login" className="text-[#29A864] hover:underline font-medium">
              Se connecter
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                required
                className="
                  w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl
                  text-[14px] bg-white outline-none
                  placeholder:text-[#C4C7C5]
                  focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)]
                  transition-all duration-150
                "
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">
                Adresse e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                className="
                  w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl
                  text-[14px] bg-white outline-none
                  placeholder:text-[#C4C7C5]
                  focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)]
                  transition-all duration-150
                "
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6 caractères minimum"
                required
                className="
                  w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl
                  text-[14px] bg-white outline-none
                  placeholder:text-[#C4C7C5]
                  focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)]
                  transition-all duration-150
                "
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                className="
                  w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl
                  text-[14px] bg-white outline-none
                  placeholder:text-[#C4C7C5]
                  focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)]
                  transition-all duration-150
                "
              />
            </div>

            {error && (
              <p className="text-[13px] text-[#B30C2F] bg-[#F8E8EC] px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-1 w-full py-2.5 bg-[#29A864] text-white
                border-none rounded-xl text-[14px] font-medium cursor-pointer
                transition-[background-color,opacity] duration-150
                hover:bg-[#48BC7E] disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Création…" : "Créer mon compte"}
            </button>
          </form>
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
