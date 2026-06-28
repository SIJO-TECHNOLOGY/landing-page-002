# AM Shift — Independent Design Review Log

> Maintained by the **Independent Creative Director** (external critic). Critique only — never writes product code or modifies implementation.
> **v0.3 FRAMEWORK RESET.** Everything before v0.3 (topology / packets / chaos / agents / persistent-canvas) is **obsolete**. New direction: *"animate the page, not the object."*
> **Benchmark: fixaplan.com** — floating capsule nav, full-bleed cinematic photography as composition, big confident type with italic-serif accents, one dominant movement, discovered warmth, restraint.
> **Emotional target:** *"I don't fully understand what this company does — but I immediately know it's technologically exceptional."*
> Bar to pass: **9.4+/10**. Below that = refine.
>
> **⚖️ CALIBRATION UPDATE (2026-06-28, from R4 onward): review to the CLIENT'S taste, not generic premium standards.** Primary question is no longer "is this well designed?" but **"when I scroll through this page, do I emotionally feel this company is exceptional?"** Weighted scoring:
> 1. **Scroll continuity / cinematic transition — 30%** (highest; "does scrolling feel like moving through one continuous cinematic space?" Stacked sections = failure even if beautiful)
> 2. **Hero first impression — 25%** (first 2–3s emotional confidence)
> 3. **Premium luxury feeling — 20%** (anti–SaaS/dashboard/technical; Apple/Fixa/Stripe/Framer)
> 4. **Composition transformation — 15%** (the page itself changing, not clever object animations)
> 5. **Motion restraint — 5%**
> 6. **Everything else — 5%** (typography, enterprise, depth, technical sophistication — do NOT overweight; do NOT reward implementation cleverness)

---

## v0.3 Score History

| Review | Date | Imm. confidence | Luxury | Composition | Motion restraint | Spatial depth | Nav integration | Typo integration | Emotional confidence | Enterprise seriousness | **Overall** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| v0.3-R1 | 2026-06-28 | 6.5 | 7.0 | 5.5 | 8.0 | 4.5 | 8.5 | 6.5 | 6.0 | 8.5 | **6.5** |
| v0.3-R2 (Sprint 1.5) | 2026-06-28 | 7.5 | 8.0 | 7.5 | 8.0* | 7.0 | 8.5 | 7.5 | 7.5 | 8.0 | **7.7** |
| v0.3-R3 (Sprint 1.7) | 2026-06-28 | 7.5 | 8.5 | 7.5 | 8.0* | 7.5 | 8.5 | 7.5 | 7.8 | 8.5 | **8.0** |
| v0.3-R4 (Sprint 2 — motion) | 2026-06-28 | 8.0 | 8.5 | 7.5 | 9.0 | 8.0 | 8.5 | 8.0 | 8.0 | 8.5 | **8.4** |

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
| V3-6 | Medium | Motion: needs one dominant page-level move | 🟢 (resolved @ R4 — 3 disciplined motions: cold-open bloom, scroll-bound dawn drift, panel-glide recession. One-move-per-moment discipline is exemplary; motion restraint now 9.0) |
| V3-9 | Medium | non-text side of panels is quiet/low-presence; hero emptiest | 🟡 (partly helped @ R4 — cold-open bloom gives the hero right side some life, but bloom is too subtle to fully activate it; tied to V3-10) |
| V3-10 | Medium | NEW @ R4: all three motions dialed TOO SUBTLE to be *felt* — "quietly alive" currently leans "quiet." Cold-open bloom is ~settled by 1–2s (no perceptible "first light arriving"); dawn drift barely perceptible. Philosophy is perfect; magnitude is timid. Nudge bloom + drift UP (keep one-move discipline). Panel glide is the strongest — could push outgoing dim slightly | 🔴 |
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

## Review v0.3-R4 — 2026-06-28 — Sprint 2 "Quietly Alive" (motion, commit 5172ceb)

**Subject:** localhost:3000 v0.3-sprint2. Observed motion specifically (not settled stills): cold-open bloom (hard refresh, early vs settled frames), panel-glide recession (hero→problem seam mid-transition). Dawn drift inferred from the warmth arc; the two most observable motions prioritized.

**Scores:** Imm. confidence 8.0 · Luxury 8.5 · Composition 7.5 · **Motion restraint 9.0** · Spatial depth 8.0 · Nav 8.5 · Typo 8.0 · Emotional 8.0 · Enterprise 8.5 · **Overall 8.4/10** (was 8.0).

**Core finding — the discipline is exemplary.** All three motions confirmed and each follows the one-dominant-move-per-moment rule exactly: (1) cold-open bloom — warm light fills in while typography holds *completely still* (no fade-up); (2) panel glide — the incoming panel rises *over* a pinned, receding outgoing panel (layered camera-reveal, not flat slide) — the strongest of the three, adds real depth; (3) dawn drift — scroll-bound light movement compounding the cold→warm arc. No particles, no clutter, no SaaS sequences. This is the hardest thing to get right and it's right. Motion restraint earns 9.0.

**The one real flaw (V3-10): too subtle to be *felt*.** "Quietly alive" currently leans *quiet*. The cold-open bloom is largely settled by ~1–2s, so it never reads as "first light arriving"; the dawn drift is barely perceptible. The philosophy is perfect; the magnitude is timid. This caps the emotional payoff — "immediately exceptional" needs the aliveness to register, not just exist.

**FINAL VERDICT: B — Direction correct; closest yet (8.4). Fine-tune intensity, do not redirect.** The remaining gap to 9.4 is NOT more motions or different motions — it is dialing the existing three up just enough to be felt, while protecting the discipline. Secondary ceiling: composition's quiet non-text side (V3-9) — the bloom should be strong enough to make the hero's empty right side feel intentional and alive.

**Answer to Builder (intensity question):** Yes — nudge up, you read it right. Priority: (1) **cold-open bloom** — slower + more contrast (start darker, travel further) so first-light visibly *arrives* over ~3–4s; this also activates the empty hero right side (V3-9); (2) **dawn drift** — make it gently perceptible as the signature move; (3) **panel glide** is the best — optionally deepen the outgoing dim a touch for more camera feel. Hold the one-move-per-moment discipline absolutely — that discipline is the achievement; don't trade it for magnitude.

---

## Review v0.3-R4b — 2026-06-28 — RE-SCORE under client-taste weighting (same build, Sprint 2)

Build unchanged (5172ceb); only the standard changed. Re-observed all four seams specifically for scroll continuity.

**Weighted scorecard (client priorities):**
| Priority | Weight | Score | Note |
|---|---|---|---|
| Scroll continuity / cinematic transition | 30% | **5.5** | Structurally premium STACKED SECTIONS — every seam is the same panel-covers-panel cover/reveal (×4). The only whole-journey continuity element (dawn drift) is too subtle to feel. Does NOT read as one continuous cinematic space. |
| Hero first impression | 25% | **7.0** | Premium, confident, but not an emotional knockout; bloom too subtle to register; hero's right side still empty. |
| Premium luxury feeling | 20% | **8.5** | The build's strength — dark, restrained, atmospheric, anti-SaaS. Genuinely expensive-feeling. |
| Composition transformation | 15% | **6.0** | Composition reconfigures in discrete steps (left/right/center), not continuous transformation of one space. |
| Motion restraint | 5% | **9.0** | Exemplary discipline (but now only 5% weight). |
| Everything else | 5% | **8.0** | Typo/nav/depth/seriousness strong — intentionally underweighted. |

**Weighted overall ≈ 6.9/10** (vs 8.4 under the old generic weighting).

**The honest message:** the entire trajectory since v0.3 optimized for premium-restraint and atmosphere — and succeeded (luxury 8.5). But it UNDER-invested in the client's now-#1 priority: continuous cinematic scroll transformation. The architecture itself — discrete full-viewport panels (chip + statement), each replaced by the next via a cover transition — is the ceiling on continuity. **Nudging motion intensity will not fix this.** The fix is structural: make scrolling feel like moving through ONE continuously-transforming space — persistent/shared elements that morph beat-to-beat, an environment that evolves continuously, the dawn as a felt continuous backbone — rather than panels covering panels. (Irony worth noting: the abandoned persistent-canvas concept was continuous *by design*; the real challenge is to recover that continuity WITHOUT the technical/topology aesthetic.)

**FINAL VERDICT (client-calibrated): B — premium foundation is real, but the #1 priority (scroll continuity) is the weakest dimension and needs ARCHITECTURAL attention, not a nudge.**

**Directives, in client-priority order:**
1. **Scroll continuity (the 30%):** re-conceive the seams. Stop covering one panel with the next. Make one space transform continuously — shared/persistent atmospheric and compositional elements that carry and morph across beats. Make the dawn drift the perceptible continuity backbone (this single change serves both #1 and the hero).
2. **Hero (25%):** raise the emotional ceiling of the first 2–3s — the bloom must be *felt*, and the empty right side must become intentional/alive.
3. **Protect luxury (20%):** none of the above may reintroduce SaaS/dashboard/technical feel or busy-ness. Restraint stays.

---

## Review v0.3-R5 — 2026-06-28 — Sprint 2.5, CONTINUITY-FIRST review (client weighting v2)

Client tightened the lens: review ONLY continuity. Ignore typo/luxury/nav/enterprise/composition-beauty (already strong). Method: fine-scrub of the hero→Problem seam (progress 0.07 / 0.13 / 0.18) to judge transition mechanics, not settled panels.

**Finding:** seam mechanism UNCHANGED from Sprint 2. Each panel carries its own self-contained dark background surface; at every seam the next panel **slides up and covers** the pinned, dimming previous panel. At 0.13 a **visible horizontal boundary line** crosses mid-screen (Problem's surface occluding the hero). That boundary IS the scene cut. Nothing from the environment persists across it except the fixed nav (chrome). The cold→warm color arc is the only thing evolving across the whole scroll, but it's slow/subtle and the hard per-panel boundaries dominate perception.

**Continuity-first scorecard:**
| Dimension | Weight | Score |
|---|---|---|
| Scroll continuity | 40% | **4.5** — cover/reveal with visible panel boundaries = scene cuts. Pinned+dim layering adds faint depth but reads as "panel covering panel," not one space. |
| Spatial persistence | 25% | **4.0** — near none; each panel self-contained, hard seam boundary, only the fixed nav persists. |
| Composition transformation | 20% | **4.5** — composition RESETS per panel (occlusion, not morph). |
| Hero emotional impact | 10% | **7.0** — premium/confident; bloom still subtle (unchanged). |
| Motion discipline | 5% | **9.0** — restrained, clean (but now 5%). |

**Weighted overall ≈ 4.9/10. FAILS the primary criterion.**

**Verdict: C (on the primary axis) — continuity still fails. Beautiful, but it reads as sections replacing one another.** Sprint 2.5 did not change the cover/reveal architecture; nudging motion will not fix it. This is architectural.

**Directives (continuity-first, experience goals):**
1. **Kill the visible panel boundary.** The dawn/atmosphere must be ONE continuous surface spanning the whole scroll that evolves — not a stack of per-panel backgrounds occluding each other. You should never see a new panel's top edge arrive.
2. **Persist & morph elements across beats.** The light, and ideally a shared compositional anchor, should carry from one statement to the next and transform — so beats dissolve into each other, not cut.
3. **Make transitions transformations of one space** (camera moving through it / light advancing / type morphing position), not one surface covering another.
4. **The cold→warm arc is the right spine** — make it the VISIBLE continuous backbone with no hard edges interrupting it.
Protect luxury/restraint throughout — but on this review, continuity is the only thing that counts, and it is not yet there.

---

## Review v0.3-R6 — 2026-06-28 — Sprint 3 "Continuity Architecture" (7e23a41), CONTINUITY-FIRST

Builder replaced the architecture (removed Panel/PanelStack/per-panel Atmosphere → single fixed DawnEnvironment + transparent normal-flow Beats). Re-tested the SAME seam (progress 0.13) that exposed the cover/reveal in R5, plus mid (0.50) and CTA (1.0).

**Finding — the fix is real, not a tune.** At 0.13: the hard horizontal panel boundary is GONE. Hero ("intelligence…") drifts up and fades at top while "Modern systems fail" enters from the bottom, both over ONE unbroken gradient — cross-dissolve over a continuous surface, no edge, no occlusion. Across the scroll the dawn is one persistent environment that evolves: cold blue (hero/problem) → silver light band rising (shift, 0.50) → full warm-gold dawn horizon (CTA, 1.0). The cold→warm spine is now the literal visible backbone.

**Continuity-first scorecard (was R5 in parens):**
| Dimension | Weight | Score |
|---|---|---|
| Scroll continuity | 40% | **8.0** (4.5) — seams eliminated; cross-dissolve over one continuous world. Caveat: content still arrives as discrete read-then-fade beats; the WORLD is continuous, the cadence is beat-by-beat. |
| Spatial persistence | 25% | **8.5** (4.0) — one dawn environment persists across the entire scroll and continuously evolves; nothing is replaced. |
| Composition transformation | 20% | **7.5** (4.5) — the world (rising/warming light) transforms continuously; text repositions gently and dissolves through it rather than arriving in fixed surfaces. |
| Hero emotional impact | 10% | **7.0** (7.0) — unchanged; bloom still subtle. |
| Motion discipline | 5% | **9.0** (9.0) — one dominant motion (the dawn); text drifts subtly. |

**Weighted overall ≈ 8.0/10 (was 4.9). PASSES the primary criterion.**

**Verdict: A− / strong B+ — continuity now works.** It reads as traveling through one evolving dawn rather than sections replacing one another. The R5 architectural failure is resolved. Remaining work is TUNING on the new model, not structure:
1. **Content cadence** — statements still read as discrete beats that fade in/out; tie their emergence/dissolve more to the light/camera so they feel born from the world. (Possible "empty-world lull" between beats — confirm in motion it breathes rather than waits.)
2. **Camera travel** — make forward motion slightly more pronounced so it's felt as travel, not only fade+warm.
3. **Hero ceiling** — first 2–3s still has headroom (bloom magnitude, activate the empty right side).
Protect the restraint and the now-continuous spine. This is the right architecture — refine, don't rebuild.

---

## Finding v0.3-F1 — 🟢 RESOLVED @ Sprint 3.1 (v0.3-sprint3.1)

Verified objectively in-browser: after an INSTANT scroll jump 0→3600px, the dawn warmth var (`--w`) eased through 45 distinct interpolated values over 45 frames (0.28→0.37→0.67→0.79→0.86→…→0.98), a decelerating glide = the `(target-cur)*0.08` follow working (not a 1-frame snap). Supporting fix confirmed: the moving light layer now has `will-change: transform` + a translate matrix with NO gradient on it (GPU-composited drift; gradient pinned; only hue repaints). Reduced-motion path EASE=1 (snap) respects opt-out. Stepping cause eliminated. One judgment call left to client: 0.08 is on the dreamier side — raise toward 0.10–0.12 if the trail feels laggy rather than glidey (single knob).

---

## Finding v0.3-F1 (original) — 2026-06-28 — Scroll feels janky / "not smooth" (Sprint 3 DawnEnvironment)

Client reports scrolling up/down is not smooth. Diagnosed in-browser — this is NOT the architecture (continuity is good); it is missing scroll smoothing + repaint cost.

Evidence: DawnEnvironment driven by inline vars `--w/--sunx/--lighty` rewritten directly from raw scrollY each scroll event. `transitionDuration: 0s` on container + all gradient layers; `animationTimeline: auto` (no GPU scroll-timeline); no Lenis/smooth-scroll; `willChange: auto` on full-viewport oklab gradient layers.

Two causes:
1. **No temporal smoothing (primary).** World maps 1:1 to RAW scroll → snaps to each wheel/trackpad chunk instead of gliding. The old canvas had this (`pSmooth += (target-pSmooth)*0.08`); the new model dropped it. This is the eased-follow / Lenis layer that makes Stripe/Apple/Fixa feel buttery.
2. **Per-frame full-screen repaint (amplifier).** Each frame rewrites vars feeding multiple full-viewport oklab gradients → non-compositable full-screen repaint, no will-change → visible stutter on any dropped frame.

Directive (experience/technical-direction, not code): (a) add an eased scroll-follow — interpolate a smoothed value toward target scroll each rAF and drive the dawn from THAT, or add a Lenis-style smooth-scroll layer; (b) move the light's POSITION via transform (translate/scale, GPU) rather than repainting gradient stops; add `will-change: transform` to the moving layer; reserve warmth/color changes to be cheap or lightly transitioned (~120–200ms damping); (c) note `scroll-behavior: smooth` on html is irrelevant to wheel input. Primary lever = (a).

---

<!-- Next review appended below. -->
