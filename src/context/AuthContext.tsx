"use client";

import {
  createContext, useContext, useEffect, useState, type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/src/lib/firebase";

type UserStatus = "pending" | "approved" | "rejected";

type AuthContextType = {
  user:     User | null;
  loading:  boolean;
  isAdmin:  boolean;
  login:    (email: string, password: string) => Promise<void>;
  signup:   (name: string, email: string, password: string) => Promise<void>;
  logout:   () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const isAdmin = !!user && !!ADMIN_EMAIL && user.email === ADMIN_EMAIL;

  async function login(email: string, password: string) {
    if (email === ADMIN_EMAIL) {
      await signInWithEmailAndPassword(auth, email, password);
      return;
    }

    const cred = await signInWithEmailAndPassword(auth, email, password);

    // 1. Email must be verified first
    if (!cred.user.emailVerified) {
      await signOut(auth);
      const e = new Error("Email non vérifié.") as Error & { code: string };
      e.code = "UNVERIFIED";
      throw e;
    }

    // 2. First login after verification → create pending doc + notify admin
    const userRef = doc(db, "users", cred.user.uid);
    const snap    = await getDoc(userRef);

    if (!snap.exists()) {
      const name = cred.user.displayName ?? cred.user.email ?? "";
      await setDoc(userRef, {
        uid:       cred.user.uid,
        name,
        email,
        status:    "pending" as UserStatus,
        createdAt: serverTimestamp(),
      });
      fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, action: "new_signup" }),
      }).catch(() => {});
      await signOut(auth);
      const e = new Error("Compte en attente de validation.") as Error & { code: string };
      e.code = "PENDING";
      throw e;
    }

    // 3. Check approval status
    const status = (snap.data() as { status: UserStatus }).status;

    if (status === "pending") {
      await signOut(auth);
      const e = new Error("Compte en attente de validation.") as Error & { code: string };
      e.code = "PENDING";
      throw e;
    }

    if (status === "rejected") {
      await signOut(auth);
      const e = new Error("Compte refusé.") as Error & { code: string };
      e.code = "REJECTED";
      throw e;
    }
  }

  async function signup(name: string, email: string, password: string) {
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });
    await sendEmailVerification(newUser);
    // Sign out immediately — user must verify email before proceeding
    await signOut(auth);
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}
