"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SHOWCASE = [
  {
    cat: "biochimie",
    label: "Biochimie Clinique",
    desc: "Jusqu'à 1 000 tests/heure avec réactifs à tag RFID.",
    image: "/images/equipements/ERBA XL 1000.webp",
  },
  {
    cat: "hematologie",
    label: "Hématologie",
    desc: "Formule sanguine complète en moins de 60 secondes.",
    image: "/images/equipements/ERBA H580.jpg",
  },
  {
    cat: "hemostase",
    label: "Hémostase",
    desc: "TP, TCA, fibrinogène par coagulométrie optique.",
    image: "/images/equipements/ERBA ECL 760.jpg",
  },
  {
    cat: "urines",
    label: "Analyse des Urines",
    desc: "Chimie sèche et sédiment urinaire automatisé.",
    image: "/images/equipements/ERBA EC 90.jpg",
  },
  {
    cat: "autoimmunite",
    label: "Auto-Immunité",
    desc: "Immunofluorescence digitalisée AKLIDES®.",
    image: "/images/equipements/AKIRON NEO.png",
  },
] as const;

export default function PinnedShowcase() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;

    function update() {
      const section     = sectionRef.current;
      const track       = trackRef.current;
      const progressBar = progressRef.current;
      const counter     = counterRef.current;
      if (!section || !track) return;

      const rect           = section.getBoundingClientRect();
      const sectionHeight  = section.offsetHeight;
      const windowHeight   = window.innerHeight;
      const totalScroll    = sectionHeight - windowHeight;
      if (totalScroll <= 0) return;

      const scrolled = Math.max(0, Math.min(totalScroll, -rect.top));
      const progress = scrolled / totalScroll;

      const trackWidth   = track.scrollWidth;
      const visibleWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - visibleWidth + 80);

      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;

      if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

      if (counter) {
        const idx = Math.min(SHOWCASE.length, Math.floor(progress * SHOWCASE.length) + 1);
        counter.textContent = String(idx).padStart(2, "0");
      }
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] overflow-hidden hidden min-[900px]:block"
      style={{ height: "340vh" }}
      aria-label="Showcase analyseurs"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

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
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(41,168,100,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Heading — top centered */}
        <div className="absolute top-[9vh] left-0 right-0 z-10 px-6 max-w-[800px] mx-auto text-center">
          <span className="inline-block text-[11px] font-semibold tracking-[0.7px] uppercase text-[#29A864] mb-3">
            Nos analyseurs
          </span>
          <h2
            className="font-serif text-white leading-[1.08]"
            style={{ fontSize: "clamp(30px, 4.5vw, 58px)" }}
          >
            Une gamme pour chaque{" "}
            <em className="text-[#29A864] not-italic">spécialité</em>.
          </h2>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-7 pl-[8vw] pr-[40vw] will-change-transform"
        >
          {SHOWCASE.map(({ cat, label, desc, image }, i) => (
            <Link
              key={cat}
              href={`/catalogue/equipements?cat=${cat}`}
              className="shrink-0 w-[440px] no-underline group block"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 mb-5">
                <span className="absolute top-5 left-5 z-10 text-white/30 text-[10px] font-mono tracking-[1.5px]">
                  {String(i + 1).padStart(2, "0")} / 05
                </span>
                <Image
                  src={image}
                  alt={label}
                  fill
                  sizes="440px"
                  className="object-contain p-14 transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-1 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white text-[19px] font-semibold mb-1.5 leading-tight">
                    {label}
                  </h3>
                  <p className="text-white/45 text-[13px] leading-[1.55] max-w-[330px]">
                    {desc}
                  </p>
                </div>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-1.5 text-white/30 shrink-0 group-hover:text-[#29A864] group-hover:translate-x-1 transition-all">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom bar: counter + progress + cue */}
        <div className="absolute bottom-[6vh] left-0 right-0 px-[8vw] flex items-center gap-6">
          <span className="text-white/40 text-[12px] font-mono tracking-[1.5px]">
            <span ref={counterRef}>01</span>
            <span className="text-white/15"> / 05</span>
          </span>
          <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-[#29A864] origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span className="text-white/30 text-[10px] font-semibold tracking-[1.5px] uppercase whitespace-nowrap">
            Défilez ↓
          </span>
        </div>
      </div>
    </section>
  );
}
