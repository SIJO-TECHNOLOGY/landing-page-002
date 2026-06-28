# AM Shift — Independent Design Review Log

> Maintained by the **Independent Creative Director** (external critic). Critique only — never writes product code or modifies implementation.
> **v0.3 FRAMEWORK RESET.** Everything before v0.3 (topology / packets / chaos / agents / persistent-canvas) is **obsolete**. New direction: *"animate the page, not the object."*
> **Benchmark: fixaplan.com** — floating capsule nav, full-bleed cinematic photography as composition, big confident type with italic-serif accents, one dominant movement, discovered warmth, restraint.
> **Emotional target:** *"I don't fully understand what this company does — but I immediately know it's technologically exceptional."*
> Bar to pass: **9.4+/10**. Below that = refine.

---

## v0.3 Score History

| Review | Date | Imm. confidence | Luxury | Composition | Motion restraint | Spatial depth | Nav integration | Typo integration | Emotional confidence | Enterprise seriousness | **Overall** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| v0.3-R1 | 2026-06-28 | 6.5 | 7.0 | 5.5 | 8.0 | 4.5 | 8.5 | 6.5 | 6.0 | 8.5 | **6.5** |
| v0.3-R2 (Sprint 1.5) | 2026-06-28 | 7.5 | 8.0 | 7.5 | 8.0* | 7.0 | 8.5 | 7.5 | 7.5 | 8.0 | **7.7** |
| v0.3-R3 (Sprint 1.7) | 2026-06-28 | 7.5 | 8.5 | 7.5 | 8.0* | 7.5 | 8.5 | 7.5 | 7.8 | 8.5 | **8.0** |

*Motion restraint pending: page is 100% static by instruction; the "one dominant movement" dimension is deferred to Sprint 2 — scored neutral, not earned.

## v0.3 Issue Tracker

Status: 🔴 open · 🟡 partial · 🟢 resolved

| # | Severity | Issue | Status |
|---|---|---|---|
| V3-1 | Critical | Elegant void — every section text on near-black, no world/depth | 🟢 (resolved @ R2 — atmospheric dawn world: monoliths + volumetric light + haze + vignette behind every panel) |
| V3-2 | Critical | Spatial depth nearly absent, page flat (4.5) | 🟢 (resolved @ R2 — real fg/bg separation via scaled blurred monoliths + dawn + vignette; depth 4.5→7.0. See V3-7 for remaining ceiling) |
| V3-3 | High | Composition = centered statements stacked, symmetric/monotone | 🟢 (resolved @ R2 — asymmetric per beat: hero left, problem upper-right, shift lower-left, reasoning right, CTA center) |
| V3-4 | High | "First Light" warmth has no ARC | 🟢 (resolved @ R3 — full arc hero 0.22 → problem 0 (cold) → shift 0.42 → reasoning 0.6 → CTA 0.92) |
| V3-5 | High | Copy observability-SaaS & literal | 🟢 (resolved @ R2 — hero de-engineered to "Clarity, the instant everything breaks"; infra detail relocated to Reasoning beat where it belongs) |
| V3-6 | Medium | Motion: needs one dominant page-level move | 🟡 (deferred — page 100% static by instruction; revisit Sprint 2) |
| V3-7 | High | monoliths read as generic blurred towers, repeated identically per beat | 🟢 (resolved @ R3 — monoliths removed entirely; pure atmospheric abstraction: light plane + haze + recession) |
| V3-8 | Medium | warmth arc lacks a cool valley at PROBLEM | 🟢 (resolved @ R3 — PROBLEM dropped to warmth 0, distinctly cold blue + uncertainty wash) |
| V3-9 | Medium | NEW @ R3: with monoliths gone, the non-text side of each panel is now a quiet near-empty atmospheric gradient — refined but low-presence. The hero (first impression) is the emptiest. NOT to be fixed with more static gradient layers (re-clutter risk) — this is the gap MOTION should fill (Sprint 2: light blooming/drifting in, dawn advancing) | 🟡 |
| V3-WIN | — | WINS: Fixa-grade floating nav (8.5); warm italic-serif accent; de-engineered emotional hero line; real atmospheric world replacing the void; dark→warm arc delivered; restraint preserved. v0.2 over-animation disease fully cured | 🟢 |

## Review v0.3-R1 — 2026-06-28 — Fixa-benchmark creative direction review

**Benchmark studied:** fixaplan.com hero + section 2 (full-bleed cinematic photo, floating capsule nav, composed type with inline chips, one dominant element, real optical depth).
**Subject:** localhost:3000 v0.3 — hero + THE PROBLEM / THE SHIFT / REASONING / final CTA. Page is 5 viewports; consistent system = chip label + centered statement + one warm italic-serif accent word, on near-black, persistent floating capsule nav.

**Scores:** Imm. confidence 6.5 · Luxury 7.0 · Composition 5.5 · Motion restraint 8.0 · Spatial depth 4.5 · Nav 8.5 · Typo 6.5 · Emotional 6.0 · Enterprise 8.5 · **Overall 6.5/10.**

**Core finding:** v0.3 is a real and correct pivot. It took Fixa's *grammar* (floating capsule nav, chip labels, big centered display type with a warm italic-serif accent, dark restraint, discovered warmth) and the over-animation disease of v0.2 is cured. But it stopped at the grammar and skipped Fixa's *soul*: full-bleed imagery, spatial depth, choreographed composition. Result = beautiful typography floating in a void — elegant but empty and flat, at risk of reading as a tasteful template rather than an exceptional company. Depth (4.5) and composition (5.5) are the failures; nav (8.5), restraint (8.0), seriousness (8.5) are the wins.

**FINAL VERDICT: B — Direction is correct but refinement needed.** (Not C: no longer too technical/engineered — solved. Not A: 6.5 < 9.4; half-realized.)

**Directives for v0.4 (experience goals, not implementation):**
1. **Fill the void with depth.** Each statement must sit *inside* a world — atmospheric layers, a single discovered light with real falloff, subtle dimensional motion behind the type. Not particles, not diagrams: atmosphere. (V3-1, V3-2)
2. **Break the centered stack.** Choreograph composition — off-center statements, warmth entering from one side, scale/position varied so the *page* composes as you scroll. (V3-3)
3. **Give "First Light" an arc.** Dark uncertainty at the top → warmth/confidence by the CTA. (V3-4)
4. **Rewrite copy to match the typography.** Less literal infra name-dropping; more confident, mysterious, future-tech language. (V3-5)
5. **Confirm one dominant, deliberate page-level movement per moment.** If motion is only text fade-ups, it's too safe. (V3-6)

---

## Review v0.3-R2 — 2026-06-28 — Sprint 1.5 "Visual World" (commit 53d6514)

**Subject:** localhost:3000 v0.3-sprint1.5 — hero + PROBLEM / SHIFT / REASONING / CTA. Captured the full scroll arc.

**Scores:** Imm. confidence 7.5 · Luxury 8.0 · Composition 7.5 · Motion restraint 8.0* · Spatial depth 7.0 · Nav 8.5 · Typo 7.5 · Emotional 7.5 · Enterprise 8.0 · **Overall 7.7/10** (was 6.5). *static by instruction — motion deferred.

**Core finding:** The single biggest jump in the project's history, and the first build genuinely on the right path. The void is gone. Sprint 1.5 resolved 4 of 6 open V3 issues: a real atmospheric dawn world now sits behind every panel (V3-1, V3-2), composition is asymmetric and choreographed per beat (V3-3), and the copy is de-engineered with the infra detail correctly relocated to Reasoning (V3-5). The dark→warm "First Light" arc resolves at the CTA as intended (V3-4, mostly). Text now sits *inside* a world with depth behind it rather than floating in a void.

**Remaining gap to 9.4:**
- **V3-7 (the monoliths) — the weak link.** They read as dark rounded-rectangle slabs (a blurred bar-chart / generic towers), and the identical ~6-slab layout repeats on every beat — so the "world" is one static backdrop slid behind each statement, not an evolving environment. Soften toward pure light/haze/horizon forms, and vary the arrangement per beat. (Builder already offered this — endorsed.)
- **Depth is real but a shallow diorama** — CSS blur on slabs reads slightly artificial vs true atmospheric distance. Deepen toward graded haze / horizon.
- **V3-8 (warmth valley)** — PROBLEM should be the coolest/darkest low point but still has a warm bottom band. Push it genuinely cold/blue so the dawn payoff lands harder.
- **Motion (Sprint 2)** — it's a beautiful *still*; "the page moves elegantly / one dominant movement" cannot be delivered until motion is reintroduced.

**FINAL VERDICT: B — Direction is correct, refinement needed (strongly trending toward A).** Not C (never was less technical). Not yet A (7.7 < 9.4; monoliths generic, motion pending). The path to 9.4 is now clear and short: fix the monoliths, deepen the atmosphere, carve the warmth valley, then add restrained signature motion in Sprint 2.

**Answers to Builder's questions:**
- *How does the world feel?* Real. The void is gone; this is the first build that feels like an exceptional company rather than a tasteful template. Atmosphere, warmth-arc, and asymmetry all work.
- *What to adjust?* Priority order: (1) **monolith forms** — soften toward light/haze and vary per beat (yes, do the softening you proposed); (2) **deepen atmosphere** toward true distance, not blurred slabs; (3) **warmth curve** — make PROBLEM a genuine cold valley before the dawn; (4) composition is good, keep it. Hold motion for Sprint 2 as planned.

---

## Review v0.3-R3 — 2026-06-28 — Sprint 1.7 "Atmosphere refinement" (commit 1987d2c)

**Subject:** localhost:3000 v0.3-sprint1.7 — hero + PROBLEM (cold valley) + CTA (warm peak) verified; composition/nav/typo untouched per Builder.

**Scores:** Imm. confidence 7.5 · Luxury 8.5 · Composition 7.5 · Motion restraint 8.0* · Spatial depth 7.5 · Nav 8.5 · Typo 7.5 · Emotional 7.8 · Enterprise 8.5 · **Overall 8.0/10** (was 7.7). *static by instruction.

**Core finding:** All three targeted fixes confirmed in browser. Monoliths removed entirely (V3-7 ✓) — the world is now pure atmospheric abstraction, which reads more expensive and more *serious* than the slightly-generic dawn-skyline (Luxury 8.0→8.5, Enterprise 8.0→8.5). Depth is now authentic atmospheric perspective rather than a fake-bokeh diorama (quality up, 7.0→7.5). The cold valley is real — PROBLEM is a distinctly cool deep-blue panel, making the warm CTA dawn pay off (V3-4, V3-8 ✓).

**The trade-off (V3-9):** removing the monoliths also removed the spatial *mass* they provided. The non-text side of each panel is now a quiet, near-empty atmospheric gradient — refined but low-presence; the hero (first impression) is the emptiest. This is the correct trade (generic mass → clean abstraction), but it confirms the **static foundation has now topped out**: further static refinement yields diminishing returns, and the remaining "quietness" should be filled by MOTION, not by adding more static gradient layers (which would re-clutter).

**FINAL VERDICT: B — Direction correct; static foundation is now premium and essentially complete.** The path from 8.0 → 9.4 is no longer static work — it is **motion**. Greenlight Sprint 2.

**Answers to Builder:**
- *How does the world feel?* Genuinely premium and serious now. Pure-atmosphere was the right call over the monoliths. The cold→warm arc reads.
- *Add subtle static light-plane gradients for more spatial interest?* **No.** Don't band-aid the quietness with more static layers — that risks re-cluttering. Leave it clean. The emptiness is motion's job.
- *Move to Sprint 2?* **Yes — greenlit.** The static foundation is premium on its own. Two carries into Sprint 2: (1) the hero's quiet right side is the first impression — let the staged cold open give it presence (light blooming/drifting in), not a flat gradient on load; (2) make the dawn advancing across the scroll the ONE dominant signature movement. Restraint above all: one dominant move per moment, everything else still.

---

<!-- Next review appended below. -->
