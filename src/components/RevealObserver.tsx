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

    // ── Parallax with lerp smoothing ─────────────────────────
    const PARALLAX_LERP = 0.12;
    const state = new WeakMap<HTMLElement, { target: number; current: number }>();
    let parallaxRaf = 0;

    function computeParallaxTargets() {
      document.querySelectorAll<HTMLElement>(".parallax[data-speed]").forEach((el) => {
        const speed  = parseFloat(el.dataset.speed ?? "0.2");
        const parent = el.closest("section");
        if (!parent) return;
        const rect   = parent.getBoundingClientRect();
        const center = window.innerHeight / 2 - rect.top - rect.height / 2;
        const target = center * speed;
        const s = state.get(el);
        if (s) s.target = target;
        else state.set(el, { target, current: target });
      });
    }

    function parallaxTick() {
      let needsMore = false;
      document.querySelectorAll<HTMLElement>(".parallax[data-speed]").forEach((el) => {
        const s = state.get(el);
        if (!s) return;
        const diff = s.target - s.current;
        if (Math.abs(diff) < 0.05) {
          s.current = s.target;
        } else {
          s.current += diff * PARALLAX_LERP;
          needsMore = true;
        }
        el.style.transform = `translateY(${s.current}px)`;
      });
      parallaxRaf = needsMore ? requestAnimationFrame(parallaxTick) : 0;
    }

    function onParallaxScroll() {
      computeParallaxTargets();
      if (!parallaxRaf) parallaxRaf = requestAnimationFrame(parallaxTick);
    }
    computeParallaxTargets();
    window.addEventListener("scroll", onParallaxScroll, { passive: true });
    window.addEventListener("resize", onParallaxScroll);

    return () => {
      revealIO.disconnect();
      countIO.disconnect();
      mo.disconnect();
      cancelAnimationFrame(parallaxRaf);
      window.removeEventListener("scroll", onParallaxScroll);
      window.removeEventListener("resize", onParallaxScroll);
    };
  }, []);

  return null;
}
