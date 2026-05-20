"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/src/context/AppContext";
import { useAuth } from "@/src/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Accueil", mobileIcon: "🏠" },
  { href: "/catalogue/equipements", label: "Équipements", mobileIcon: "🔭" },
  { href: "/catalogue/reactifs", label: "Réactifs", mobileIcon: "⚗️" },
  { href: "/blog", label: "Blog", mobileIcon: "📝" },
  { href: "/a-propos", label: "À propos", mobileIcon: "ℹ️" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname  = usePathname();
  const router    = useRouter();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef   = useRef<HTMLDivElement>(null);
  const { cart, openDevis } = useApp();
  const { user, loading: authLoading, isAdmin, logout } = useAuth();
  const cartCount = cart.length;

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node;
      if (burgerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setMobileOpen(false);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinkCls = (href: string) =>
    `flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] text-sm font-medium transition-all duration-150 no-underline ${
      pathname === href
        ? "text-[#29A864] bg-[#EDF8F1]"
        : "text-[#6E6E6E] hover:text-[#29A864] hover:bg-[#EDF8F1]"
    }`;

  function handleNavClick(href: string) {
    if (pathname.startsWith(href === "/" ? href : href.split("?")[0]) && href !== "/") {
      window.dispatchEvent(new Event("nav:closePanel"));
    }
  }

  async function handleLogout() {
    await logout();
    setMobileOpen(false);
    router.push("/");
  }

  // Initiales pour l'avatar
  const initials = user?.displayName
    ? user.displayName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  const displayName = user?.displayName ?? user?.email ?? "";

  return (
    <>
      {/* ── Main bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-[68px] flex items-center px-12 max-[1024px]:px-6 max-[600px]:px-4 bg-white/[0.97] [backdrop-filter:blur(10px)] border-b border-[#E5E3DC]">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 no-underline"
          style={{ fontFamily: "var(--font-dm-serif, 'Geist', sans-serif)" }}
        >
          <Image
            src="/images/icon-color.svg"
            width={44}
            height={44}
            alt="BioInteraction"
            className="w-11 h-11 max-[600px]:w-[30px] max-[600px]:h-[30px]"
          />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[22px] max-[600px]:text-lg">
              <span className="text-[#29A864]">Bio</span><span className="text-[#1B1F1D]">Interaction</span>
            </span>
            <span className="text-[13px] max-[600px]:text-[11px] text-[#29A864] tracking-[0.3px]">Algérie</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden min-[900px]:flex items-center gap-1 ml-10 list-none p-0 m-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={navLinkCls(href)} onClick={() => handleNavClick(href)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Burger — visible ≤ 900px */}
        <button
          ref={burgerRef}
          onClick={(e) => { e.stopPropagation(); setMobileOpen((prev) => !prev); }}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          className="flex min-[900px]:hidden items-center justify-center w-10 h-10 shrink-0 bg-transparent border border-[#E5E3DC] rounded-lg cursor-pointer text-[#1B1F1D]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Cart icon button — hidden ≤ 900px */}
        <button
          onClick={openDevis}
          aria-label="Mon panier"
          title="Mon panier"
          className="relative hidden min-[900px]:flex items-center justify-center w-10 h-10 shrink-0 mr-2.5 bg-[#F7F6F2] border border-[#E5E3DC] rounded-[9px] cursor-pointer text-[#6E6E6E] transition-all duration-150 hover:border-[#29A864] hover:text-[#29A864]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-[5px] -right-[5px] flex items-center justify-center w-[17px] h-[17px] rounded-full bg-[#29A864] text-white text-[10px] font-bold leading-none border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* Auth zone — desktop */}
        {!authLoading && (
          user ? (
            /* Logged in: avatar + name + logout */
            <div className="hidden min-[900px]:flex items-center gap-2.5">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center justify-center w-9 h-9 bg-[#F7F6F2] border border-[#E5E3DC] rounded-[9px] text-[#6E6E6E] transition-all duration-150 hover:border-[#29A864] hover:text-[#29A864]"
                  title="Administration"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </Link>
              )}
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 bg-[#F7F6F2] border border-[#E5E3DC] rounded-[9px] no-underline transition-all duration-150 hover:border-[#29A864]"
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-[#29A864] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {initials}
                  </span>
                )}
                <span className="text-[13px] font-medium text-[#1B1F1D] max-w-[120px] truncate">
                  {displayName}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                title="Se déconnecter"
                className="flex items-center justify-center w-9 h-9 bg-[#F7F6F2] border border-[#E5E3DC] rounded-[9px] cursor-pointer text-[#6E6E6E] transition-all duration-150 hover:border-[#B30C2F] hover:text-[#B30C2F]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          ) : (
            /* Not logged in: "Connexion" button */
            <Link
              href="/auth/login"
              className="hidden min-[900px]:inline-flex items-center py-2 px-5 bg-[#29A864] text-white no-underline border-none rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#48BC7E]"
            >
              Connexion →
            </Link>
          )
        )}
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          ref={menuRef}
          className="fixed top-[68px] left-0 right-0 z-[999] flex flex-col gap-1 p-4 bg-white border-b border-[#E5E3DC] shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
        >
          {NAV_LINKS.map(({ href, label, mobileIcon }) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-3 rounded-lg text-[#1B1F1D] text-[15px] font-medium no-underline transition-colors duration-[120ms] hover:bg-[#F7F6F2] hover:text-[#29A864]"
              onClick={() => handleNavClick(href)}
            >
              {mobileIcon} {label}
            </Link>
          ))}

          <div className="h-px bg-[#E5E3DC] my-1.5" />

          {user ? (
            <>
              <div className="px-4 py-2.5 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#29A864] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                  {initials}
                </span>
                <span className="text-[14px] font-medium text-[#1B1F1D] truncate">{displayName}</span>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-3 rounded-lg text-[#1B1F1D] text-[15px] font-medium no-underline transition-colors hover:bg-[#F7F6F2] hover:text-[#29A864]"
              >
                Mon profil
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block px-4 py-3 rounded-lg text-[#1B1F1D] text-[15px] font-medium no-underline transition-colors hover:bg-[#F7F6F2] hover:text-[#29A864]"
                >
                  Administration
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-3 text-left text-[15px] font-medium text-[#B30C2F] rounded-lg border-none bg-transparent cursor-pointer transition-colors hover:bg-[#F8E8EC]"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="block px-4 py-3 mt-1 bg-[#29A864] text-white text-[15px] font-medium rounded-[9px] text-center no-underline transition-colors hover:bg-[#48BC7E]"
            >
              Connexion →
            </Link>
          )}

          <div className="h-px bg-[#E5E3DC] my-1.5" />

          <button
            onClick={() => { setMobileOpen(false); openDevis(); }}
            className="px-4 py-3 bg-[#F7F6F2] text-[#1B1F1D] text-[15px] font-medium rounded-[9px] text-center border border-[#E5E3DC] cursor-pointer transition-colors hover:bg-[#EDF8F1] hover:text-[#29A864]"
          >
            🛒 Mon panier {cartCount > 0 ? `(${cartCount})` : ""}
          </button>
        </div>
      )}
    </>
  );
}
