/**
 * The system graph: the named infrastructure + AM Shift agents that the
 * canvas renders. Each node carries 7 keyframe positions (see ACT_BOUNDS):
 *   ambient → ambient(hold) → chaos → mid → pipeline → converge → calm
 *
 * All positions are in a normalized space (~[-1.1, 1.1]); the canvas maps
 * them to pixels. Layout is seeded and deterministic.
 */
import { mulberry32 } from "./rng";
import { lerpVec, type Vec } from "./scene";

export type NodeKind =
  | "source"
  | "coordinator"
  | "agent"
  | "normalize"
  | "reason"
  | "root";

export interface SystemNode {
  readonly id: string;
  readonly label: string;
  readonly kind: NodeKind;
  readonly keyframes: readonly Vec[];
}

export interface SystemEdge {
  readonly from: number;
  readonly to: number;
}

export interface SystemGraph {
  readonly nodes: readonly SystemNode[];
  readonly edges: readonly SystemEdge[];
}

interface Seed {
  id: string;
  label: string;
  kind: NodeKind;
  pipeline: Vec;
}

const SEEDS: readonly Seed[] = [
  { id: "logs", label: "elk.logs", kind: "source", pipeline: { x: -1.0, y: -0.85 } },
  { id: "db", label: "oracle.db", kind: "source", pipeline: { x: -1.0, y: -0.51 } },
  { id: "kafka", label: "kafka.orders", kind: "source", pipeline: { x: -1.0, y: -0.17 } },
  { id: "api", label: "payments.api", kind: "source", pipeline: { x: -1.0, y: 0.17 } },
  { id: "k8s", label: "k8s.cluster", kind: "source", pipeline: { x: -1.0, y: 0.51 } },
  { id: "ext", label: "service-b.ext", kind: "source", pipeline: { x: -1.0, y: 0.85 } },
  { id: "coordinator", label: "coordinator", kind: "coordinator", pipeline: { x: -0.5, y: 0 } },
  { id: "agent-log", label: "agent://log", kind: "agent", pipeline: { x: -0.05, y: -0.6 } },
  { id: "agent-db", label: "agent://db", kind: "agent", pipeline: { x: -0.05, y: -0.2 } },
  { id: "agent-api", label: "agent://api", kind: "agent", pipeline: { x: -0.05, y: 0.2 } },
  { id: "agent-infra", label: "agent://infra", kind: "agent", pipeline: { x: -0.05, y: 0.6 } },
  { id: "normalize", label: "normalize", kind: "normalize", pipeline: { x: 0.4, y: 0 } },
  { id: "reason", label: "reason", kind: "reason", pipeline: { x: 0.72, y: 0 } },
  { id: "root", label: "root-cause", kind: "root", pipeline: { x: 1.0, y: 0 } },
];

function indexById(id: string): number {
  return SEEDS.findIndex((s) => s.id === id);
}

const EDGE_PAIRS: ReadonlyArray<[string, string]> = [
  ...["logs", "db", "kafka", "api", "k8s", "ext"].map(
    (s) => [s, "coordinator"] as [string, string],
  ),
  ...["agent-log", "agent-db", "agent-api", "agent-infra"].map(
    (a) => ["coordinator", a] as [string, string],
  ),
  ...["agent-log", "agent-db", "agent-api", "agent-infra"].map(
    (a) => [a, "normalize"] as [string, string],
  ),
  ["normalize", "reason"],
  ["reason", "root"],
];

export function buildSystemGraph(seed = 0x5f3a91): SystemGraph {
  const rand = mulberry32(seed);
  const onCircle = (minR: number, maxR: number): Vec => {
    const angle = rand() * Math.PI * 2;
    const r = minR + rand() * (maxR - minR);
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  };

  const nodes: SystemNode[] = SEEDS.map((seedNode) => {
    const ambient = onCircle(0.16, 0.5);
    const chaos = onCircle(0.55, 1.15);
    const pipeline = seedNode.pipeline;
    const mid = lerpVec(chaos, pipeline, 0.45);
    // Everything collapses into the answer at the center, then breathes out
    // to a calm ring.
    const converge = onCircle(0.0, 0.12);
    const calm = onCircle(0.3, 0.44);

    return {
      id: seedNode.id,
      label: seedNode.label,
      kind: seedNode.kind,
      keyframes: [ambient, ambient, chaos, mid, pipeline, converge, calm],
    };
  });

  const edges: SystemEdge[] = EDGE_PAIRS.map(([from, to]) => ({
    from: indexById(from),
    to: indexById(to),
  }));

  return { nodes, edges };
}
