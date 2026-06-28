"use client";

/**
 * DawnEnvironment — ONE continuous world behind the whole page.
 *
 * Replaces the old per-panel atmospheres + sticky cover/reveal. A single fixed,
 * full-viewport surface that evolves continuously with global scroll: the
 * cold→warm spine, the light advancing/drifting, all driven by CSS variables.
 *
 * Smoothness: the wheel delivers scroll in coarse chunks, so we do NOT drive
 * the world from raw scrollY. A persistent rAF loop eases a smoothed progress
 * toward the scroll target each frame (`cur += (target - cur) * EASE`), and the
 * world is rendered from that smoothed value — so it glides continuously even
 * when the input arrives stepped. The light's horizontal drift + rise ride a
 * single GPU-composited `translate3d` (no per-frame gradient-position repaint);
 * only the warmth hue repaints, and the eased follow makes it change in tiny
 * increments. The loop parks itself once settled and re-arms on scroll/resize.
 *
 * Built only from layered CSS gradients (color-mix for the continuous hue) +
 * transforms. No objects, no particles. Reduced-motion → no load bloom and the
 * follow snaps (no smoothing lag); the environment is user-driven, not autoplay.
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

    // Eased follow: snap instantly for reduced-motion, glide otherwise.
    const EASE = reduced ? 1 : 0.08;
    let target = 0; // scroll progress 0..1 (the input)
    let cur = 0; // smoothed progress (what we render)
    let raf = 0;
    let running = false;

    const readTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const render = (p: number) => {
      // Warmth hue (paint) — eased follow keeps the step tiny per frame.
      root.style.setProperty("--w", warmthAt(p).toFixed(4));
      // Camera drift + sun rise ride ONE composited transform (no repaint).
      root.style.setProperty("--lightx", `${(-20 * p).toFixed(2)}%`);
      root.style.setProperty("--lighty", `${(16 - 56 * p).toFixed(2)}%`);
    };

    const tick = () => {
      cur += (target - cur) * EASE;
      if (Math.abs(target - cur) < 0.0002) {
        cur = target;
        render(cur);
        running = false;
        raf = 0;
        return; // park until the next scroll/resize re-arms us
      }
      render(cur);
      raf = requestAnimationFrame(tick);
    };

    const arm = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      readTarget();
      arm();
    };
    const onResize = () => {
      readTarget();
      arm();
    };

    readTarget();
    cur = target; // first paint matches current scroll — no opening lurch
    render(cur);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--w": 0.28,
          "--lightx": "0%",
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

      {/* Continuous dawn light: drifts + rises with scroll (outer, composited),
          blooms once (inner). The outer transform is the ONLY thing that moves
          per frame — GPU-composited, no gradient-position repaint. */}
      <div
        className="absolute inset-0"
        style={{
          transform: "translate3d(var(--lightx), var(--lighty), 0)",
          willChange: "transform",
        }}
      >
        <div className={`absolute inset-0 ${reduced ? "" : "dawn-bloom"}`}>
          {/* Volumetric light plane — hue cold-blue↔warm-gold by --w */}
          <div
            className="absolute inset-0"
            style={{
              opacity: "calc(0.25 + var(--w) * 0.62)",
              background:
                "radial-gradient(74% 36% at 62% 74%, color-mix(in oklab, #ffd49c calc(var(--w) * 100%), #6f93cc) 0%, transparent 70%)",
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
