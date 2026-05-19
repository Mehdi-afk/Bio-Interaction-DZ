"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/src/context/AppContext";

// ── Shared field styles ────────────────────────────────────────────────────────

const labelCls = "text-[13px] font-medium text-[#6E6E6E]";
const inputCls = `
  w-full py-[9px] px-3 border border-[#E5E3DC] rounded-lg
  font-[inherit] text-[14px] text-[#1B1F1D] bg-white outline-none
  transition-[border-color] duration-150
  focus:border-[#29A864]
`;

// ── XLSX download ──────────────────────────────────────────────────────────────

async function downloadDevisXlsx(fields: {
  organisme: string; nom: string; tel: string; email: string;
}, products: { name: string; ref: string }[]) {
  const XLSX = await import("xlsx");
  const now  = new Date();
  const pad  = (n: number) => String(n).padStart(2, "0");
  const dateStr  = now.toLocaleDateString("fr-DZ");
  const heureStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const produits = products.map((p) => `${p.name} (Réf. ${p.ref})`).join("\n");

  const data = [
    ["Champ", "Valeur"],
    ["Date de la demande", dateStr],
    ["Heure", heureStr],
    ["Organisme / Société", fields.organisme],
    ["Nom & Prénom", fields.nom],
    ["Téléphone", fields.tel],
    ["Email", fields.email],
    ["Produits / Références souhaités", produits],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = [{ wch: 32 }, { wch: 55 }];
  XLSX.utils.book_append_sheet(wb, ws, "Devis");

  const fileName =
    `Devis_bioInteraction_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
    `_${pad(now.getHours())}${pad(now.getMinutes())}.xlsx`;

  XLSX.writeFile(wb, fileName);
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function ModalDevis() {
  const router = useRouter();
  const {
    devisOpen, closeDevis,
    cart, clearCart, removeFromCart,
    clientInfo, updateClientInfo, hasClientInfo,
    showToast,
  } = useApp();

  const [sending, setSending] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDevis(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeDevis]);

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
      setSending(true);
      try {
        // Send email + download XLSX in parallel
        const [emailRes] = await Promise.all([
          fetch("/api/send-devis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...clientInfo, products: cart }),
          }),
          downloadDevisXlsx(clientInfo, cart),
        ]);
        if (!emailRes.ok) {
          showToast("⚠️ Fiche téléchargée, mais l'envoi email a échoué.");
        } else {
          showToast("✓ Devis téléchargé et envoyé !");
        }
      } catch {
        showToast("⚠️ Erreur lors de l'envoi, réessayez.");
      } finally {
        setSending(false);
        clearCart();
        closeDevis();
      }
    }
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
