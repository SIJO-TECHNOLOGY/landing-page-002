"use client";

/**
 * SystemCanvas — the protagonist of the page.
 *
 * One fixed, full-viewport canvas renders the customer's distributed system as
 * a living organism. Global scroll progress drives a scene state machine that
 * morphs the same object through five acts:
 *   ambient → chaos → awakening → reasoning → resolution → calm.
 *
 * Cold open (1.A): a slow staged ignition owns the screen before any headline.
 * Agent arrival (1.B): four agents fly in from offscreen edges, flare, and
 *   sweep-scan the system as a distinct event.
 * Chaos (1.C / 1.1): DIRECTED distress — jitter, warning sparks and broken
 *   links localized to stressed infrastructure nodes, ramping gently after the
 *   hero handoff and clearing before the agents arrive. Restraint over noise.
 *
 * Honors reduced-motion (one composed frame), pauses on tab blur, and thins
 * density on mobile.
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
const SPARKS_PER_NODE = 3;

// Cold-open + agent-arrival timing.
const INTRO_MS = 3000;
const AGENT_DURATION_MS = 760;
const AGENT_STAGGER_MS = 95;
const AGENT_TRIGGER_P = 0.42;
const AGENT_REARM_P = 0.32;

// Danger thresholds — the strongest effects are withheld until deep chaos.
const D_SPARKS = 0.32; // localized warning sparks appear
const D_BREAK = 0.55; // broken connections begin flickering
const D_RED = 0.7; // red (vs amber) accents on broken links

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

interface Spark {
  node: number;
  ang: number;
  rad: number;
  phase: number;
}

interface BrokenLink {
  from: number;
  to: number;
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

    // "Stressed" infrastructure = the sources + coordinator. Chaos is anchored
    // here so distress reads as DIRECTED, not full-screen confetti.
    const stressed = [...graph.nodes.keys()].filter(
      (i) =>
        graph.nodes[i].kind === "source" ||
        graph.nodes[i].kind === "coordinator",
    );
    const sparks: Spark[] = stressed.flatMap((node) =>
      Array.from({ length: SPARKS_PER_NODE }, () => ({
        node,
        ang: rand() * Math.PI * 2,
        rad: 0.04 + rand() * 0.05,
        phase: rand() * Math.PI * 2,
      })),
    );
    // Broken links flicker only along REAL edges touching stressed nodes.
    const brokenLinks: BrokenLink[] = graph.edges
      .filter(
        (e) => stressed.includes(e.from) || stressed.includes(e.to),
      )
      .slice(0, 6)
      .map((e) => ({ from: e.from, to: e.to, phase: rand() * Math.PI * 2 }));

    // Cold-open reveal order: nearest-to-center ignites first, then cascades.
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
      else if (rank === 1) birth[nodeIdx] = 0.18;
      else birth[nodeIdx] = lerp(0.36, 0.82, (rank - 2) / Math.max(1, n - 3));
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
    let isMobile = false;
    let agentArrivalStart = -1; // ms timestamp; -1 = not yet triggered
    const livePos: Vec[] = graph.nodes.map(() => ({ x: 0, y: 0 }));
    const nodeFlare = new Array<number>(n).fill(0);
    const nodeScan = new Array<number>(n).fill(0);
    const presence = new Array<number>(n).fill(0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 640;
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

    const draw = (p: number, intro: number, time: number, staticMode = false) => {
      const s = sceneScalars(p);
      const danger = staticMode ? 0 : s.danger;
      const seedGlow = staticMode ? 0 : 1 - smoothstep(0, 0.26, intro);
      const flareScale = isMobile ? 0.6 : 1;

      ctx.clearRect(0, 0, width, height);
      nodeFlare.fill(0);
      nodeScan.fill(0);

      const elapsed = agentArrivalStart >= 0 ? time - agentArrivalStart : -1;

      // --- Live node positions + presence ----------------------------------
      for (let i = 0; i < n; i++) {
        const target = nodePos(graph.nodes[i].keyframes, p);
        const agent = agentByIndex.get(i);
        let pos: Vec;

        if (agent && !staticMode) {
          const rawT =
            (elapsed - agent.order * AGENT_STAGGER_MS) / AGENT_DURATION_MS;
          const at = clamp01(rawT);
          const entry = entryPoint(target, agent.dir);
          const e = easeOutBack(at);
          pos = { x: lerp(entry.x, target.x, e), y: lerp(entry.y, target.y, e) };
          presence[i] = elapsed < 0 ? 0 : smoothstep(0, 0.18, at);
          nodeFlare[i] = elapsed >= 0 ? bumpAt(rawT, 0.92, 0.5) : 0;
          // Scan sweep expands after landing.
          nodeScan[i] = elapsed >= 0 ? clamp01((rawT - 1.0) / 0.9) : 0;
        } else {
          const reveal = staticMode
            ? 1
            : smoothstep(birth[i], birth[i] + 0.16, intro);
          pos = { x: target.x * reveal, y: target.y * reveal };
          presence[i] = reveal;
        }

        if (!staticMode) {
          const breath = (1 - s.structure) * 0.008;
          pos = {
            x: pos.x + Math.sin(time * 0.0009 + i * 1.3) * breath,
            y: pos.y + Math.cos(time * 0.0011 + i * 0.7) * breath,
          };
          // Chaos jitter — restrained, strongest on stressed nodes.
          if (danger > 0.01) {
            const amp = (stressed.includes(i) ? 0.012 : 0.005) * danger;
            const jx =
              Math.sin(time * 0.013 + i * 12.9) +
              Math.sin(time * 0.021 + i * 7.3);
            const jy =
              Math.cos(time * 0.017 + i * 9.1) +
              Math.sin(time * 0.029 + i * 4.7);
            pos = { x: pos.x + jx * amp, y: pos.y + jy * amp };
          }
        }
        livePos[i] = pos;
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

      // --- Localized warning sparks around stressed nodes (1.1) ------------
      if (danger > D_SPARKS) {
        const sparkAmt = smoothstep(D_SPARKS, 0.7, danger);
        for (let k = 0; k < sparks.length; k++) {
          if (isMobile && k % 3 !== 0) continue; // thin on mobile
          const sp = sparks[k];
          const flick = 0.5 + 0.5 * Math.sin(time * 0.014 + sp.phase * 6);
          const a = sparkAmt * flick * 0.55;
          if (a <= 0.02) continue;
          const node = livePos[sp.node];
          const wob = sp.rad * (1 + 0.3 * Math.sin(time * 0.01 + sp.phase));
          const sx = node.x + Math.cos(sp.ang + time * 0.0008) * wob;
          const sy = node.y + Math.sin(sp.ang + time * 0.0008) * wob;
          ctx.fillStyle = rgba(WARN, a);
          ctx.beginPath();
          ctx.arc(px({ x: sx, y: sy }), py({ x: sx, y: sy }), 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Broken connections — only deep in chaos, along real edges -------
      if (danger > D_BREAK && !isMobile) {
        const breakAmt = smoothstep(D_BREAK, 0.85, danger);
        ctx.lineWidth = 1;
        for (const b of brokenLinks) {
          const blink = Math.sin(time * 0.025 + b.phase * 7);
          if (blink < 0.6) continue;
          const a = breakAmt * (blink - 0.6) * 1.6;
          const col = mix(WARN, RED, smoothstep(D_RED, 0.9, danger));
          const va = livePos[b.from];
          const vb = livePos[b.to];
          ctx.strokeStyle = rgba(col, a);
          ctx.beginPath();
          ctx.moveTo(px(va), py(va));
          ctx.lineTo(px(vb), py(vb));
          ctx.stroke();
        }
      }

      // --- Structural edges (wire up + pathway activation on arrival) ------
      const wired =
        (0.05 + s.structure * 0.22) *
        (staticMode ? 1 : smoothstep(0.4, 1, intro));
      ctx.lineWidth = 1;
      for (const e of graph.edges) {
        const a = livePos[e.from];
        const b = livePos[e.to];
        const vis = Math.min(presence[e.from], presence[e.to]);
        if (vis <= 0.02) continue;
        const pathway = Math.max(nodeFlare[e.from], nodeFlare[e.to]);
        const alpha = (wired * (1 - s.verdict * 0.4) + pathway * 0.55) * vis;
        if (alpha <= 0.01) continue;
        ctx.strokeStyle = rgba(mix(PALETTE.coordinator.rgb, SIGNAL, pathway), alpha);
        ctx.beginPath();
        ctx.moveTo(px(a), py(a));
        ctx.lineTo(px(b), py(b));
        ctx.stroke();
      }

      // --- Packets — ordered flow; mildly erratic only under deep danger ---
      const packetAlpha =
        (0.12 + s.structure * 0.8) *
        (staticMode ? 1 : smoothstep(0.8, 1, intro));
      for (let pi = 0; pi < packets.length; pi++) {
        if (isMobile && pi % 2 === 1) continue; // half density on mobile
        const pk = packets[pi];
        let move = pk.speed * (0.4 + s.structure * 1.6 + s.verdict * 1.2);
        if (danger > D_BREAK) {
          const dir = Math.sin(time * 0.002 + pk.edge * 2.7) > 0 ? 1 : -1;
          move *= dir * (0.6 + 0.4 * Math.abs(Math.sin(time * 0.01 + pk.edge)));
        }
        pk.t = ((pk.t + move) % 1 + 1) % 1;

        const a =
          packetAlpha > 0.01 || danger > D_SPARKS
            ? Math.max(packetAlpha, smoothstep(D_SPARKS, 0.7, danger) * 0.4)
            : 0;
        if (a <= 0.01) continue;
        const e = graph.edges[pk.edge];
        const va = livePos[e.from];
        const vb = livePos[e.to];
        const lx = va.x + (vb.x - va.x) * pk.t;
        const ly = va.y + (vb.y - va.y) * pk.t;
        const col = mix(mix(SIGNAL, WARN, danger * 0.45), OK, s.verdict);
        ctx.fillStyle = rgba(col, a);
        ctx.beginPath();
        ctx.arc(px({ x: lx, y: ly }), py({ x: lx, y: ly }), 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Nodes ------------------------------------------------------------
      for (let i = 0; i < n; i++) {
        const node = graph.nodes[i];
        const conf = PALETTE[node.kind];
        const pos = livePos[i];
        const x = px(pos);
        const y = py(pos);

        let alpha = presence[i];
        const isRoot = node.kind === "root";
        if (!isRoot) alpha *= 1 - s.verdict * 0.55;
        if (alpha <= 0.01) continue;

        let rgbCol = conf.rgb;
        let radius = conf.r;
        let glow = conf.glow;
        let pulse = 0.85 + 0.15 * Math.sin(time * 0.0022 + i);

        // Irregular pulse + AMBER-ONLY warning tint (no red on blue → no pink).
        if (danger > 0.01 && stressed.includes(i)) {
          const erratic =
            Math.sin(time * 0.03 + i * 2.3) * Math.sin(time * 0.011 + i);
          pulse *= 1 + danger * 0.35 * erratic;
          const warnMix = clamp01(
            smoothstep(0.25, 0.8, danger) * (0.4 + 0.6 * Math.max(0, erratic)),
          );
          rgbCol = mix(rgbCol, WARN, warnMix);
        }

        // Agent arrival flare + scan sweep.
        const flare = nodeFlare[i];
        if (flare > 0.01) {
          rgbCol = mix(rgbCol, WHITE, flare * 0.85);
          paintGlow(ctx, x, y, glow + flare * 90 * flareScale, SIGNAL, flare * 0.8);
          ctx.strokeStyle = rgba(WHITE, flare * 0.55);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, radius + 6 + flare * 30 * flareScale, 0, Math.PI * 2);
          ctx.stroke();
        }
        const scan = nodeScan[i];
        if (scan > 0.01 && scan < 1) {
          const sr = (10 + scan * 120) * flareScale;
          ctx.strokeStyle = rgba(SIGNAL, (1 - scan) * 0.5);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, sr, 0, Math.PI * 2);
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

      // --- Labels -----------------------------------------------------------
      ctx.globalCompositeOperation = "source-over";
      const labelAlpha = smoothstep(0.45, 0.75, p) * (1 - s.verdict * 0.7);
      if (labelAlpha > 0.02 && !isMobile) {
        ctx.font = "10px var(--font-geist-mono), ui-monospace, monospace";
        ctx.textAlign = "center";
        for (let i = 0; i < n; i++) {
          if (graph.nodes[i].kind === "source") continue;
          const pos = livePos[i];
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

      // Adaptive smoothing: elegant lag on small moves, fast catch-up on large
      // (fast scroll) so text and canvas stay synchronized (1.1 / problem 6).
      const gap = pTarget - pSmooth;
      const f = Math.min(0.5, 0.08 + Math.abs(gap) * 1.6);
      pSmooth += gap * f;

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
