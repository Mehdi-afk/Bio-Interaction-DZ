"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/src/context/AppContext";
import { useAuth } from "@/src/context/AuthContext";

const CATALOGUE_LINKS = [
  {
    href: "/catalogue/equipements",
    label: "Équipements",
    desc: "20 analyseurs haute performance",
    mobileIcon: "🔭",
    subcategories: [
      { href: "/catalogue/equipements?cat=biochimie",    label: "Biochimie Clinique" },
      { href: "/catalogue/equipements?cat=hematologie",  label: "Hématologie" },
      { href: "/catalogue/equipements?cat=hemostase",    label: "Hémostase" },
      { href: "/catalogue/equipements?cat=urines",       label: "Analyse des Urines" },
      { href: "/catalogue/equipements?cat=autoimmunite", label: "Auto-Immunité / Allergie" },
    ],
  },
  {
    href: "/catalogue/reactifs",
    label: "Réactifs",
    desc: "353+ références disponibles",
    mobileIcon: "⚗️",
    subcategories: [
      { href: "/catalogue/reactifs?cat=biochimie",     label: "Biochimie Clinique" },
      { href: "/catalogue/reactifs?cat=hematologie",   label: "Hématologie" },
      { href: "/catalogue/reactifs?cat=hemostase",     label: "Hémostase" },
      { href: "/catalogue/reactifs?cat=urines",        label: "Analyse des Urines" },
      { href: "/catalogue/reactifs?cat=autoimmunite",  label: "Auto-Immunité" },
      { href: "/catalogue/reactifs?cat=allergie",      label: "Allergie" },
      { href: "/catalogue/reactifs?cat=parasitologie", label: "Parasitologie & Mycologie" },
    ],
  },
];

const NAV_LINKS = [
  { href: "/", label: "Accueil", mobileIcon: "🏠" },
  { href: "/blog", label: "Blog", mobileIcon: "📝" },
  { href: "/partenaires", label: "Partenaires", mobileIcon: "🤝" },
  { href: "/a-propos", label: "À propos", mobileIcon: "ℹ️" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const pathname  = usePathname();
  const router    = useRouter();
  const burgerRef  = useRef<HTMLButtonElement>(null);
  const menuRef    = useRef<HTMLDivElement>(null);
  const dropTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { cart, openDevis } = useApp();
  const { user, loading: authLoading, isAdmin, logout } = useAuth();
  const cartCount = cart.length;
  const isCatalogueActive = pathname.startsWith("/catalogue");
  const isTransparent = pathname === "/" && !scrolled;

  // Scroll detection for transparent → opaque transition
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const navLinkCls = (href: string) => {
    const isActive = pathname === href;
    if (isTransparent) {
      return `flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] text-sm font-medium transition-all duration-150 no-underline ${
        isActive ? "text-white bg-white/15" : "text-white/75 hover:text-white hover:bg-white/10"
      }`;
    }
    return `flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] text-sm font-medium transition-all duration-150 no-underline ${
      isActive ? "text-[#29A864] bg-[#EDF8F1]" : "text-[#6E6E6E] hover:text-[#29A864] hover:bg-[#EDF8F1]"
    }`;
  };

  function openDrop() {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setDropOpen(true);
  }
  function closeDrop() {
    dropTimer.current = setTimeout(() => setDropOpen(false), 350);
  }

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
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[68px] grid grid-cols-[1fr_auto_1fr] items-center px-12 max-[1024px]:px-6 max-[600px]:px-4 border-b transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-white/[0.97] border-[#E5E3DC]"
        }`}
        style={{ backdropFilter: isTransparent ? "none" : "blur(10px)" }}
      >

        {/* Left: desktop nav links */}
        <div className="flex items-center">
          <ul className="hidden min-[900px]:flex items-center gap-1 list-none p-0 m-0">
            {/* Accueil */}
            <li>
              <Link href="/" className={navLinkCls("/")} onClick={() => handleNavClick("/")}>
                Accueil
              </Link>
            </li>

            {/* Produits dropdown */}
            <li className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] text-sm font-medium transition-all duration-150 cursor-pointer border-none bg-transparent ${
                  isTransparent
                    ? isCatalogueActive || dropOpen
                      ? "text-white bg-white/15"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                    : isCatalogueActive || dropOpen
                      ? "text-[#29A864] bg-[#EDF8F1]"
                      : "text-[#6E6E6E] hover:text-[#29A864] hover:bg-[#EDF8F1]"
                }`}
              >
                Produits
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} aria-hidden="true">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>
              {/* Mega-menu produits */}
              <div className={`absolute top-full left-0 pt-3 z-50 transition-all duration-200 ${dropOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1 pointer-events-none"}`}>
                <div
                  className="relative bg-[#1B1F1D] border border-[#29A864]/15 rounded-2xl py-6"
                  style={{
                    width: "620px",
                    boxShadow: "0 28px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(41,168,100,0.07)",
                  }}
                >
                  {/* Glow bas */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[460px] h-[90px] pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(41,168,100,0.14) 0%, transparent 70%)" }}
                    aria-hidden="true"
                  />

                  {/* En-tête */}
                  <div className="px-7 pb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[#29A864]/50">
                      Produits
                    </span>
                  </div>
                  <div className="h-px bg-[#29A864]/10 mx-6 mb-5" />

                  {/* Deux colonnes */}
                  <div className="grid grid-cols-2 px-3">
                    {CATALOGUE_LINKS.map(({ href, label, desc, subcategories }, idx) => (
                      <div
                        key={href}
                        className={`px-4 pb-2 ${idx === 0 ? "border-r border-[#29A864]/10" : ""}`}
                      >
                        {/* En-tête de catégorie */}
                        <Link
                          href={href}
                          className="group/cat block mb-4 no-underline"
                          onClick={() => { handleNavClick(href); setDropOpen(false); }}
                        >
                          <div
                            className={`text-[17px] font-semibold transition-colors duration-150 ${
                              pathname.startsWith(href)
                                ? "text-[#29A864]"
                                : "text-white group-hover/cat:text-[#29A864]"
                            }`}
                          >
                            {label}
                          </div>
                          <div className="text-[11px] text-white/35 mt-1">{desc}</div>
                        </Link>

                        {/* Sous-catégories */}
                        <div className="flex flex-col gap-0.5">
                          {subcategories.map(({ href: subHref, label: subLabel }) => (
                            <Link
                              key={subHref}
                              href={subHref}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] no-underline text-white/60 text-[13.5px] font-medium transition-all duration-150 hover:text-[#29A864] hover:bg-white/[0.05]"
                              onClick={() => setDropOpen(false)}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#29A864]/45 shrink-0"
                                aria-hidden="true"
                              />
                              {subLabel}
                            </Link>
                          ))}
                        </div>

                        {/* CTA "Voir tout" */}
                        <Link
                          href={href}
                          className="inline-flex items-center gap-1.5 mt-4 ml-3 text-[12px] font-semibold text-[#29A864]/60 hover:text-[#29A864] no-underline transition-colors duration-150"
                          onClick={() => { handleNavClick(href); setDropOpen(false); }}
                        >
                          Voir tout {label.toLowerCase()}
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3"
                            aria-hidden="true"
                          >
                            <path d="M4 2l4 4-4 4" />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Blog, Partenaires, À propos */}
            {NAV_LINKS.slice(1).map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={navLinkCls(href)} onClick={() => handleNavClick(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Logo */}
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
              <span className="text-[#29A864]">Bio</span><span className={`transition-colors duration-300 ${isTransparent ? "text-white" : "text-[#1B1F1D]"}`}>Interaction</span>
            </span>
            <span className="text-[13px] max-[600px]:text-[11px] text-[#29A864] tracking-[0.3px]">Algérie</span>
          </div>
        </Link>

        {/* Right: cart + auth + burger */}
        <div className="flex items-center justify-end gap-2">

          {/* Burger — visible ≤ 900px */}
          <button
            ref={burgerRef}
            onClick={(e) => { e.stopPropagation(); setMobileOpen((prev) => !prev); }}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className={`flex min-[900px]:hidden items-center justify-center w-10 h-10 shrink-0 bg-transparent rounded-lg cursor-pointer transition-all duration-300 ${
              isTransparent ? "border border-white/30 text-white" : "border border-[#E5E3DC] text-[#1B1F1D]"
            }`}
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
            className={`relative hidden min-[900px]:flex items-center justify-center w-10 h-10 shrink-0 rounded-[9px] cursor-pointer transition-all duration-300 hover:border-[#29A864] hover:text-[#29A864] ${
              isTransparent
                ? "bg-white/10 border border-white/20 text-white"
                : "bg-[#F7F6F2] border border-[#E5E3DC] text-[#6E6E6E]"
            }`}
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
              <div className="hidden min-[900px]:flex items-center gap-2.5">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`flex items-center justify-center w-9 h-9 rounded-[9px] transition-all duration-300 hover:border-[#29A864] hover:text-[#29A864] ${
                      isTransparent ? "bg-white/10 border border-white/20 text-white" : "bg-[#F7F6F2] border border-[#E5E3DC] text-[#6E6E6E]"
                    }`}
                    title="Administration"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </Link>
                )}
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[9px] no-underline transition-all duration-300 hover:border-[#29A864] ${
                    isTransparent ? "bg-white/10 border border-white/20" : "bg-[#F7F6F2] border border-[#E5E3DC]"
                  }`}
                >
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-[#29A864] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {initials}
                    </span>
                  )}
                  <span className={`text-[13px] font-medium max-w-[120px] truncate transition-colors duration-300 ${isTransparent ? "text-white" : "text-[#1B1F1D]"}`}>
                    {displayName}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Se déconnecter"
                  className={`flex items-center justify-center w-9 h-9 rounded-[9px] cursor-pointer transition-all duration-300 hover:border-[#B30C2F] hover:text-[#B30C2F] ${
                    isTransparent ? "bg-white/10 border border-white/20 text-white" : "bg-[#F7F6F2] border border-[#E5E3DC] text-[#6E6E6E]"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden min-[900px]:inline-flex items-center py-2 px-5 bg-[#29A864] text-white no-underline border-none rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#48BC7E]"
              >
                Connexion →
              </Link>
            )
          )}
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          ref={menuRef}
          className="fixed top-[68px] left-0 right-0 z-[999] flex flex-col gap-1 p-4 bg-white border-b border-[#E5E3DC] shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
        >
          {/* Accueil */}
          <Link
            href="/"
            className="block px-4 py-3 rounded-lg text-[#1B1F1D] text-[15px] font-medium no-underline transition-colors duration-[120ms] hover:bg-[#F7F6F2] hover:text-[#29A864]"
            onClick={() => handleNavClick("/")}
          >
            🏠 Accueil
          </Link>

          {/* Catalogue group */}
          <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#A9ADAA]">
            Catalogue
          </div>
          {CATALOGUE_LINKS.map(({ href, label, mobileIcon }) => (
            <Link
              key={href}
              href={href}
              className="block pl-7 pr-4 py-2.5 rounded-lg text-[#1B1F1D] text-[15px] font-medium no-underline transition-colors duration-[120ms] hover:bg-[#F7F6F2] hover:text-[#29A864]"
              onClick={() => handleNavClick(href)}
            >
              {mobileIcon} {label}
            </Link>
          ))}

          {/* Reste des liens */}
          {NAV_LINKS.slice(1).map(({ href, label, mobileIcon }) => (
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
