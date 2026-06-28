"use client";

/**
 * Atmosphere — the visual WORLD behind each panel (Sprint 2: quietly alive).
 *
 * Static layers from Sprint 1.7 (pure atmospheric abstraction — no objects),
 * now with TWO restrained motions and nothing else:
 *  - Cold open (hero only): the first light slowly blooms in on load.
 *  - Signature dawn: across page scroll the light drifts upward (the sun
 *    advancing through the journey).
 * Only the light/haze group moves; sky, cold wash, and vignette stay still.
 * Reduced-motion → fully static.
 */
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface AtmosphereProps {
  warmth?: number; // 0 cold/night → 1 warm dawn
  sunX?: number; // % horizontal position of the light plane
  coldOpen?: boolean; // hero load bloom
}

const HORIZON = 72; // % from top
const EASE = [0.22, 1, 0.3, 1] as const;

/** Light hue recedes from cold blue (warmth 0) to warm gold (warmth 1). */
function light(w: number, a: number): string {
  const r = Math.round(120 + 135 * w);
  const g = Math.round(152 + 48 * w);
  const b = Math.round(212 - 62 * w);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function Atmosphere({ warmth = 0.2, sunX = 50, coldOpen = false }: AtmosphereProps) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Signature dawn advance — the light rises slowly across the whole journey.
  const driftY = useTransform(scrollYProgress, [0, 1], ["7%", "-24%"]);

  const w = warmth;
  const ground = `rgb(${Math.round(8 + w * 18)}, ${Math.round(11 + w * 8)}, ${Math.round(19 - w * 9)})`;
  const cold = Math.max(0, 0.45 - w) * 0.6;

  const bloom = coldOpen && !reduced;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sky → ground recession (static) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #05070e 0%, #060912 ${HORIZON - 28}%, ${ground} 100%)`,
        }}
      />

      {/* Moving dawn group: light plane + haze fields */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: driftY }}>
        <motion.div
          className="absolute inset-0"
          initial={bloom ? { opacity: 0, scale: 0.94, y: 16 } : false}
          animate={bloom ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 3.8, ease: EASE }}
        >
          {/* Volumetric light plane at the horizon */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(72% 34% at ${sunX}% ${HORIZON + 2}%, ${light(w, 0.1 + w * 0.5)} 0%, ${light(w, 0.03 + w * 0.14)} 38%, transparent 70%)`,
            }}
          />
          {/* Distant haze field — farther, fainter */}
          <div
            className="absolute inset-x-0"
            style={{
              top: `${HORIZON - 19}%`,
              height: "18%",
              background: `linear-gradient(180deg, transparent, ${light(w, 0.04 + w * 0.05)} 60%, transparent)`,
            }}
          />
          {/* Nearer haze field — lower, denser */}
          <div
            className="absolute inset-x-0"
            style={{
              top: `${HORIZON - 8}%`,
              height: "17%",
              background: `linear-gradient(180deg, transparent, ${light(w, 0.07 + w * 0.11)} 50%, transparent)`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Cold uncertainty wash (static) */}
      {cold > 0.01 && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(22,50,104,${cold}) 0%, rgba(18,40,86,${cold * 0.5}) 55%, transparent 86%)`,
          }}
        />
      )}

      {/* Foreground atmospheric density (static) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "42%",
          background:
            "linear-gradient(180deg, transparent, rgba(0,0,0,0.34) 100%)",
        }}
      />

      {/* Cinematic vignette (static) */}
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
