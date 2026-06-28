"use client";

/**
 * SystemCanvas — the protagonist of the page.
 *
 * One fixed, full-viewport canvas renders the customer's distributed system as
 * a living organism. Global scroll progress drives a scene state machine that
 * morphs the same object through five acts:
 *   ambient → chaos → awakening → reasoning → resolution → calm.
 *
 * On first load it plays an orchestrated "cold open" ignition, independent of
 * scroll. Honors reduced-motion (renders one composed frame) and pauses on
 * tab blur.
 */
import { useEffect, useRef } from "react";
import { buildSystemGraph, type NodeKind } from "@/lib/graph";
import { clamp01, nodePos, sceneScalars, smoothstep, type Vec } from "@/lib/scene";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type RGB = readonly [number, number, number];

const PALETTE: Record<NodeKind, { rgb: RGB; r: number; glow: number }> = {
  source: { rgb: [99, 130, 200], r: 2.6, glow: 14 },
  coordinator: { rgb: [59, 130, 246], r: 4.4, glow: 30 },
  agent: { rgb: [56, 189, 248], r: 4.0, glow: 28 },
  normalize: { rgb: [99, 160, 246], r: 3.6, glow: 22 },
  reason: { rgb: [120, 170, 255], r: 4.0, glow: 26 },
  root: { rgb: [56, 189, 248], r: 5.2, glow: 40 },
};

const OK: RGB = [52, 211, 153];
const WARN: RGB = [245, 158, 11];
const SIGNAL: RGB = [56, 189, 248];
const PACKET_COUNT = 90;
const NOISE_COUNT = 64;

function rgba(c: RGB, a: number): string {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

interface Packet {
  edge: number;
  t: number;
  speed: number;
}

interface NoiseDot {
  x: number;
  y: number;
  phase: number;
}

export function SystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const graph = buildSystemGraph();
    const rand = mulberryLite(13);

    const packets: Packet[] = Array.from({ length: PACKET_COUNT }, () => ({
      edge: Math.floor(rand() * graph.edges.length),
      t: rand(),
      speed: 0.0016 + rand() * 0.0026,
    }));
    const noise: NoiseDot[] = Array.from({ length: NOISE_COUNT }, () => ({
      x: (rand() * 2 - 1) * 1.05,
      y: (rand() * 2 - 1) * 1.05,
      phase: rand() * Math.PI * 2,
    }));

    let width = 0;
    let height = 0;
    let scale = 1;
    let cx = 0;
    let cy = 0;
    const live: Vec[] = graph.nodes.map(() => ({ x: 0, y: 0 }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(width / 2.4, height / 1.9);
      cx = width / 2;
      cy = height * 0.5;
    };

    const scrollProgress = (): number => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? clamp01(window.scrollY / max) : 0;
    };

    const px = (v: Vec) => cx + v.x * scale;
    const py = (v: Vec) => cy + v.y * scale;

    /** Render one full frame. `intro` in [0,1] is the cold-open envelope. */
    const draw = (p: number, intro: number, time: number) => {
      const s = sceneScalars(p);
      const expand = smoothstep(0.18, 1, intro);
      const seedPulse = Math.max(0, 1 - Math.abs(intro - 0.1) / 0.12);
      const wired = (0.05 + s.structure * 0.22) * smoothstep(0.5, 1, intro);

      ctx.clearRect(0, 0, width, height);

      // Compute live positions (center → scroll target during intro).
      for (let i = 0; i < graph.nodes.length; i++) {
        const target = nodePos(graph.nodes[i].keyframes, p);
        live[i] = { x: target.x * expand, y: target.y * expand };
      }

      // Central ambient bloom — brightens as the system "thinks".
      const bloom = 0.18 + s.structure * 0.32 + s.verdict * 0.5;
      ctx.globalCompositeOperation = "lighter";
      paintGlow(ctx, cx, cy, scale * (0.6 + s.verdict * 0.3), PALETTE.coordinator.rgb, bloom * 0.5 * intro);

      // Cold-open seed pulse.
      if (seedPulse > 0) {
        paintGlow(ctx, cx, cy, 60 + seedPulse * 80, SIGNAL, seedPulse * 0.9);
      }

      // Noise field — the overload of Act I.
      const noiseAmt = s.chaos * intro;
      if (noiseAmt > 0.01) {
        for (const d of noise) {
          const flick = 0.4 + 0.6 * Math.sin(time * 0.004 + d.phase);
          const a = noiseAmt * flick * 0.5;
          if (a <= 0.01) continue;
          ctx.fillStyle = rgba(WARN, a * 0.5);
          ctx.beginPath();
          ctx.arc(px(d), py(d), 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Edges — wire up as structure forms.
      if (wired > 0.01) {
        ctx.lineWidth = 1;
        for (const e of graph.edges) {
          const a = live[e.from];
          const b = live[e.to];
          ctx.strokeStyle = rgba(PALETTE.coordinator.rgb, wired * (1 - s.verdict * 0.4));
          ctx.beginPath();
          ctx.moveTo(px(a), py(a));
          ctx.lineTo(px(b), py(b));
          ctx.stroke();
        }
      }

      // Packets — ordered flow along edges, brightening with structure.
      const packetAlpha = (0.12 + s.structure * 0.8) * smoothstep(0.8, 1, intro);
      if (packetAlpha > 0.01) {
        for (const pk of packets) {
          pk.t += pk.speed * (0.4 + s.structure * 1.6 + s.verdict * 1.2);
          if (pk.t > 1) {
            pk.t -= 1;
            pk.edge = Math.floor(rand() * graph.edges.length);
          }
          const e = graph.edges[pk.edge];
          const a = live[e.from];
          const b = live[e.to];
          const x = px({ x: a.x + (b.x - a.x) * pk.t, y: a.y + (b.y - a.y) * pk.t });
          const y = py({ x: a.x + (b.x - a.x) * pk.t, y: a.y + (b.y - a.y) * pk.t });
          const col = mix(SIGNAL, OK, s.verdict);
          ctx.fillStyle = rgba(col, packetAlpha);
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nodes.
      for (let i = 0; i < graph.nodes.length; i++) {
        const node = graph.nodes[i];
        const conf = PALETTE[node.kind];
        const pos = live[i];
        const x = px(pos);
        const y = py(pos);

        let alpha = smoothstep(0.12, 0.5, intro);
        if (node.kind === "agent") alpha *= 0.25 + s.agents * 0.75;
        const isRoot = node.kind === "root";
        if (!isRoot) alpha *= 1 - s.verdict * 0.55;

        const pulse = 0.85 + 0.15 * Math.sin(time * 0.0022 + i);
        let rgbCol = conf.rgb;
        let radius = conf.r;
        let glow = conf.glow;

        if (isRoot) {
          rgbCol = mix(conf.rgb, OK, s.verdict);
          radius = conf.r + s.verdict * 4;
          glow = conf.glow + s.verdict * 90;
          const ring = s.verdict * (0.6 + 0.4 * Math.sin(time * 0.004));
          if (ring > 0.01) {
            ctx.strokeStyle = rgba(OK, ring * 0.6);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(x, y, radius + 10 + s.verdict * 16, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        paintGlow(ctx, x, y, glow * pulse, rgbCol, alpha * 0.5);
        ctx.fillStyle = rgba(rgbCol, Math.min(1, alpha * 1.4));
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Labels — system identifiers appear as the pipeline resolves.
      ctx.globalCompositeOperation = "source-over";
      const labelAlpha = smoothstep(0.45, 0.75, p) * (1 - s.verdict * 0.7);
      if (labelAlpha > 0.02) {
        ctx.font =
          "10px var(--font-geist-mono), ui-monospace, monospace";
        ctx.textAlign = "center";
        for (let i = 0; i < graph.nodes.length; i++) {
          const node = graph.nodes[i];
          if (node.kind === "source") continue;
          const pos = live[i];
          ctx.fillStyle = rgba([148, 163, 184], labelAlpha * 0.8);
          ctx.fillText(node.label, px(pos), py(pos) - 12);
        }
      }
    };

    // --- Reduced motion: one composed frame, no loop. ---
    if (reduced) {
      resize();
      draw(0.5, 1, 0);
      const onResize = () => {
        resize();
        draw(0.5, 1, 0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // --- Animated path. ---
    resize();
    let raf = 0;
    let start = 0;
    let pSmooth = 0;

    const loop = (time: number) => {
      if (!start) start = time;
      const intro = clamp01((time - start) / 2400);
      const pTarget = scrollProgress();
      pSmooth += (pTarget - pSmooth) * 0.08;
      draw(pSmooth, intro, time);
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 42%, #0e1729 0%, #0b1220 45%, #070b14 100%)",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

/** Soft additive radial glow. */
function paintGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rgb: RGB,
  alpha: number,
) {
  if (alpha <= 0.01 || radius <= 0) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, rgba(rgb, alpha));
  g.addColorStop(1, rgba(rgb, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

/** Tiny local PRNG for runtime particle reshuffling (browser-only). */
function mulberryLite(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
