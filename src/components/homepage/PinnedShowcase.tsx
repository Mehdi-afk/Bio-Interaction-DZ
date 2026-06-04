"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type PinnedItem = {
  key:   string;
  href:  string;
  label: string;
  desc:  string;
  image: string;
};

type Props = {
  badge: string;
  title: ReactNode;
  desc?:  string;
  cta?:  { label: string; href: string };
  items: readonly PinnedItem[];
  /** Tailwind shorthand for section bg, e.g. "bg-[#0A0A0A]" (default). */
  bg?:   string;
};

export default function PinnedShowcase({ badge, title, desc, cta, items, bg = "bg-[#0A0A0A]" }: Props) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);

  const total = items.length;

  useEffect(() => {
    let rafId          = 0;
    let targetProgress = 0;
    let smoothProgress = 0;
    let lastCounterIdx = -1;
    const LERP = 0.11; // smoothing — lower = smoother & laggier, higher = snappier

    function computeTarget() {
      const section = sectionRef.current;
      if (!section) return;
      const rect          = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight  = window.innerHeight;
      const totalScroll   = sectionHeight - windowHeight;
      if (totalScroll <= 0) { targetProgress = 0; return; }
      const scrolled = Math.max(0, Math.min(totalScroll, -rect.top));
      targetProgress = scrolled / totalScroll;
    }

    function apply() {
      const track       = trackRef.current;
      const progressBar = progressRef.current;
      const counter     = counterRef.current;
      if (!track) return;

      const trackWidth   = track.scrollWidth;
      const visibleWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - visibleWidth + 80);

      track.style.transform = `translate3d(${-smoothProgress * maxTranslate}px, 0, 0)`;

      if (progressBar) progressBar.style.transform = `scaleX(${smoothProgress})`;

      if (counter) {
        const idx = Math.min(total, Math.floor(smoothProgress * total) + 1);
        if (idx !== lastCounterIdx) {
          counter.textContent = String(idx).padStart(2, "0");
          lastCounterIdx = idx;
        }
      }
    }

    function tick() {
      const diff = targetProgress - smoothProgress;
      if (Math.abs(diff) < 0.0002) {
        smoothProgress = targetProgress;
        apply();
        rafId = 0;
        return;
      }
      smoothProgress += diff * LERP;
      apply();
      rafId = requestAnimationFrame(tick);
    }

    function onScroll() {
      computeTarget();
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    // Snap on mount so we don't animate from 0 if the section is already mid-scroll
    computeTarget();
    smoothProgress = targetProgress;
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  // Scroll duration scales with item count (≈ 70vh per extra card beyond the first)
  const sectionHeight = `${100 + Math.max(0, total - 1) * 60}vh`;
  const totalLabel    = String(total).padStart(2, "0");

  return (
    <>
      {/* ── Mobile / tablet fallback: scroll-snap carousel (< 900px) ── */}
      <section
        className={`relative ${bg} min-[900px]:hidden py-16 max-[600px]:py-12 overflow-hidden`}
        aria-label={badge}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative px-6 max-[480px]:px-4 mb-8 max-w-[700px] mx-auto text-center">
          <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
            {badge}
          </span>
          <h2
            className="font-serif text-white leading-[1.1] text-balance mb-4"
            style={{ fontSize: "clamp(26px, 5.5vw, 42px)" }}
          >
            {title}
          </h2>
          {desc && (
            <p className="text-white/50 leading-[1.7]" style={{ fontSize: "clamp(13px, 3.5vw, 15px)" }}>
              {desc}
            </p>
          )}
        </div>

        <div
          className="relative flex gap-4 overflow-x-auto snap-x snap-mandatory pb-5 px-6 max-[480px]:px-4 max-[480px]:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map(({ key, href, label, desc, image }, i) => (
            <Link
              key={`m-${key}`}
              href={href}
              className="shrink-0 w-[78vw] max-w-[340px] snap-start no-underline group block"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 mb-4">
                <span className="absolute top-4 left-4 z-10 text-white/30 text-[10px] font-mono tracking-[1.5px]">
                  {String(i + 1).padStart(2, "0")} / {totalLabel}
                </span>
                <Image
                  src={image}
                  alt={label}
                  fill
                  sizes="(max-width: 480px) 78vw, 340px"
                  className="object-contain p-10"
                />
              </div>
              <div className="px-1">
                <h3 className="text-white text-[17px] font-semibold mb-1 leading-tight">
                  {label}
                </h3>
                <p className="text-white/45 text-[13px] leading-[1.55]">
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative mt-4 flex items-center justify-center gap-5 flex-wrap">
          <span className="flex items-center gap-2 text-white/30 text-[10px] font-semibold tracking-[1.5px] uppercase">
            Faites glisser
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M3 10h14M12 5l5 5-5 5"/>
            </svg>
          </span>
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#29A864] no-underline hover:underline"
            >
              {cta.label}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          )}
        </div>
      </section>

      {/* ── Desktop pinned scroll (≥ 900px) ───────────────────────── */}
      <section
        ref={sectionRef}
        className={`relative ${bg} hidden min-[900px]:block`}
        style={{ height: sectionHeight }}
        aria-label={badge}
      >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial accent */}
        <div
          className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(41,168,100,0.08) 0%, transparent 70%)" }}
        />

        {/* Heading — in flow (shrink-0) so it never overlaps the track */}
        <div className="relative z-10 shrink-0 px-6 max-w-[800px] w-full mx-auto text-center pt-[5vh] pb-3">
          <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-4">
            {badge}
          </span>
          <h2
            className="font-serif text-white leading-[1.08] text-balance mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            {title}
          </h2>
          {desc && (
            <p
              className="text-white/50 leading-[1.75] mx-auto max-w-[480px]"
              style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}
            >
              {desc}
            </p>
          )}
        </div>

        {/* Track — flex-1 + items-center so cards fill & center in remaining height */}
        <div className="relative flex-1 flex items-center min-h-0 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-7 pl-[8vw] pr-[40vw] will-change-transform"
          >
            {items.map(({ key, href, label, desc, image }, i) => (
              <Link
                key={key}
                href={href}
                className="shrink-0 w-[min(440px,38vh)] no-underline group block"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 mb-5">
                  <span className="absolute top-5 left-5 z-10 text-white/30 text-[10px] font-mono tracking-[1.5px]">
                    {String(i + 1).padStart(2, "0")} / {totalLabel}
                  </span>
                  <Image
                    src={image}
                    alt={label}
                    fill
                    sizes="(max-height: 800px) 38vh, 440px"
                    className="object-contain p-10 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-1 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white text-[17px] font-semibold mb-1.5 leading-tight">
                      {label}
                    </h3>
                    <p className="text-white/45 text-[13px] leading-[1.55] max-w-[300px]">
                      {desc}
                    </p>
                  </div>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-1 text-white/30 shrink-0 group-hover:text-[#29A864] group-hover:translate-x-1 transition-all">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar — shrink-0 so it stays at bottom */}
        <div className="relative shrink-0 px-[8vw] pb-[5vh] pt-3 flex items-center gap-6">
          <span className="text-white/40 text-[12px] font-mono tracking-[1.5px]">
            <span ref={counterRef}>01</span>
            <span className="text-white/15"> / {totalLabel}</span>
          </span>
          <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-[#29A864] origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          {cta ? (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1.5 text-white/40 text-[11px] font-semibold tracking-[1.5px] uppercase whitespace-nowrap no-underline transition-colors hover:text-[#29A864]"
            >
              {cta.label}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          ) : (
            <span className="text-white/30 text-[10px] font-semibold tracking-[1.5px] uppercase whitespace-nowrap">
              Défilez ↓
            </span>
          )}
        </div>
      </div>
      </section>
    </>
  );
}
