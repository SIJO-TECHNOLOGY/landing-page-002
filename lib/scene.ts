/**
 * Scene math for the "One System, One Journey" canvas.
 *
 * A single scroll progress value `p` in [0,1] drives the whole film. Each node
 * carries 7 keyframe positions aligned to ACT_BOUNDS; nodePos() interpolates
 * between them. Scalar helpers (chaos, structure, verdict, calm) shape how the
 * canvas is drawn within each act.
 */

export interface Vec {
  x: number;
  y: number;
}

/** Boundaries between the 6 morph segments (7 keyframes per node). */
export const ACT_BOUNDS: readonly number[] = [0, 0.05, 0.22, 0.42, 0.66, 0.85, 1];

export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpVec(a: Vec, b: Vec, t: number): Vec {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Overshoot easing — used for agents that fly in and settle past their mark. */
export function easeOutBack(t: number): number {
  const x = clamp01(t) - 1;
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * x * x * x + c1 * x * x;
}

/** Smoothstep ramp from edge0..edge1, eased. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** A symmetric bump centered at `c` with half-width `w`, peaking at 1. */
export function bump(p: number, c: number, w: number): number {
  const d = Math.abs(p - c) / w;
  return d >= 1 ? 0 : 1 - d * d * (3 - 2 * d);
}

/** Interpolate a node's live position from its 7 keyframes at progress p. */
export function nodePos(keyframes: readonly Vec[], p: number): Vec {
  const cp = clamp01(p);
  for (let i = 0; i < ACT_BOUNDS.length - 1; i++) {
    const a = ACT_BOUNDS[i];
    const b = ACT_BOUNDS[i + 1];
    if (cp <= b || i === ACT_BOUNDS.length - 2) {
      const t = easeInOut(clamp01((cp - a) / (b - a)));
      return lerpVec(keyframes[i], keyframes[i + 1], t);
    }
  }
  return keyframes[keyframes.length - 1];
}

export interface SceneScalars {
  /** Disorder/jitter — peaks during the "fracture" of Act I. */
  chaos: number;
  /**
   * System distress. Begins as gentle unease just after the hero handoff,
   * builds to a peak deep in the Chaos act, then fully releases BEFORE the
   * agents arrive — so the hero→chaos transition is soft and the awakening
   * reads as a distinct, calm event rather than more chaos.
   */
  danger: number;
  /** How wired the structure is (edges + forward packet flow). */
  structure: number;
  /** Verdict ignition — root cause glows, others dim. */
  verdict: number;
  /** Final calm — sparse, slow single pulse. */
  calm: number;
  /** Agents revealed (fade-in during Awakening). */
  agents: number;
}

export function sceneScalars(p: number): SceneScalars {
  return {
    chaos: bump(p, 0.14, 0.13),
    danger: smoothstep(0.2, 0.33, p) * (1 - smoothstep(0.37, 0.43, p)),
    structure: smoothstep(0.28, 0.6, p),
    verdict: smoothstep(0.66, 0.82, p),
    calm: smoothstep(0.85, 1, p),
    agents: smoothstep(0.18, 0.42, p),
  };
}
