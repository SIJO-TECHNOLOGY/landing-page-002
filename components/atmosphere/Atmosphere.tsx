/**
 * Atmosphere — the static visual WORLD behind each panel (Sprint 1.7).
 *
 * Pure atmospheric abstraction — NO objects, NO architectural forms, NO blurred
 * foreground shapes. Depth comes from real atmospheric perspective: a broad
 * volumetric light plane at the horizon, layered haze fields with opacity
 * falloff (denser/nearer low, fainter/farther high), graded gradient recession,
 * and foreground density. Built entirely from CSS gradients. No animation.
 *
 * `warmth` (0→1) drives the "First Light" progression AND the light's hue
 * (cold blue at 0 → warm gold at 1), so low-warmth panels read as a genuine
 * cold valley; `sunX` moves the light source to break symmetry per panel.
 */
interface AtmosphereProps {
  warmth?: number; // 0 cold/night → 1 warm dawn
  sunX?: number; // % horizontal position of the light plane
}

const HORIZON = 72; // % from top

/** Light hue recedes from cold blue (warmth 0) to warm gold (warmth 1). */
function light(w: number, a: number): string {
  const r = Math.round(120 + 135 * w);
  const g = Math.round(152 + 48 * w);
  const b = Math.round(212 - 62 * w);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function Atmosphere({ warmth = 0.2, sunX = 50 }: AtmosphereProps) {
  const w = warmth;
  const ground = `rgb(${Math.round(8 + w * 18)}, ${Math.round(11 + w * 8)}, ${Math.round(19 - w * 9)})`;
  const cold = Math.max(0, 0.45 - w) * 0.6; // cold-valley wash, only at low warmth

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sky → ground recession */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #05070e 0%, #060912 ${HORIZON - 28}%, ${ground} 100%)`,
        }}
      />

      {/* Volumetric light plane at the horizon (broad, soft) */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(72% 34% at ${sunX}% ${HORIZON + 2}%, ${light(w, 0.1 + w * 0.5)} 0%, ${light(w, 0.03 + w * 0.14)} 38%, transparent 70%)`,
        }}
      />

      {/* Distant haze field — farther, fainter (atmospheric recession) */}
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

      {/* Cold uncertainty wash — deep blue, only in low-warmth panels */}
      {cold > 0.01 && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(22,50,104,${cold}) 0%, rgba(18,40,86,${cold * 0.5}) 55%, transparent 86%)`,
          }}
        />
      )}

      {/* Foreground atmospheric density — near space reads darker/clearer */}
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
