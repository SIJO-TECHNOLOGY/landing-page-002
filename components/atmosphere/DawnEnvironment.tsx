"use client";

/**
 * DawnEnvironment — ONE continuous world behind the whole page.
 *
 * Replaces the old per-panel atmospheres + sticky cover/reveal. A single fixed,
 * full-viewport surface that evolves continuously with global scroll: the
 * cold→warm spine, the light advancing/drifting, all driven by three CSS
 * variables updated in a rAF-throttled scroll handler (no React re-render, no
 * panel edges — you never see a seam). The first light blooms in once on load.
 *
 * Built only from layered CSS gradients (color-mix for the continuous hue) +
 * transforms. No objects, no particles. Reduced-motion → no load bloom; the
 * scroll-linked environment still responds (it's user-driven, not autoplay).
 */
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Warmth as a continuous function of scroll progress — the visible backbone:
// hero (warm-ish first light) → cold valley → steady climb to full dawn.
const WARMTH_KEYS: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0.28],
  [0.18, 0.0],
  [0.4, 0.5],
  [0.62, 0.72],
  [1.0, 1.0],
];

function warmthAt(p: number): number {
  for (let i = 0; i < WARMTH_KEYS.length - 1; i++) {
    const [a, va] = WARMTH_KEYS[i];
    const [b, vb] = WARMTH_KEYS[i + 1];
    if (p <= b) {
      const t = (p - a) / (b - a || 1);
      return va + (vb - va) * t;
    }
  }
  return WARMTH_KEYS[WARMTH_KEYS.length - 1][1];
}

export function DawnEnvironment() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--w", warmthAt(p).toFixed(3));
      root.style.setProperty("--sunx", (62 - 20 * p).toFixed(1)); // camera drifts
      root.style.setProperty("--lighty", `${(16 - 56 * p).toFixed(1)}%`); // sun rises
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--w": 0.28,
          "--sunx": 62,
          "--lighty": "16%",
        } as React.CSSProperties
      }
    >
      {/* Sky → ground (ground warms continuously via color-mix) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #03040a 0%, #04060d 44%, color-mix(in oklab, #1a1410 calc(var(--w) * 100%), #07090e) 100%)",
        }}
      />

      {/* Continuous dawn light: rises with scroll (outer), blooms once (inner) */}
      <div className="absolute inset-0" style={{ transform: "translateY(var(--lighty))" }}>
        <div className={`absolute inset-0 ${reduced ? "" : "dawn-bloom"}`}>
          {/* Volumetric light plane — hue cold-blue↔warm-gold by --w */}
          <div
            className="absolute inset-0"
            style={{
              opacity: "calc(0.25 + var(--w) * 0.62)",
              background:
                "radial-gradient(74% 36% at calc(var(--sunx) * 1%) 74%, color-mix(in oklab, #ffd49c calc(var(--w) * 100%), #6f93cc) 0%, transparent 70%)",
            }}
          />
          {/* Distant haze field */}
          <div
            className="absolute inset-x-0"
            style={{
              top: "53%",
              height: "18%",
              opacity: "calc(0.18 + var(--w) * 0.34)",
              background:
                "linear-gradient(180deg, transparent, color-mix(in oklab, #ffe0b0 calc(var(--w) * 100%), #7c9fd6) 60%, transparent)",
            }}
          />
          {/* Nearer haze field — denser */}
          <div
            className="absolute inset-x-0"
            style={{
              top: "64%",
              height: "17%",
              opacity: "calc(0.28 + var(--w) * 0.5)",
              background:
                "linear-gradient(180deg, transparent, color-mix(in oklab, #ffd9a0 calc(var(--w) * 100%), #6f93cc) 50%, transparent)",
            }}
          />
        </div>
      </div>

      {/* Cold uncertainty wash — only in the low-warmth valley */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "calc(max(0, 0.45 - var(--w)) * 1.7)",
          background:
            "linear-gradient(180deg, rgba(22,50,104,0.85) 0%, rgba(18,40,86,0.42) 55%, transparent 86%)",
        }}
      />

      {/* Foreground atmospheric density */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "42%",
          background:
            "linear-gradient(180deg, transparent, rgba(0,0,0,0.34) 100%)",
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 36%, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
