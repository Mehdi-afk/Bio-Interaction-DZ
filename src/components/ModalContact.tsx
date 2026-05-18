"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/src/context/AppContext";

const labelCls = "text-[13px] font-medium text-[#6E6E6E]";
const inputCls = `
  w-full py-[9px] px-3 border border-[#E5E3DC] rounded-lg
  font-[inherit] text-[14px] text-[#1B1F1D] bg-white outline-none
  transition-[border-color] duration-150 focus:border-[#29A864]
`;

export default function ModalContact() {
  const { contactOpen, closeContact, showToast } = useApp();

  const [nom,       setNom]       = useState("");
  const [email,     setEmail]     = useState("");
  const [sujet,     setSujet]     = useState("");
  const [message,   setMessage]   = useState("");
  const [sending,   setSending]   = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeContact(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeContact]);

  useEffect(() => {
    if (!contactOpen) { setNom(""); setEmail(""); setSujet(""); setMessage(""); }
  }, [contactOpen]);

  if (!contactOpen) return null;

  async function handleSubmit() {
    if (!nom.trim() || !email.trim() || !message.trim()) {
      showToast("⚠️ Veuillez remplir les champs Nom, Email et Message.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, sujet, message }),
      });
      if (!res.ok) throw new Error("api_error");
      closeContact();
      showToast("✓ Message envoyé, nous vous répondrons bientôt !");
    } catch {
      showToast("⚠️ Erreur lors de l'envoi, veuillez réessayer.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center max-[600px]:items-end"
      style={{ background: "rgba(15,25,40,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) closeContact(); }}
    >
      <div className="
        bg-white rounded-2xl p-9 w-[520px] max-w-[95vw] max-h-[90vh] overflow-y-auto
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        max-[600px]:rounded-b-none max-[600px]:w-full max-[600px]:max-w-full max-[600px]:p-6 max-[600px]:max-h-[85vh]
      ">
        <h2 className="font-serif text-[24px] mb-1.5 max-[600px]:text-[20px]">Envoyer un message</h2>
        <p className="text-[#6E6E6E] text-[14px] mb-6">
          Une question ? Écrivez-nous, nous vous répondons rapidement.
        </p>

        <div className="flex flex-col gap-3.5">
          {/* Nom + Email */}
          <div className="grid grid-cols-2 gap-3 max-[480px]:grid-cols-1">
            <div className="flex flex-col gap-[5px]">
              <label className={labelCls}>Nom &amp; Prénom *</label>
              <input
                className={inputCls}
                type="text"
                placeholder="Votre nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label className={labelCls}>Email *</label>
              <input
                className={inputCls}
                type="email"
                placeholder="votre@email.dz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Sujet */}
          <div className="flex flex-col gap-[5px]">
            <label className={labelCls}>Sujet</label>
            <input
              className={inputCls}
              type="text"
              placeholder="Ex : Information sur un produit"
              value={sujet}
              onChange={(e) => setSujet(e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-[5px]">
            <label className={labelCls}>Message *</label>
            <textarea
              className={`${inputCls} resize-y min-h-[100px]`}
              placeholder="Décrivez votre demande…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2.5 mt-5">
          <button
            onClick={closeContact}
            disabled={sending}
            className="
              py-[9px] px-5 bg-transparent border border-[#E5E3DC] rounded-lg
              font-[inherit] text-[14px] text-[#6E6E6E] cursor-pointer
              transition-colors duration-150 hover:bg-[#F7F6F2] disabled:opacity-50
            "
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={sending}
            className="
              py-[9px] px-5 bg-[#29A864] text-white border-none rounded-[9px]
              font-[inherit] text-[14px] font-medium cursor-pointer
              transition-colors duration-150 hover:bg-[#48BC7E] disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {sending ? "Envoi…" : "Envoyer →"}
          </button>
        </div>
      </div>
    </div>
  );
}
