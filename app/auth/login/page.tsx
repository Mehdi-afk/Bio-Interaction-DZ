"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "PENDING") {
        router.push("/auth/pending");
        return;
      } else if (code === "REJECTED") {
        setError("Votre demande de compte a été refusée. Contactez-nous pour plus d'informations.");
      } else if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Email ou mot de passe incorrect.");
      } else if (code === "auth/too-many-requests") {
        setError("Trop de tentatives. Réessayez plus tard.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
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
          <h1 className="font-serif text-[26px] text-[#1B1F1D] mb-1">Connexion</h1>
          <p className="text-[13px] text-[#A9ADAA] mb-7">
            Pas encore de compte ?{" "}
            <Link href="/auth/signup" className="text-[#29A864] hover:underline font-medium">
              Créer un compte
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              {loading ? "Connexion…" : "Se connecter"}
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
