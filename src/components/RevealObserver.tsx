"use client";
import { useEffect } from "react";

const REVEAL_SEL = [
  ".reveal:not(.visible)",
  ".reveal-clip:not(.visible)",
  ".reveal-left:not(.visible)",
  ".reveal-right:not(.visible)",
  ".reveal-scale:not(.visible)",
].join(", ");

function animateCounter(el: HTMLElement) {
  if (el.dataset.counted) return;
  el.dataset.counted = "1";
  const target   = parseFloat(el.dataset.target ?? "0");
  const suffix   = el.dataset.suffix ?? "";
  const prefix   = el.dataset.prefix ?? "";
  const duration = 1600;
  const start    = performance.now();
  const isInt    = Number.isInteger(target);

  function step(now: number) {
    const p    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const cur  = target * ease;
    el.textContent = prefix + (isInt ? Math.round(cur) : cur.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function RevealObserver() {
  useEffect(() => {
    // ── Reveal observer ───────────────────────────────────────
    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("visible");
          revealIO.unobserve(entry.target);
          entry.target
            .querySelectorAll<HTMLElement>(".count-up:not([data-counted])")
            .forEach(animateCounter);
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -50px 0px" }
    );

    // ── Counter observer (standalone .count-up not inside a reveal) ──
    const countIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          countIO.unobserve(entry.target);
          animateCounter(entry.target as HTMLElement);
        }
      },
      { threshold: 0.4 }
    );

    function observe() {
      document.querySelectorAll(REVEAL_SEL).forEach((el) => revealIO.observe(el));
      document
        .querySelectorAll<HTMLElement>(".count-up:not([data-counted])")
        .forEach((el) => {
          if (!el.closest(".reveal, .reveal-clip, .reveal-left, .reveal-right, .reveal-scale")) {
            countIO.observe(el);
          }
        });
    }

    observe();

    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(observe);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // ── Parallax ──────────────────────────────────────────────
    function onScroll() {
      document
        .querySelectorAll<HTMLElement>(".parallax[data-speed]")
        .forEach((el) => {
          const speed  = parseFloat(el.dataset.speed ?? "0.2");
          const parent = el.closest("section");
          if (!parent) return;
          const rect   = parent.getBoundingClientRect();
          const center = window.innerHeight / 2 - rect.top - rect.height / 2;
          el.style.transform = `translateY(${center * speed}px)`;
        });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealIO.disconnect();
      countIO.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
