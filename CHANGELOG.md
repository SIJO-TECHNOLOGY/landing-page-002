# Changelog

Freeze-and-refine release model. This branch (`v0.3-fixa-inspired-direction`) is
a new creative direction cut from the `v0.1-foundation-freeze` baseline.

## Prior directions (preserved, not on this branch)
- **`v0.1-foundation-freeze`** (tag) — validated cinematic MVP baseline.
- **`v0.2.x` / `cinematic-refinement-v2`** (branch, tag `v0.2.1-canvas-final`) —
  the polished persistent-canvas / topology direction. Kept as a fallback.

---

## v0.3 — Fixa-inspired direction

Reframe: **animate the page composition, not a system object.** Retire the
full-screen topology canvas in favor of a restrained, layered "product film" —
floating pill nav, sticky layered panels, editorial typography, one dominant
motion per beat, dark throughout with warm "First Light" accents. Product
positioning and the five-beat narrative are preserved. Plan:
`docs/redesign-v0.3-fixa-inspired.md`.

### Sprint 1 — Skeleton

**Changes**
- **Version/branch:** tagged `v0.2.1-canvas-final` (canvas fallback); cut
  `v0.3-fixa-inspired-direction` from `v0.1-foundation-freeze`.
- **Tokens & fonts:** added warm counter-tone tokens (`--color-warm`,
  `--color-warm-strong`, `--color-warm-dark`, `--color-panel-cool/warm`) and the
  editorial italic-serif accent face (Instrument Serif → `--font-serif`).
- **`FloatingNav`:** top-center translucent pill (wordmark + Request demo) — an
  object in the composition, not chrome.
- **`Panel` / `PanelStack`:** sticky layered surfaces; each panel slides up over
  the previous (rounded top + soft shadow) for one continuous film.
- **`HeroFirstLight` (shell):** static composition of the "dawn over a dark
  system" hero — deep night → warm first-light band, headline with the italic-
  serif accent on *intelligence*, product-clarity subline, CTA. (Animated light
  + cold open land in Sprint 2.)
- **`page.tsx`:** new skeleton — nav + hero + placeholder Problem/Shift/Reasoning
  /CTA panels demonstrating the layered choreography + cool↔warm register shifts.
- **Removed** (preserved by v0.1 tag + v0.2 branch): `SystemCanvas`,
  `lib/graph.ts`, `lib/rng.ts`, `lib/scene.ts`, `TopNav`, and the old act
  components (`ColdOpen`, `ScrollAct`, `Verdict`, `Invitation`).
- Temporary `v0.3-sprint1` build marker (bottom-left).

**Verified (headless):** floating pill nav; hero with warm italic-serif accent;
the layered panel slide-up seam (Problem panel rising over the pinned hero);
cool→warm register shift; mobile hero. `npm run build` passes.

**Files:** `app/globals.css`, `app/layout.tsx`, `app/page.tsx`,
`components/nav/FloatingNav.tsx`, `components/panels/{Panel,PanelStack}.tsx`,
`components/hero/HeroFirstLight.tsx` (+ deletions above).

**Not yet built (later sprints):** animated First Light + cold open (S2);
full Problem/Shift/Reasoning panels (S3); VerdictCard + Trust + Final CTA (S4);
motion/reduced-motion/mobile/perf polish + panel depth dim/scale (S5).

### Sprint 1.5 — Visual world (adjustment)

Fixed the "beautiful typography in emptiness" problem: adopted Fixa's *soul*
(immersive composition), not just its grammar. No new animation, no particles.

**Changes**
- **`Atmosphere`** (new) — a static cinematic dawn-landscape WORLD per panel,
  built from layered CSS only: deep sky → volumetric dawn light → haze band →
  silhouetted monolith forms with foreground/background depth → atmospheric
  fog → vignette. Parametrized by `warmth` and `sunX`.
- **First Light progression** — `warmth` ramps across the page (hero 0.2 →
  problem 0.05 darkest/coolest → shift 0.42 → reasoning 0.6 → CTA 0.92 full
  warm), so the experience evolves from dark uncertainty to warm confidence.
- **Composition asymmetry** — `Panel` refactored to host the atmosphere behind
  a free-form content layer; panels now break symmetry (hero low-left, problem
  upper-right, shift low-left, reasoning center-right, CTA center) with real
  foreground/background separation.
- **De-engineered hero copy** — removed all infrastructure language from the
  hero (no Kafka/Kubernetes/logs); hero now leads with emotional confidence
  ("Clarity, the instant everything breaks."). Product/infra detail moved to
  the mid-page Reasoning beat.
- Marker → `v0.3-sprint1.5`.

**Verified (headless):** atmospheric depth + monolith silhouettes + volumetric
light on every panel; the dark→warm arc across hero→problem→reasoning→CTA;
asymmetric composition; build passes.

**Files:** `components/atmosphere/Atmosphere.tsx` (new),
`components/panels/Panel.tsx`, `components/hero/HeroFirstLight.tsx`,
`app/page.tsx`.

### Sprint 1.7 — Atmosphere refinement

Refine the static world only (no motion, no structural/copy/nav/type changes).

**Changes**
- **Removed monolith forms entirely** — no towers/skyline/slabs/architecture.
  Replaced with pure atmospheric abstraction: a broad volumetric light plane,
  layered haze fields, translucent spatial gradients.
- **Real atmospheric-perspective depth** — no blurred foreground objects.
  Depth now comes from graded haze with opacity falloff (denser/nearer low,
  fainter/farther high), gradient recession, and foreground density.
- **Cold valley** — light hue now recedes cold-blue (warmth 0) → warm-gold
  (warmth 1), and a deep-blue "uncertainty wash" activates at low warmth.
  Problem set to warmth 0 (was 0.05) → emotionally colder than the hero
  (0.22). Curve: hero 0.22 → problem 0 → shift 0.42 → reasoning 0.6 → CTA 0.92.
- Marker → `v0.3-sprint1.7`.

**Verified (headless):** no architectural forms anywhere; spatial atmospheric
depth on every panel; a clear cold-blue Problem valley vs. warm hero/CTA; build
passes.

**Files:** `components/atmosphere/Atmosphere.tsx` (rewritten),
`components/hero/HeroFirstLight.tsx` (warmth), `app/page.tsx` (Problem warmth).

### Rollback
- To the canvas direction: `git checkout v0.2.1-canvas-final`.
- To the original baseline: `git checkout v0.1-foundation-freeze`.
- Both are untouched; v0.3 is isolated on its own branch.
