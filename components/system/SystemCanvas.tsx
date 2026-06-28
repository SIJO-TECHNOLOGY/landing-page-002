"use client";

/**
 * SystemCanvas — the protagonist of the page.
 *
 * One fixed, full-viewport canvas renders the customer's distributed system as
 * a living organism. Global scroll progress drives a scene state machine that
 * morphs the same object through five acts:
 *   ambient → chaos → awakening → reasoning → resolution → calm.
 *
 * Cold open (Sprint 1.A): a slow, staged ignition — one seed signal, a second
 * response, an outward expansion into a breathing topology — owns the screen
 * before any headline resolves.
 * Agent arrival (Sprint 1.B): four agents fly in from offscreen edges with
 * overshoot + light flare as a real, staggered event.
 * Chaos (Sprint 1.C): a sustained "danger" plateau drives jitter, broken
 * edges, erratic packets, and amber/red warnings so failure feels unstable.
 *
 * Honors reduced-motion (renders one composed frame) and pauses on tab blur.
 */
import { useEffect, useRef } from "react";
import { buildSystemGraph, type NodeKind } from "@/lib/graph";
import {
  clamp01,
  easeOutBack,
  lerp,
  nodePos,
  sceneScalars,
  smoothstep,
  type Vec,
} from "@/lib/scene";
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
const RED: RGB = [239, 68, 68];
const SIGNAL: RGB = [56, 189, 248];
const WHITE: RGB = [226, 240, 255];

const PACKET_COUNT = 90;
const NOISE_COUNT = 64;
const GLITCH_COUNT = 14;

// Cold-open + agent-arrival timing.
const INTRO_MS = 3000;
const AGENT_DURATION_MS = 720;
const AGENT_STAGGER_MS = 90;
const AGENT_TRIGGER_P = 0.4;
const AGENT_REARM_P = 0.3;

type Dir = "left" | "top" | "right" | "bottom";
const AGENT_DEFS: ReadonlyArray<{ id: string; dir: Dir }> = [
  { id: "agent-log", dir: "left" },
  { id: "agent-db", dir: "top" },
  { id: "agent-api", dir: "right" },
  { id: "agent-infra", dir: "bottom" },
];

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

interface GlitchEdge {
  a: number;
  b: number;
  phase: number;
}

interface AgentMeta {
  idx: number;
  dir: Dir;
  order: number;
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
    const n = graph.nodes.length;
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
    const glitches: GlitchEdge[] = Array.from({ length: GLITCH_COUNT }, () => ({
      a: Math.floor(rand() * n),
      b: Math.floor(rand() * n),
      phase: rand() * Math.PI * 2,
    }));

    // Cold-open reveal order: nearest-to-center ignites first, then cascades
    // outward. The first two get a deliberate "signal → response" beat.
    const order = [...graph.nodes.keys()].sort((i, j) => {
      const ri = Math.hypot(
        graph.nodes[i].keyframes[0].x,
        graph.nodes[i].keyframes[0].y,
      );
      const rj = Math.hypot(
        graph.nodes[j].keyframes[0].x,
        graph.nodes[j].keyframes[0].y,
      );
      return ri - rj;
    });
    const birth = new Array<number>(n).fill(0);
    order.forEach((nodeIdx, rank) => {
      if (rank === 0) birth[nodeIdx] = 0;
      else if (rank === 1) birth[nodeIdx] = 0.12;
      else birth[nodeIdx] = lerp(0.3, 0.74, (rank - 2) / Math.max(1, n - 3));
    });

    const agents: AgentMeta[] = AGENT_DEFS.map((d, order) => ({
      idx: graph.nodes.findIndex((node) => node.id === d.id),
      dir: d.dir,
      order,
    })).filter((a) => a.idx >= 0);
    const agentByIndex = new Map(agents.map((a) => [a.idx, a]));

    let width = 0;
    let height = 0;
    let scale = 1;
    let cx = 0;
    let cy = 0;
    let agentArrivalStart = -1; // ms timestamp; -1 = not yet triggered
    const live: Vec[] = graph.nodes.map(() => ({ x: 0, y: 0 }));
    const nodeFlare = new Array<number>(n).fill(0);
    const presence = new Array<number>(n).fill(0); // node visibility [0,1]

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
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? clamp01(window.scrollY / max) : 0;
    };

    const px = (v: Vec) => cx + v.x * scale;
    const py = (v: Vec) => cy + v.y * scale;

    const entryPoint = (home: Vec, dir: Dir): Vec => {
      switch (dir) {
        case "left":
          return { x: -2.0, y: home.y };
        case "right":
          return { x: 2.0, y: home.y };
        case "top":
          return { x: home.x, y: -1.9 };
        case "bottom":
          return { x: home.x, y: 1.9 };
      }
    };

    /**
     * Render one frame. `intro` is the cold-open envelope [0,1]; `staticMode`
     * composes a single settled frame (reduced motion).
     */
    const draw = (p: number, intro: number, time: number, staticMode = false) => {
      const s = sceneScalars(p);
      const danger = staticMode ? 0 : s.danger;
      const seedGlow = staticMode ? 0 : 1 - smoothstep(0, 0.22, intro);

      ctx.clearRect(0, 0, width, height);
      nodeFlare.fill(0);

      // Per-agent arrival progress (Sprint 1.B).
      const elapsed = agentArrivalStart >= 0 ? time - agentArrivalStart : -1;

      // --- Live node positions + presence ----------------------------------
      for (let i = 0; i < n; i++) {
        const target = nodePos(graph.nodes[i].keyframes, p);
        const agent = agentByIndex.get(i);
        let pos: Vec;

        if (agent && !staticMode) {
          // Fly in from offscreen with overshoot, staggered per agent. rawT is
          // left unclamped so the arrival flare is a transient burst, not a
          // permanent glow.
          const rawT =
            (elapsed - agent.order * AGENT_STAGGER_MS) / AGENT_DURATION_MS;
          const at = clamp01(rawT);
          const entry = entryPoint(target, agent.dir);
          const e = easeOutBack(at);
          pos = { x: lerp(entry.x, target.x, e), y: lerp(entry.y, target.y, e) };
          presence[i] = elapsed < 0 ? 0 : smoothstep(0, 0.18, at);
          nodeFlare[i] = elapsed >= 0 ? bumpAt(rawT, 0.92, 0.5) : 0;
        } else {
          const reveal = staticMode
            ? 1
            : smoothstep(birth[i], birth[i] + 0.16, intro);
          pos = { x: target.x * reveal, y: target.y * reveal };
          presence[i] = reveal;
          nodeFlare[i] = 0;
        }

        // Ambient breathing (subtle life when unstructured) + chaos jitter.
        if (!staticMode) {
          const breath = (1 - s.structure) * 0.008;
          pos = {
            x: pos.x + Math.sin(time * 0.0009 + i * 1.3) * breath,
            y: pos.y + Math.cos(time * 0.0011 + i * 0.7) * breath,
          };
          if (danger > 0.01) {
            const jx =
              Math.sin(time * 0.013 + i * 12.9) +
              Math.sin(time * 0.021 + i * 7.3);
            const jy =
              Math.cos(time * 0.017 + i * 9.1) +
              Math.sin(time * 0.029 + i * 4.7);
            pos = {
              x: pos.x + jx * 0.018 * danger,
              y: pos.y + jy * 0.018 * danger,
            };
          }
        }
        live[i] = pos;
      }

      // --- Central blooms ---------------------------------------------------
      ctx.globalCompositeOperation = "lighter";
      const bloom = 0.18 + s.structure * 0.32 + s.verdict * 0.5;
      paintGlow(
        ctx,
        cx,
        cy,
        scale * (0.6 + s.verdict * 0.3),
        PALETTE.coordinator.rgb,
        bloom * 0.5 * (staticMode ? 1 : intro),
      );
      if (seedGlow > 0.01) {
        paintGlow(ctx, cx, cy, 70 + seedGlow * 70, SIGNAL, seedGlow * 0.95);
      }

      // --- Noise field — intensifies into amber/red distress ---------------
      if (danger > 0.01) {
        for (const d of noise) {
          const flick = 0.5 + 0.5 * Math.sin(time * 0.012 + d.phase * 5);
          const a = danger * flick * 0.7;
          if (a <= 0.02) continue;
          const jx = Math.sin(time * 0.02 + d.phase) * 0.02 * danger;
          ctx.fillStyle = rgba(mix(WARN, RED, flick * danger), a * 0.6);
          ctx.beginPath();
          ctx.arc(px({ x: d.x + jx, y: d.y }), py(d), 1.2 + flick, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Broken/transient connections (Sprint 1.C) -----------------------
      if (danger > 0.04) {
        ctx.lineWidth = 1;
        for (const g of glitches) {
          const blink = Math.sin(time * 0.03 + g.phase * 7);
          if (blink < 0.55) continue; // appears only intermittently
          const a = danger * (0.2 + 0.5 * (blink - 0.55) / 0.45);
          const va = live[g.a];
          const vb = live[g.b];
          ctx.strokeStyle = rgba(mix(WARN, RED, 0.6), a);
          ctx.beginPath();
          ctx.moveTo(px(va), py(va));
          ctx.lineTo(px(vb), py(vb));
          ctx.stroke();
        }
      }

      // --- Structural edges (wire up + pathway activation on arrival) ------
      const wired =
        (0.05 + s.structure * 0.22) * (staticMode ? 1 : smoothstep(0.4, 1, intro));
      if (wired > 0.01 || !staticMode) {
        ctx.lineWidth = 1;
        for (const e of graph.edges) {
          const a = live[e.from];
          const b = live[e.to];
          const vis = Math.min(presence[e.from], presence[e.to]);
          if (vis <= 0.02) continue; // don't draw toward not-yet-arrived agents
          const pathway = Math.max(nodeFlare[e.from], nodeFlare[e.to]);
          const alpha = (wired * (1 - s.verdict * 0.4) + pathway * 0.55) * vis;
          if (alpha <= 0.01) continue;
          ctx.strokeStyle = rgba(
            mix(PALETTE.coordinator.rgb, SIGNAL, pathway),
            alpha,
          );
          ctx.beginPath();
          ctx.moveTo(px(a), py(a));
          ctx.lineTo(px(b), py(b));
          ctx.stroke();
        }
      }

      // --- Packets — ordered flow, erratic + reversing under danger --------
      const packetAlpha =
        (0.12 + s.structure * 0.8) * (staticMode ? 1 : smoothstep(0.8, 1, intro));
      for (const pk of packets) {
        let move = pk.speed * (0.4 + s.structure * 1.6 + s.verdict * 1.2);
        if (danger > 0.15) {
          const dir = Math.sin(time * 0.002 + pk.edge * 2.7) > 0 ? 1 : -1;
          move *= dir * (0.5 + Math.abs(Math.sin(time * 0.01 + pk.edge)));
        }
        pk.t = ((pk.t + move) % 1 + 1) % 1;

        const a = packetAlpha > 0.01 || danger > 0.15
          ? Math.max(packetAlpha, danger * 0.55)
          : 0;
        if (a <= 0.01) continue;

        const e = graph.edges[pk.edge];
        const va = live[e.from];
        const vb = live[e.to];
        const jit = danger > 0.15 ? Math.sin(time * 0.05 + pk.edge) * 0.02 * danger : 0;
        const lx = va.x + (vb.x - va.x) * pk.t + jit;
        const ly = va.y + (vb.y - va.y) * pk.t + jit;
        const col = mix(mix(SIGNAL, WARN, danger * 0.7), OK, s.verdict);
        ctx.fillStyle = rgba(col, a);
        ctx.beginPath();
        ctx.arc(px({ x: lx, y: ly }), py({ x: lx, y: ly }), 1.5, 0, Math.PI * 2);
        ctx.fill();
        if (pk.t > 1) pk.edge = Math.floor(rand() * graph.edges.length);
      }

      // --- Nodes ------------------------------------------------------------
      for (let i = 0; i < n; i++) {
        const node = graph.nodes[i];
        const conf = PALETTE[node.kind];
        const pos = live[i];
        const x = px(pos);
        const y = py(pos);

        // Visibility comes from the unified presence model (cold-open reveal
        // for the system, arrival ramp for agents).
        let alpha = presence[i];
        const isRoot = node.kind === "root";
        if (!isRoot) alpha *= 1 - s.verdict * 0.55;
        if (alpha <= 0.01) continue;

        let rgbCol = conf.rgb;
        let radius = conf.r;
        let glow = conf.glow;
        let pulse = 0.85 + 0.15 * Math.sin(time * 0.0022 + i);

        // Irregular pulse + amber/red warning tint under danger.
        if (danger > 0.01) {
          const erratic =
            Math.sin(time * 0.03 + i * 2.3) * Math.sin(time * 0.011 + i);
          pulse *= 1 + danger * 0.5 * erratic;
          const warnMix = clamp01(danger * (0.35 + 0.65 * Math.max(0, erratic)));
          rgbCol = mix(rgbCol, i % 3 === 0 ? RED : WARN, warnMix);
        }

        // Agent arrival flare.
        const flare = nodeFlare[i];
        if (flare > 0.01) {
          rgbCol = mix(rgbCol, WHITE, flare * 0.8);
          paintGlow(ctx, x, y, glow + flare * 70, SIGNAL, flare * 0.7);
          ctx.strokeStyle = rgba(SIGNAL, flare * 0.5);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, radius + 6 + flare * 26, 0, Math.PI * 2);
          ctx.stroke();
        }

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
        ctx.arc(x, y, Math.max(0.5, radius * pulse), 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Labels — system identifiers appear as the pipeline resolves -----
      ctx.globalCompositeOperation = "source-over";
      const labelAlpha = smoothstep(0.45, 0.75, p) * (1 - s.verdict * 0.7);
      if (labelAlpha > 0.02) {
        ctx.font = "10px var(--font-geist-mono), ui-monospace, monospace";
        ctx.textAlign = "center";
        for (let i = 0; i < n; i++) {
          if (graph.nodes[i].kind === "source") continue;
          const pos = live[i];
          ctx.fillStyle = rgba([148, 163, 184], labelAlpha * 0.8);
          ctx.fillText(graph.nodes[i].label, px(pos), py(pos) - 12);
        }
      }
    };

    // --- Reduced motion: one composed frame, no loop. ---
    if (reduced) {
      resize();
      draw(0.5, 1, 0, true);
      const onResize = () => {
        resize();
        draw(0.5, 1, 0, true);
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
      const intro = clamp01((time - start) / INTRO_MS);
      const pTarget = scrollProgress();
      pSmooth += (pTarget - pSmooth) * 0.08;

      // Arm / re-arm the agent arrival event around the Awakening act.
      if (pSmooth > AGENT_TRIGGER_P && agentArrivalStart < 0) {
        agentArrivalStart = time;
      } else if (pSmooth < AGENT_REARM_P && agentArrivalStart >= 0) {
        agentArrivalStart = -1;
      }

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

/** Symmetric bump centered at `c`, half-width `w`, peaking at 1. */
function bumpAt(x: number, c: number, w: number): number {
  const d = Math.abs(x - c) / w;
  return d >= 1 ? 0 : 1 - d * d * (3 - 2 * d);
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
