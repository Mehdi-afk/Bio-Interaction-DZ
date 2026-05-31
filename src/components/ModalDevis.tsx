"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/src/context/AppContext";
import { useAuth } from "@/src/context/AuthContext";

// ── Shared field styles ────────────────────────────────────────────────────────

const labelCls = "text-[13px] font-medium text-[#6E6E6E]";
const inputCls = `
  w-full py-[9px] px-3 border border-[#E5E3DC] rounded-lg
  font-[inherit] text-[14px] text-[#1B1F1D] bg-white outline-none
  transition-[border-color] duration-150
  focus:border-[#29A864]
`;

// ── Component ──────────────────────────────────────────────────────────────────

export default function ModalDevis() {
  const router = useRouter();
  const {
    devisOpen, closeDevis,
    cart, clearCart, removeFromCart,
    clientInfo, updateClientInfo,
    showToast,
  } = useApp();
  const { user, loading: authLoading } = useAuth();

  const [sending, setSending] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDevis(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeDevis]);

  // Pré-remplit Nom / Email depuis Firebase la 1ère fois que la modale s'ouvre pour un utilisateur connecté.
  const prefilledFor = useRef<string | null>(null);
  useEffect(() => {
    if (!devisOpen || !user || prefilledFor.current === user.uid) return;
    const patch: Partial<typeof clientInfo> = {};
    if (!clientInfo.nom.trim()   && user.displayName) patch.nom   = user.displayName;
    if (!clientInfo.email.trim() && user.email)       patch.email = user.email;
    if (Object.keys(patch).length > 0) updateClientInfo(patch);
    prefilledFor.current = user.uid;
  }, [devisOpen, user, clientInfo.nom, clientInfo.email, updateClientInfo]);

  if (!devisOpen) return null;

  const cartEmpty = cart.length === 0;

  async function handleAction() {
    const nom   = clientInfo.nom.trim();
    const email = clientInfo.email.trim();
    if (!nom || !email) {
      showToast("⚠️ Veuillez remplir au minimum Nom et Email.");
      return;
    }
    if (cartEmpty) {
      closeDevis();
      router.push("/catalogue/equipements");
      showToast("✓ Coordonnées enregistrées — choisissez vos produits dans Nos Produit !");
    } else {
      if (!user) {
        showToast("⚠️ Connexion requise pour envoyer un devis.");
        return;
      }
      setSending(true);
      let ok = false;
      try {
        const idToken = await user.getIdToken();
        const res = await fetch("/api/send-devis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ ...clientInfo, products: cart }),
        });
        ok = res.ok;
        if (!ok) {
          showToast("⚠️ L'envoi a échoué, veuillez réessayer.");
        } else {
          showToast("✓ Devis envoyé ! Nous vous répondons sous 24h.");
        }
      } catch {
        showToast("⚠️ Erreur lors de l'envoi, réessayez.");
      } finally {
        setSending(false);
        if (ok) {
          clearCart();
          closeDevis();
        }
      }
    }
  }

  // Auth check — bloque tant que Firebase n'a pas résolu l'état, puis si non connecté
  if (authLoading) {
    return (
      <div
        className="fixed inset-0 z-[2000] flex items-center justify-center"
        style={{ background: "rgba(15,25,40,0.55)", backdropFilter: "blur(4px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) closeDevis(); }}
      >
        <div className="bg-white rounded-2xl px-8 py-6 flex items-center gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <span className="inline-block w-4 h-4 border-2 border-[#E5E3DC] border-t-[#29A864] rounded-full animate-spin" />
          <span className="text-[14px] text-[#6E6E6E]">Chargement…</span>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div
        className="fixed inset-0 z-[2000] flex items-center justify-center max-[600px]:items-end"
        style={{ background: "rgba(15,25,40,0.55)", backdropFilter: "blur(4px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) closeDevis(); }}
      >
        <div className="
          bg-white rounded-2xl p-9 w-[420px] max-w-[95vw]
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          max-[600px]:rounded-b-none max-[600px]:w-full max-[600px]:max-w-full max-[600px]:p-6
        ">
          {/* Icône cadenas */}
          <div className="w-14 h-14 rounded-2xl bg-[#EDF8F1] flex items-center justify-center text-[#29A864] mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="font-serif text-[22px] mb-2">Connexion requise</h2>
          <p className="text-[#6E6E6E] text-[14px] leading-[1.65] mb-7">
            Pour soumettre une demande de devis, vous devez être connecté à votre compte.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { closeDevis(); router.push("/auth/login"); }}
              className="
                w-full py-[10px] px-6 bg-[#29A864] text-white border-none rounded-[9px]
                text-[15px] font-medium cursor-pointer
                transition-colors duration-150 hover:bg-[#48BC7E]
              "
            >
              Se connecter →
            </button>
            <button
              onClick={() => { closeDevis(); router.push("/auth/signup"); }}
              className="
                w-full py-[10px] px-6 bg-transparent text-[#1B1F1D]
                border border-[#E5E3DC] rounded-[9px]
                text-[15px] font-medium cursor-pointer
                transition-colors duration-150 hover:bg-[#F7F6F2]
              "
            >
              Créer un compte
            </button>
            <button
              onClick={closeDevis}
              className="text-[13px] text-[#6E6E6E] underline-offset-2 hover:underline cursor-pointer bg-transparent border-none mt-1"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center max-[600px]:items-end"
      style={{ background: "rgba(15,25,40,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) closeDevis(); }}
    >
      <div className="
        bg-white rounded-2xl p-9 w-[520px] max-w-[95vw] max-h-[90vh] overflow-y-auto
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        max-[600px]:rounded-b-none max-[600px]:w-full max-[600px]:max-w-full max-[600px]:p-6 max-[600px]:max-h-[85vh]
      ">
        {/* Header */}
        <h2 className="font-serif text-[24px] mb-1.5 max-[600px]:text-[20px]">Demande de devis</h2>
        <p className="text-[#6E6E6E] text-[14px] mb-6">
          Indiquez vos coordonnées et les produits souhaités. Nous vous répondons sous 24h.
        </p>

        {/* Form */}
        <div className="flex flex-col gap-3.5">
          {/* Organisme */}
          <div className="flex flex-col gap-[5px]">
            <label className={labelCls}>Organisme / Société</label>
            <input
              className={inputCls}
              type="text"
              placeholder="Ex : Laboratoire Central d'Alger"
              value={clientInfo.organisme}
              onChange={(e) => updateClientInfo({ organisme: e.target.value })}
            />
          </div>

          {/* Nom + Téléphone */}
          <div className="grid grid-cols-2 gap-3 max-[480px]:grid-cols-1">
            <div className="flex flex-col gap-[5px]">
              <label className={labelCls}>Nom &amp; Prénom</label>
              <input
                className={inputCls}
                type="text"
                placeholder="Votre nom"
                value={clientInfo.nom}
                onChange={(e) => updateClientInfo({ nom: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label className={labelCls}>Téléphone</label>
              <input
                className={inputCls}
                type="tel"
                placeholder="+213 …"
                value={clientInfo.tel}
                onChange={(e) => updateClientInfo({ tel: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-[5px]">
            <label className={labelCls}>Email</label>
            <input
              className={inputCls}
              type="email"
              placeholder="votre@email.dz"
              value={clientInfo.email}
              onChange={(e) => updateClientInfo({ email: e.target.value })}
            />
          </div>

          {/* Cart list */}
          <div className="mt-2">
            <div className="mb-3">
              {cartEmpty ? (
                <p className="text-[13px] text-[#6E6E6E] m-0 mb-2">
                  🛒 Aucun produit sélectionné.
                </p>
              ) : (
                <div className="flex flex-col gap-1.5 mb-3">
                  {cart.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 py-2 px-3 bg-[#F7F6F2] rounded-lg text-[13px]"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block truncate">{item.name}</span>
                        <small className="text-[#6E6E6E] mt-0.5 block">Réf. {item.ref}</small>
                      </div>
                      <button
                        onClick={() => removeFromCart(i)}
                        className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[#A9ADAA] bg-transparent border-none cursor-pointer hover:bg-[#E5E3DC] hover:text-[#1B1F1D] transition-colors duration-[120ms]"
                        title="Retirer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action button */}
            <button
              onClick={handleAction}
              disabled={sending}
              className="
                w-full flex items-center justify-center py-[10px] px-6
                bg-[#29A864] text-white border-none rounded-[9px]
                text-[15px] font-medium cursor-pointer
                transition-colors duration-150 hover:bg-[#48BC7E]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {sending ? "Envoi en cours…" : cartEmpty ? "Choisir les produits →" : "Envoyer le devis →"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-5">
          <button
            onClick={closeDevis}
            className="
              py-[9px] px-5 bg-transparent border border-[#E5E3DC] rounded-lg
              font-[inherit] text-[14px] text-[#6E6E6E] cursor-pointer
              transition-colors duration-150 hover:bg-[#F7F6F2]
            "
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
