"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/src/context/AppContext";

const NAV_LINKS = [
  { href: "/", label: "Accueil", mobileIcon: "🏠" },
  { href: "/catalogue/equipements", label: "Équipements", mobileIcon: "🔭" },
  { href: "/catalogue/reactifs", label: "Réactifs", mobileIcon: "⚗️" },
  { href: "/a-propos", label: "À propos", mobileIcon: "ℹ️" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { cart, openDevis } = useApp();
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

  return (
    <>
      {/* ── Main bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-[68px] flex items-center px-12 max-[1024px]:px-6 max-[600px]:px-4 bg-white/[0.97] [backdrop-filter:blur(10px)] border-b border-[#E5E3DC]">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 text-[22px] max-[600px]:text-lg text-[#29A864] no-underline"
          style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', serif)" }}
        >
          <Image
            src="/images/icon-color.svg"
            width={44}
            height={44}
            alt="BioInteraction"
            className="w-11 h-11 max-[600px]:w-[30px] max-[600px]:h-[30px]"
          />
          BioInteraction
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden min-[900px]:flex items-center gap-1 ml-10 list-none p-0 m-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={navLinkCls(href)}>
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

        {/* "Mon panier" CTA — hidden ≤ 900px */}
        <button
          onClick={openDevis}
          className="hidden min-[900px]:inline-flex items-center py-2 px-5 bg-[#29A864] text-white border-none rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#48BC7E]"
        >
          Mon panier →
        </button>
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
            >
              {mobileIcon} {label}
            </Link>
          ))}

          <div className="h-px bg-[#E5E3DC] my-1.5" />

          <button
            onClick={() => { setMobileOpen(false); openDevis(); }}
            className="px-4 py-3 mt-2 bg-[#29A864] text-white text-[15px] font-medium rounded-[9px] text-center border-none cursor-pointer transition-colors duration-150 hover:bg-[#48BC7E]"
          >
            🛒 Mon panier {cartCount > 0 ? `(${cartCount})` : ""}
          </button>
        </div>
      )}
    </>
  );
}
