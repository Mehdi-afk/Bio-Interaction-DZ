"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/src/lib/firebase";
import { useAuth } from "@/src/context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [phone,     setPhone]     = useState("");
  const [company,   setCompany]   = useState("");
  const [photoURL,  setPhotoURL]  = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile,    setPhotoFile]    = useState<File | null>(null);
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) { router.push("/auth/login"); return; }
    if (!user) return;

    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setFirstName(d.firstName ?? "");
        setLastName(d.lastName   ?? "");
        setPhone(d.phone         ?? "");
        setCompany(d.company     ?? "");
        setPhotoURL(d.photoURL   ?? user.photoURL ?? "");
      } else {
        const parts = (user.displayName ?? "").split(" ");
        setFirstName(parts[0] ?? "");
        setLastName(parts.slice(1).join(" "));
        setPhotoURL(user.photoURL ?? "");
      }
    });
  }, [user, loading, router]);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !auth.currentUser) return;
    setError("");
    setSaving(true);

    try {
      let newPhotoURL = photoURL;

      if (photoFile) {
        const storageRef = ref(storage, `profile-photos/${user.uid}`);
        await uploadBytes(storageRef, photoFile);
        newPhotoURL = await getDownloadURL(storageRef);
      }

      const fullName = `${firstName} ${lastName}`.trim();

      await updateProfile(auth.currentUser, {
        displayName: fullName || null,
        photoURL:    newPhotoURL || null,
      });

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        name:      fullName,
        phone,
        company,
        photoURL:  newPhotoURL,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      setPhotoURL(newPhotoURL);
      setPhotoFile(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !user) return null;

  const currentPhoto = photoPreview ?? (photoURL || null);
  const monogram = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  const initials = monogram || (user.email?.[0]?.toUpperCase() ?? "?");

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12 bg-[#FAFAF8]">
      <div className="w-full max-w-[480px]">

        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/images/icon-color.svg" width={52} height={52} alt="BioInteraction" />
          </Link>
        </div>

        <div className="bg-white border border-[#E5E3DC] rounded-2xl px-8 py-9 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <h1 className="font-serif text-[26px] text-[#1B1F1D] mb-1">Mon profil</h1>
          <p className="text-[13px] text-[#A9ADAA] mb-7">Gérez vos informations personnelles</p>

          {/* Photo de profil */}
          <div className="flex flex-col items-center mb-7">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative group w-20 h-20 rounded-full overflow-hidden bg-[#29A864] text-white text-[22px] font-bold flex items-center justify-center cursor-pointer border-2 border-[#E5E3DC] transition-all hover:border-[#29A864]"
            >
              {currentPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentPhoto} alt="Photo de profil" className="w-full h-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
              <span className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <p className="text-[12px] text-[#A9ADAA] mt-2">Cliquez pour changer la photo</p>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            {/* Prénom / Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                  className="w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-white outline-none placeholder:text-[#C4C7C5] focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Nom</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom de famille"
                  className="w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-white outline-none placeholder:text-[#C4C7C5] focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Numéro de téléphone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+213 ..."
                className="w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-white outline-none placeholder:text-[#C4C7C5] focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150"
              />
            </div>

            {/* Entreprise */}
            <div>
              <label className="block text-[13px] font-medium text-[#1B1F1D] mb-1.5">Entreprise / Établissement</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nom de votre structure"
                className="w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-white outline-none placeholder:text-[#C4C7C5] focus:border-[#29A864] focus:shadow-[0_0_0_3px_rgba(41,168,100,0.12)] transition-all duration-150"
              />
            </div>

            {/* Email (non modifiable) */}
            <div>
              <label className="block text-[13px] font-medium text-[#A9ADAA] mb-1.5">Adresse e-mail</label>
              <input
                type="email"
                value={user.email ?? ""}
                disabled
                className="w-full px-4 py-2.5 border border-[#E5E3DC] rounded-xl text-[14px] bg-[#F7F6F2] text-[#A9ADAA] outline-none cursor-not-allowed"
              />
            </div>

            {success && (
              <p className="text-[13px] text-[#29A864] bg-[#EDF8F1] px-3 py-2 rounded-lg">
                Profil mis à jour avec succès.
              </p>
            )}
            {error && (
              <p className="text-[13px] text-[#B30C2F] bg-[#F8E8EC] px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-1 w-full py-2.5 bg-[#29A864] text-white border-none rounded-xl text-[14px] font-medium cursor-pointer transition-[background-color,opacity] duration-150 hover:bg-[#48BC7E] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Enregistrement…" : "Enregistrer les modifications"}
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
