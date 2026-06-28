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

*Motion restraint pending: page is 100% static by instruction; the "one dominant movement" dimension is deferred to Sprint 2 — scored neutral, not earned.

## v0.3 Issue Tracker

Status: 🔴 open · 🟡 partial · 🟢 resolved

| # | Severity | Issue | Status |
|---|---|---|---|
| V3-1 | Critical | Elegant void — every section text on near-black, no world/depth | 🟢 (resolved @ R2 — atmospheric dawn world: monoliths + volumetric light + haze + vignette behind every panel) |
| V3-2 | Critical | Spatial depth nearly absent, page flat (4.5) | 🟢 (resolved @ R2 — real fg/bg separation via scaled blurred monoliths + dawn + vignette; depth 4.5→7.0. See V3-7 for remaining ceiling) |
| V3-3 | High | Composition = centered statements stacked, symmetric/monotone | 🟢 (resolved @ R2 — asymmetric per beat: hero left, problem upper-right, shift lower-left, reasoning right, CTA center) |
| V3-4 | High | "First Light" warmth has no ARC | 🟡 (mostly resolved @ R2 — genuine dark→warm arc to the CTA; BUT the PROBLEM beat still shows a warm bottom band, so the cool "valley" is missing — see V3-8) |
| V3-5 | High | Copy observability-SaaS & literal | 🟢 (resolved @ R2 — hero de-engineered to "Clarity, the instant everything breaks"; infra detail relocated to Reasoning beat where it belongs) |
| V3-6 | Medium | Motion: needs one dominant page-level move | 🟡 (deferred — page 100% static by instruction; revisit Sprint 2) |
| V3-7 | High | NEW @ R2: the monoliths are the weak link — dark rounded-rectangle slabs read as a blurred bar-chart / generic towers, and the SAME ~6-slab layout repeats identically on every beat. The "world" is one static backdrop slid behind each text block, not an evolving environment. Soften toward pure light/haze/horizon forms AND vary per beat | 🔴 |
| V3-8 | Medium | NEW @ R2: warmth arc lacks a valley — PROBLEM should be the coolest/darkest low point but still carries a warm bottom band. Push it genuinely cold/blue so the dawn payoff at the CTA lands harder | 🔴 |
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

<!-- Next review appended below. -->
