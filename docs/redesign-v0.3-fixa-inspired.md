# AM Shift — v0.3 "Fixa-Inspired Direction" Redesign Plan

> Status: PLAN ONLY — not implemented. Awaiting approval.
> Principle: import Fixa's **style, motion philosophy, nav behavior, scroll
> choreography, and restraint** — NOT its content, warmth, or assets.
> Preserved: product positioning, the five-beat narrative, rollback to v0.1.

Core reframe: **animate the page, not the object.** Stop drawing infrastructure
that moves; direct a restrained, layered product film where one thing moves at a
time and the page itself is the cinema. Target reference = Apple / Vercel /
Linear product film, NOT a consumer app.

### Locked decisions (approved)
1. **Hero:** "First Light" (dawn-over-system metaphor).
2. **Warmth:** warm **accents only** — stay dark throughout; warmth is rim-light
   / glow accents. NO light panels (verdict stays dark, warm-accented).
3. **Hero asset:** build the light visual **in-code now** (canvas/CSS/WebGL),
   keep the option to swap a rendered video later.
4. **Branch:** start `v0.3-fixa-inspired-direction` from the
   `v0.1-foundation-freeze` tag.

---

## 1. New page structure

Same five beats, delivered as **layered panels** — each a rounded-top surface
that slides up over the previous, with a register (color/light) shift and ONE
dominant motion.

| # | Panel | Register | One dominant motion | Beat |
|---|-------|----------|---------------------|------|
| 0 | **Hero** | deep night → warm first-light | the single ambient light loop | mystery / promise |
| 1 | **Problem** | graphite, cool | headline rises once | "too complex for humans" |
| 2 | **The shift / agents** | warm-tinted dark | one composed "agents enter" beat | manual → autonomous |
| 3 | **Reasoning** | near-black, focused | product/console card assembles once | investigate every layer |
| 4 | **Resolution / Verdict** | dark, focused (warm accent) | the verdict card reveals once | root cause found |
| 5 | **Trust** | dark, serious | quiet logo/stat reveal | enterprise readiness |
| 6 | **Final CTA + footer** | calm dark | CTA settles once | invitation |

Each panel overlaps the previous with a large rounded top radius; the outgoing
panel dims/scales back slightly (camera depth). Per locked decision the page
stays **dark throughout**; contrast comes from warm rim-light/glow accents and
register temperature shifts (cool dark ↔ warm dark), not from light panels.

## 2. Hero concept — "First Light" (the AM in AM Shift)

Full-viewport, **one** dominant cinematic loop conveying *calm intelligence
arriving* — not a topology, not particles. The metaphor: **dawn over a dark
system** ("AM" = morning shift; light = clarity/autonomy replacing manual dark).
This introduces warmth naturally and is ownable.

- Visual: a slow, filmic field of deep indigo/teal night giving way to a warm
  gold rim of first light on a low horizon; gentle volumetric drift. ONE slow
  continuous motion. No nodes, no packets.
- Cold open (keep the validated "wonder before information"): darkness → first
  light breaks → headline resolves. Delivered via light/composition, not dots.
- Type over it: "The operating system for engineering *intelligence*." — the
  emotional word set in an **italic serif** accent. Product-clarity subline
  retained. One CTA pill. Optional Fixa-style floating bottom bar.
- Build: start as a controlled lightweight canvas/CSS/WebGL light-flow (full
  art-direction control, zero asset pipeline); OPTION to upgrade to a rendered
  looped video later for maximum cinematic quality. Alt hero concept if dawn
  reads too literal: a single calm "intelligence core" that slowly breathes.

## 3. Floating pill nav

- Top-center rounded-full capsule: `AM Shift` wordmark + compact menu (a small
  set of links or a menu glyph). Translucent surface, subtle blur, hairline
  border, soft shadow — reads as a designed object inside the composition.
- Persists across panels; stays small; may condense slightly on scroll.
- Optional matching **floating bottom CTA bar** on the hero ("Request a demo" +
  one supporting line), Fixa-style.
- Replaces the current full-width nav (chrome).

## 4. Section / panel scroll choreography

- Native scroll, **no hijacking**. Scroll-linked reveals (Framer `useScroll` /
  `whileInView`), each firing once.
- Panel = rounded-top surface; incoming panel translates up and overlaps the
  outgoing one, which dims + scales back ~2–4% (depth/camera pull).
- Register cross-fades between panels (dark→warm→light→dark) carry the film.
- One dominant motion per panel; everything else holds still.
- Slow, confident easing (`cubic-bezier(0.16,1,0.3,1)`), 0.8–1.4s, generous
  holds. Adaptive scroll-sync retained from Sprint 1.1.

## 5. Visual language

- **Palette:** keep the deep base (`#0B1220` family) and add a **warm
  counter-tone** (gold/amber first-light, warm-dark `#15110C`) for depth and
  temperature contrast. Per locked decision: **no light panels** — stay dark,
  warmth is rim-light/glow only. One cool accent (electric blue/cyan) used
  sparingly; warm gold as the cinematic secondary.
- **Surfaces:** large rounded corners (24–32px), soft shadows, translucency,
  contained product cards.
- **Typography:** Geist/Inter grotesque + a new **italic serif display**
  (candidates: Instrument Serif, Newsreader, Hedvig Letters) used on ONE word
  per headline. Two-tone text (bright lead + dim remainder). **Boxed keyword
  highlights** (rounded chip behind a phrase) — these REPLACE the pervasive mono
  telemetry. Pill eyebrow labels. Mono demoted to a rare whisper.
- **Imagery:** abstract cinematic light/depth + tasteful contained product/
  "console" cards (the verdict shown as a calm card). NO topology diagrams, NO
  status-warning theater.

## 6. Motion rules (the law)

1. ONE dominant motion per beat; everything else still.
2. Slow, confident easing; long durations; generous holds.
3. Native scroll, no hijack; reveals fire once.
4. Hero = the single continuously "alive" element (the light loop).
5. Panel transitions = slide-up + slight dim/scale of outgoing (depth).
6. Micro-interactions minimal (nav, CTA).
7. `prefers-reduced-motion` → static composed frames, instant reveals.
8. Performance: transform/opacity + one lightweight visual; retire multi-system
   rAF. Target 60fps, light mobile.

## 7. Keep / Replace / Delete

**Keep (restyle):** narrative order + all copy/positioning; `Button`; `Reveal`;
fonts/layout infra; tokens (extend with warm + light + serif); `useReducedMotion`;
the Verdict *content* (reframed as a card); Final CTA / Invitation copy.

**Replace:** `TopNav` → `FloatingNav` (pill). `ScrollAct` → `Panel` (layered
rounded surface). `ColdOpen` → `HeroFirstLight`. `Verdict` → contained
`VerdictCard` on a dark, warm-accented panel (same content).

**Delete / retire (preserved by the v0.1 tag + v0.2 branch):** `SystemCanvas`
(topology engine), `lib/graph.ts`, the `lib/scene.ts` danger/agent/packet
machinery, mono telemetry labels, chaos/warning systems.

**Add:** `PanelStack` + `Panel`; `HeroFirstLight` (light visual); `FloatingNav`;
optional `FloatingCTABar`; `KeywordHighlight`; `SerifAccent` usage; `ProductCard`
/ `VerdictCard`.

## 8. Migration strategy

- Branch **`v0.3-fixa-inspired-direction` off the `v0.1-foundation-freeze` tag**
  (clean baseline — avoids inheriting canvas debt we're deleting; v0.1 already
  contains all sections + copy).
- Keep `cinematic-refinement-v2` intact as the **polished-canvas fallback** in
  case the new direction underperforms; tag its tip `v0.2.1-canvas-final`.
- Incremental, each sprint shippable + verified via headless screenshots:
  - **S1 — Skeleton:** tokens/fonts (serif), `FloatingNav`, `Panel`/`PanelStack`,
    hero shell with placeholder light.
  - **S2 — Hero:** "First Light" loop + restaged cold open.
  - **S3 — Panels 1–3:** Problem, Shift/Agents, Reasoning as composed beats.
  - **S4 — Payoff:** VerdictCard (light panel), Trust, Final CTA.
  - **S5 — Polish:** motion timing, reduced-motion, mobile, performance.
- Verify cold open at t=0 (no text) and one-motion-per-beat each sprint.

## 9. Versioning plan

- New branch: `v0.3-fixa-inspired-direction` (from `v0.1-foundation-freeze`).
- Tags: keep `v0.1-foundation-freeze`; add `v0.2.1-canvas-final` (canvas peak);
  on validation, tag `v0.3.0-fixa-direction`.
- CHANGELOG: new `## v0.3` section, per-sprint entries (what / visual purpose /
  files / rollback), same discipline.
- Temporary build marker continues as `v0.3-...`.
- No branches deleted — every prior direction remains a rollback point.

## 10. Risks & tradeoffs

- **Losing "advanced infra" credibility** by going too soft/consumer. → Keep
  serious copy, restrained palette, an enterprise Trust panel; warmth as accent
  only; reference Apple/Vercel, not a lifestyle app.
- **Hero light could read as generic AI gradient** (a known cliché). → Make it
  specific (dawn-over-system metaphor, controlled palette, one slow motion);
  consider a rendered video; strong art direction required.
- **Layered-panel scroll can feel gimmicky or janky.** → Transform/opacity only,
  `will-change`, 60fps test, reduced-motion fallback; keep overlaps subtle.
- **Italic-serif + grotesque pairing can feel templated-editorial.** → Restraint:
  one accent word, deliberate pairing, not everywhere.
- **Bespoke cinematic asset production** (can't reuse Fixa's). → Start with a
  controlled canvas/CSS light (more control, risk of synthetic look); optionally
  upgrade to a rendered loop later.
- **Discarding polished, validated canvas work** (sunk cost). → It's the right
  call for the direction; fully preserved via tag + branch.
- **"Less motion" reads as "less sophisticated" to some stakeholders.** → Manage
  expectations: restraint = premium; demonstrate with the hero first.
- **Staying all-dark (no light panels)** risks lower contrast variety. → Use
  warm↔cool temperature shifts + rim light for cinematic register changes.
- **Scope:** substantial rebuild. → Phased, each sprint shippable; fallback
  branch always available.

---

### Decisions — RESOLVED
1. Hero → **First Light (dawn)**.
2. Warmth → **warm accents only, no light panels**.
3. Hero asset → **in-code now, video later**.
4. Branch → **from `v0.1-foundation-freeze`**.

Plan is finalized and ready to execute on approval (Sprint 1 = skeleton).
