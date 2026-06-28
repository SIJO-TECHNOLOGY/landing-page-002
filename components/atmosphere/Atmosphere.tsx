/**
 * Atmosphere — the static visual WORLD behind each panel.
 *
 * A cinematic dawn landscape rendered entirely with layered CSS gradients and
 * blurred silhouette forms (NO animation, NO particles): deep sky → volumetric
 * dawn light at a horizon → haze band → silhouetted monolith forms with
 * foreground/background depth → atmospheric fog → vignette.
 *
 * `warmth` (0→1) drives the "First Light" progression across the page (dark
 * uncertainty → warm confidence); `sunX` moves the light source to break
 * symmetry per panel.
 */
interface AtmosphereProps {
  warmth?: number; // 0 cool/night → 1 warm dawn
  sunX?: number; // % horizontal position of the dawn light
  forms?: boolean;
}

const HORIZON = 70; // % from top

function warm(intensity: number, w: number): string {
  return `rgba(255, ${Math.round(196 + w * 28)}, ${Math.round(150 + w * 18)}, ${intensity})`;
}

interface Mono {
  x: number;
  w: number;
  h: number;
  depth: number; // 1 = near/sharp/dark, 0 = far/hazy
}

const MONOS: readonly Mono[] = [
  { x: 14, w: 8, h: 24, depth: 0.85 },
  { x: 27, w: 5, h: 15, depth: 0.5 },
  { x: 70, w: 10, h: 30, depth: 1 },
  { x: 84, w: 6, h: 19, depth: 0.62 },
  { x: 50, w: 4, h: 11, depth: 0.35 },
];

function Forms({ warmth, sunX }: { warmth: number; sunX: number }) {
  return (
    <>
      {MONOS.map((m, i) => {
        const litLeft = sunX <= m.x;
        const rim = warm(0.05 + warmth * 0.22, warmth);
        const body = `rgba(4, 6, 11, ${0.72 + m.depth * 0.22})`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${m.x}%`,
              bottom: `${100 - HORIZON}%`,
              width: `${m.w}%`,
              height: `${m.h}%`,
              transform: "translateX(-50%)",
              borderRadius: "8px 8px 0 0",
              background: `linear-gradient(${litLeft ? 90 : 270}deg, ${rim} 0%, ${body} 24%, ${body} 100%)`,
              filter: `blur(${(1 - m.depth) * 2.4}px)`,
              opacity: 0.55 + m.depth * 0.4,
            }}
          />
        );
      })}
    </>
  );
}

export function Atmosphere({ warmth = 0.2, sunX = 50, forms = true }: AtmosphereProps) {
  const horizonBand = `rgb(${Math.round(16 + warmth * 58)}, ${Math.round(15 + warmth * 24)}, ${Math.round(20 + warmth * 4)})`;
  const below = `rgb(${Math.round(9 + warmth * 30)}, ${Math.round(9 + warmth * 14)}, ${Math.round(13)})`;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sky → warm horizon → ground */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #05070d 0%, #070b14 ${HORIZON - 22}%, ${horizonBand} ${HORIZON + 5}%, ${below} 100%)`,
        }}
      />
      {/* Volumetric dawn light rising at the horizon */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(56% 44% at ${sunX}% ${HORIZON + 3}%, ${warm(0.1 + warmth * 0.55, warmth)} 0%, ${warm(0.04 + warmth * 0.16, warmth)} 32%, transparent 66%)`,
        }}
      />
      {/* Haze band across the horizon */}
      <div
        className="absolute inset-x-0"
        style={{
          top: `${HORIZON - 8}%`,
          height: "20%",
          background: `linear-gradient(180deg, transparent, ${warm(0.06 + warmth * 0.12, warmth)} 45%, transparent)`,
          filter: "blur(10px)",
        }}
      />
      {/* Silhouetted forms on the horizon */}
      {forms && <Forms warmth={warmth} sunX={sunX} />}
      {/* High atmospheric fog for depth above the horizon */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: `${HORIZON}%`,
          background: `linear-gradient(180deg, transparent 38%, rgba(120,140,180,${0.03 + warmth * 0.025}) 100%)`,
        }}
      />
      {/* Cinematic vignette — foreground framing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 36%, transparent 50%, rgba(0,0,0,0.58) 100%)",
        }}
      />
    </div>
  );
}
