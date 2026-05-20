"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";

type UserDoc = {
  uid:       string;
  name:      string;
  email:     string;
  status:    "pending" | "approved" | "rejected";
  createdAt: { seconds: number } | null;
};

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  const [allUsers,   setAllUsers]   = useState<UserDoc[]>([]);
  const [fetching,   setFetching]   = useState(true);
  const [actionUid,  setActionUid]  = useState<string | null>(null);
  const [tab,        setTab]        = useState<"pending" | "all">("pending");
  const [error,      setError]      = useState("");

  const fetchUsers = useCallback(async () => {
    setFetching(true);
    setError("");
    try {
      const snap = await getDocs(collection(db, "users"));
      const docs = snap.docs.map((d) => d.data() as UserDoc);
      // Sort by createdAt descending client-side — avoids composite index requirement
      docs.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
      setAllUsers(docs);
    } catch (e) {
      setError("Erreur de chargement : " + (e as Error).message);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) router.replace("/");
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin, fetchUsers]);

  async function handleAction(uid: string, email: string, name: string, action: "approved" | "rejected") {
    setActionUid(uid);
    try {
      await updateDoc(doc(db, "users", uid), { status: action });
      fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, action }),
      }).catch(() => {});
      setAllUsers((prev) => prev.map((u) => u.uid === uid ? { ...u, status: action } : u));
    } catch (e) {
      setError("Erreur : " + (e as Error).message);
    } finally {
      setActionUid(null);
    }
  }

  if (loading || !user) return null;
  if (!isAdmin) return null;

  const displayed = tab === "pending"
    ? allUsers.filter((u) => u.status === "pending")
    : allUsers;

  const pendingCount = allUsers.filter((u) => u.status === "pending").length;

  const statusLabel: Record<string, { label: string; cls: string }> = {
    pending:  { label: "En attente", cls: "bg-[#FEF3CD] text-[#D97706]" },
    approved: { label: "Approuvé",   cls: "bg-[#EDF8F1] text-[#29A864]" },
    rejected: { label: "Refusé",     cls: "bg-[#F8E8EC] text-[#B30C2F]" },
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#FAFAF8] px-6 py-10 max-w-3xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[26px] text-[#1B1F1D]">Administration</h1>
          <p className="text-[13px] text-[#A9ADAA] mt-1">Gestion des comptes utilisateurs</p>
        </div>
        <Link href="/" className="text-[13px] text-[#6E6E6E] hover:text-[#29A864] transition-colors">
          ← Accueil
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("pending")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-medium border transition-colors ${
            tab === "pending"
              ? "bg-[#29A864] text-white border-[#29A864]"
              : "bg-white text-[#6E6E6E] border-[#E5E3DC] hover:border-[#29A864] hover:text-[#29A864]"
          }`}
        >
          En attente
          {pendingCount > 0 && (
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${tab === "pending" ? "bg-white/20" : "bg-[#FEF3CD] text-[#D97706]"}`}>
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("all")}
          className={`px-4 py-1.5 rounded-lg text-[13px] font-medium border transition-colors ${
            tab === "all"
              ? "bg-[#29A864] text-white border-[#29A864]"
              : "bg-white text-[#6E6E6E] border-[#E5E3DC] hover:border-[#29A864] hover:text-[#29A864]"
          }`}
        >
          Tous les comptes
        </button>
      </div>

      {error && (
        <p className="text-[13px] text-[#B30C2F] bg-[#F8E8EC] px-4 py-3 rounded-xl mb-4">{error}</p>
      )}

      {fetching ? (
        <p className="text-[14px] text-[#A9ADAA]">Chargement…</p>
      ) : displayed.length === 0 ? (
        <div className="bg-white border border-[#E5E3DC] rounded-2xl px-8 py-12 text-center">
          <p className="text-[14px] text-[#6E6E6E]">
            {tab === "pending" ? "Aucun compte en attente de validation." : "Aucun utilisateur trouvé."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map((u) => {
            const st = statusLabel[u.status];
            const busy = actionUid === u.uid;
            const date = u.createdAt
              ? new Date(u.createdAt.seconds * 1000).toLocaleDateString("fr-DZ", { day: "2-digit", month: "short", year: "numeric" })
              : "—";
            return (
              <div key={u.uid} className="bg-white border border-[#E5E3DC] rounded-xl px-5 py-4 flex items-center gap-4">

                <div className="w-9 h-9 rounded-full bg-[#EDF8F1] text-[#29A864] text-[13px] font-bold flex items-center justify-center shrink-0">
                  {u.name?.[0]?.toUpperCase() ?? "?"}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#1B1F1D] truncate">{u.name}</p>
                  <p className="text-[12px] text-[#A9ADAA] truncate">{u.email}</p>
                  <p className="text-[11px] text-[#C4C7C5] mt-0.5">{date}</p>
                </div>

                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${st.cls}`}>
                  {st.label}
                </span>

                {u.status === "pending" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      disabled={busy}
                      onClick={() => handleAction(u.uid, u.email, u.name, "approved")}
                      className="px-3 py-1.5 bg-[#29A864] text-white text-[12px] font-medium rounded-lg border-none cursor-pointer hover:bg-[#48BC7E] disabled:opacity-50 transition-colors"
                    >
                      {busy ? "…" : "Approuver"}
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => handleAction(u.uid, u.email, u.name, "rejected")}
                      className="px-3 py-1.5 bg-white text-[#B30C2F] text-[12px] font-medium rounded-lg border border-[#B30C2F] cursor-pointer hover:bg-[#F8E8EC] disabled:opacity-50 transition-colors"
                    >
                      {busy ? "…" : "Refuser"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
