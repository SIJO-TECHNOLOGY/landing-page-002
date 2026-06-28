# Changelog

All notable cinematic-refinement work is tracked here, per sprint. The project
follows a freeze-and-refine release model: `v0.1-foundation-freeze` is the
validated baseline; refinements land on the `cinematic-refinement-v2` branch.

---

## v0.1-foundation-freeze (baseline)

Validated cinematic MVP. Concept ("One System, One Journey"), architecture
(persistent SystemCanvas + scroll-driven five acts), and implementation
confirmed by multiple independent reviews.

- Stable rollback point: `git checkout v0.1-foundation-freeze`

---

## v0.2-cinematic-refinement — Sprint 1

Execution-quality refinement only. No redesign, no architecture changes, no new
sections. Targets the three weaknesses all reviewers converged on.

### Changes

**A. Re-staged the Cold Open (wonder before information)**
- Slowed and staged the ignition over ~3s: a single seed signal pulses alone →
  a second node responds → the topology expands outward node-by-node (nearest
  to center first) → edges form only once both endpoints exist → the system
  breathes.
- The headline is now withheld until ~2.5s (was ~0.9–1.3s), so the canvas owns
  the screen alone first. The system awakens; only then does information appear.
- Visual purpose: replace "normal website hero" timing with Apple-reveal
  pacing — the user should feel something intelligent waking up.

**B. Made Agent Arrival a real event**
- Four agents now fly in from offscreen edges (log←left, db↑top, api→right,
  infra↓bottom) with overshoot (easeOutBack), an 90ms stagger, a white light
  flare on arrival, and a brief pathway activation that lights the edges they
  connect to. Triggered as a discrete, re-armable event when scroll enters the
  Awakening act.
- Visual purpose: turn a near-invisible fade into one of the strongest beats —
  intelligent entities arriving to investigate.

**C. Made Chaos feel dangerous**
- Added a sustained `danger` plateau across the Chaos act driving: node jitter,
  broken/transient connections that flicker in and out, erratic + reversing
  packet flow, an intensified amber→red noise field, irregular node pulsing,
  and amber/red warning tints.
- Visual purpose: replace "elegant calm particles" with system distress, so the
  later return to order delivers real emotional contrast and relief.

### Files modified
- `components/system/SystemCanvas.tsx` — staged cold-open reveal, unified node
  `presence` model, agent arrival event + flare, chaos `danger` rendering.
- `lib/scene.ts` — added `easeOutBack` (overshoot) and the `danger` scalar.
- `components/acts/ColdOpen.tsx` — delayed headline/sub/CTA reveal timings.
- `components/nav/TopNav.tsx` — delayed nav fade-in to match the new cold open.

### Explicitly NOT touched
Root-cause/verdict sequence, final CTA, color progression, section transitions,
verdict card, overall architecture, component structure.

### Rollback
- Full revert to baseline: `git checkout v0.1-foundation-freeze`
- Rollback remains safe — all Sprint 1 work is isolated on the
  `cinematic-refinement-v2` branch; the baseline commit and tag are untouched.
