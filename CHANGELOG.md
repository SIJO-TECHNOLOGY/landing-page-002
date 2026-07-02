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

## v0.3 — Sprint 2 (motion: quietly alive)

Make the page come alive with extreme restraint — one dominant movement per
moment, everything else still. No particles, no topology, no glow-everywhere,
no SaaS fade-up sequences. Three coordinated motions, nothing more.

**Changes**
- **Cold open (hero):** the first light slowly **blooms in** on load (~3.8s,
  opacity + gentle scale/rise on the light group only). Typography is present
  and **still** — no text animation.
- **Signature dawn:** the light/haze group is bound to page scroll and **drifts
  upward** across the journey (the sun advancing). The one signature motion.
- **Panel glide:** outgoing panels **recede as composition surfaces** — a subtle
  scale-down + dim as the next slides over (depth/camera), not a flat slide.
  The sticky shell stays intact; only an inner layer transforms.
- Typography and floating nav: unchanged, still/calm.
- All motion is `prefers-reduced-motion` guarded → fully static fallback.
- Marker → `v0.3-sprint2`.

**Verified (headless):** cold-open bloom over time with still typography; panel
recession at the seam; build passes.

**Files:** `components/atmosphere/Atmosphere.tsx` (client + motion),
`components/panels/Panel.tsx` (client + recession),
`components/hero/HeroFirstLight.tsx` (coldOpen prop).

## v0.3 — Sprint 2.5 (intensity pass)

Precision intensity tuning of the EXISTING three motion systems only. No new
motion, no new animated elements, no typography animation, no composition
change. Discipline preserved — magnitudes/timing/colors only.

**System 1 — Cold open (highest priority):** the world now begins genuinely
darker (darker base, base only mildly warm-reactive — warmth carried by the
light plane). The bloom is slower and more gradual (3.8s→5.6s, front-loaded
easeOut → gentle ease so the dawn arrives perceptibly), travels further
(scale 0.94→0.8, y 16→64), and arrives stronger (light plane intensity up,
hero warmth 0.22→0.28). Larger dark→dawn contrast. Typography still.

**System 2 — Dawn drift + temperature:** scroll drift travel increased
(`7%→-24%` ⇒ `13%→-42%`) so the world is felt evolving while scrolling; warmth
progression widened (problem 0, shift 0.42→0.48, reasoning 0.6→0.68,
CTA 0.92→0.98). Still slow + subtle.

**System 3 — Panel glide (lowest priority):** outgoing recession slightly
deeper — dim more (opacity 0.55→0.4) and a touch more scale (0.96→0.945).

**Files:** `components/atmosphere/Atmosphere.tsx`, `components/panels/Panel.tsx`,
`components/hero/HeroFirstLight.tsx`, `app/page.tsx`. Marker `v0.3-sprint2.5`.

**Verified (headless):** t=0 genuinely dark → gradual bloom → stronger settled
warm presence (text static throughout); stronger warm CTA; build passes.

## v0.3 — Sprint 3 (continuity architecture)

Continuity review scored the cover/reveal model a failing ~4.9 — every sticky
panel seam read as a scene cut, and self-contained per-panel backgrounds made
spatial persistence impossible. This is the architectural replacement (approved).

**One Continuous Dawn** — replace the per-panel cover/reveal with one evolving
world:
- **`DawnEnvironment`** (new): a single `fixed` full-viewport surface rendered
  once, evolving continuously with global scroll via 3 CSS variables
  (`--w` warmth, `--sunx`, `--lighty`) set in a rAF-throttled scroll handler.
  The cold→warm spine + the rising/drifting light are now the visible
  continuous backbone — **no panel edges, ever**. `color-mix` carries the
  continuous cold-blue↔warm-gold hue. Cold-open bloom on load (`dawnBloom`
  keyframes).
- **`Beat`** (new): transparent, normal-flow content sections over the fixed
  world — no background, no sticky, no seam. Subtle scroll-linked reposition +
  cross-dissolve so statements melt into one another (the camera travels;
  text drifts gently). Reduced-motion → static.
- **Removed:** `Panel`, `PanelStack`, per-panel `Atmosphere` (the cover/reveal).
- `HeroFirstLight` is now content-only; `page.tsx` = `DawnEnvironment` + a
  single column of `Beat`s. Marker `v0.3-sprint3`.

**Verified (headless):** the old seam zone now shows two statements
cross-dissolving over one unbroken environment (no edge); cold open dark→bloom;
continuous cold→warm to a full warm CTA; build passes.

## v0.3 — Sprint 3.1 (scroll smoothness — eased follow)

Review verdict on Sprint 3: the continuous-world architecture is correct, but it
felt stepped when scrolling — because it was sampled straight from raw `scrollY`
with no smoothing, inheriting the wheel's coarse chunks. Tuning, not a rebuild.

**Changes (`DawnEnvironment` only):**
- **Eased scroll-follow (the fix):** replaced the scroll-throttled "set vars from
  scrollY" with a persistent rAF loop that eases a smoothed progress toward the
  scroll target each frame (`cur += (target − cur) * EASE`) and renders the world
  from `cur`. The world now glides continuously even when input arrives stepped.
  The loop parks itself once settled and re-arms on scroll/resize. Reduced-motion
  → `EASE = 1` (snaps, no smoothing lag). Feel-tuned `EASE = 0.12` (measured
  hand→world trailing lag 139 ms; 0.08 was 207 ms / too floaty) for an
  Apple/Stripe-tight coupling that still smooths the wheel and stays cinematic.
- **GPU-composited light motion:** the camera's horizontal drift moved off the
  gradient's `at <x>%` position (which repainted every frame) onto a single
  `translate3d(var(--lightx), var(--lighty), 0)` with `will-change: transform`;
  the light-plane gradient is now pinned at `62% 74%`. Only the warmth hue
  repaints, and the eased follow keeps its per-frame step tiny.
- Marker → `v0.3-sprint3.1`.

**Verified (headless):** jumping scroll to the bottom yields 43 distinct `--w`
values across 45 frames (was an instant 1-frame jump) — warmth eases through the
cold valley and climbs smoothly; `--lighty` glides 16%→−19.85% on the composited
transform; build passes.

### Rollback
- To the beautiful panels state (pre-continuity): `git checkout v0.3.2-panels-final`.
- To the canvas direction: `git checkout v0.2.1-canvas-final`.
- To the original baseline: `git checkout v0.1-foundation-freeze`.
- All untouched; v0.3 is isolated on its own branch.
