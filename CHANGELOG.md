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

---

## v0.2-cinematic-refinement — Sprint 1.1 (correction pass)

Correction of Sprint 1 execution. Verified the live build first (a stale build
was causing the "text at frame zero" reports): the served HTML renders the
headline at `opacity:0`, and headless captures confirm t=250ms / t=1400ms show
NO text — only darkness and the awakening system — with the headline resolving
~2.5s+. A temporary `v0.2-sprint1.1` marker (bottom-left, mono, low opacity)
was added so reviewers can confirm they're on the right build.

### Changes
- **Cold open** — held the seed longer, slowed the outward cascade (second
  node responds at ~0.18 of the intro), so the system clearly awakens before
  any words. Headline/sub/CTA remain withheld until ~2.5s+.
- **Agent arrival** — added an expanding **scan-sweep ring** per agent after
  landing, bigger flare, and pathway activation; retimed the trigger to p≈0.42
  so danger has cleared and the awakening reads as a distinct event, not chaos.
- **Hero → Chaos handoff (softened)** — `danger` now starts at p≈0.20 and
  ramps gently, peaking deep in the act (~p 0.33) then releasing by ~p 0.42.
  No more instant overload on the first scroll.
- **Chaos discipline (premium restraint)** — removed full-screen confetti and
  any red-on-blue (no pink); warnings are now **amber-only and localized** to
  stressed infrastructure nodes (sources + coordinator). Broken links flicker
  only along real edges, only deep in chaos. Lower density overall.
- **Mobile** — reduced particle/packet density, dropped broken links and node
  labels, smaller flares, hid the scroll hint, tightened hero + final-CTA
  spacing.
- **Scroll sync** — adaptive smoothing: elegant lag on small moves, fast
  catch-up on fast scroll so text and canvas stay in sync.

### Files modified
- `components/system/SystemCanvas.tsx` — staged cold-open tuning, scan sweep,
  localized/amber-only chaos, mobile density, adaptive smoothing.
- `lib/scene.ts` — retimed the `danger` scalar (later start, earlier release).
- `components/acts/ColdOpen.tsx` — mobile CTA spacing, hide scroll hint on
  mobile.
- `components/acts/Invitation.tsx` — final-CTA + footer spacing on mobile.
- `components/nav/TopNav.tsx` — (Sprint 1) nav delay retained.
- `app/page.tsx` — TEMPORARY `v0.2-sprint1.1` build marker.

### Explicitly NOT touched
Root-cause/verdict sequence, verdict card, final CTA content, packet trails,
color progression, tempo contrast, non-hero section transitions, architecture,
component structure.

### Rollback
Still safe — `git checkout v0.1-foundation-freeze`. All work remains on
`cinematic-refinement-v2`; baseline commit + tag untouched.
