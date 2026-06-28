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

### Rollback
- To the canvas direction: `git checkout v0.2.1-canvas-final`.
- To the original baseline: `git checkout v0.1-foundation-freeze`.
- Both are untouched; v0.3 is isolated on its own branch.
