"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

export type CartItem = { name: string; ref: string };

export type ClientInfo = {
  organisme: string;
  nom: string;
  tel: string;
  email: string;
};

type AppContextType = {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;

  // Client info (persisted for devis form)
  clientInfo: ClientInfo;
  updateClientInfo: (patch: Partial<ClientInfo>) => void;
  hasClientInfo: () => boolean;

  // Toast
  toastMsg: string;
  showToast: (msg: string) => void;

  // Modals
  devisOpen: boolean;
  contactOpen: boolean;
  openDevis: () => void;
  openContact: () => void;
  closeDevis: () => void;
  closeContact: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    organisme: "", nom: "", tel: "", email: "",
  });
  const [toastMsg, setToastMsg] = useState("");
  const [devisOpen, setDevisOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Warn before leaving if cart has items
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (cart.length > 0) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [cart.length]);

  // Lock body scroll when a modal is open
  useEffect(() => {
    document.body.style.overflow = devisOpen || contactOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [devisOpen, contactOpen]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const updateClientInfo = useCallback((patch: Partial<ClientInfo>) => {
    setClientInfo((prev) => ({ ...prev, ...patch }));
  }, []);

  const hasClientInfo = useCallback(
    () => clientInfo.nom.trim() !== "" && clientInfo.email.trim() !== "",
    [clientInfo.nom, clientInfo.email]
  );

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 3500);
  }, []);

  const openDevis   = useCallback(() => { setContactOpen(false); setDevisOpen(true);   }, []);
  const openContact = useCallback(() => { setDevisOpen(false);   setContactOpen(true); }, []);
  const closeDevis   = useCallback(() => setDevisOpen(false),   []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart,
      clientInfo, updateClientInfo, hasClientInfo,
      toastMsg, showToast,
      devisOpen, contactOpen, openDevis, openContact, closeDevis, closeContact,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
