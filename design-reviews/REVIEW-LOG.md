# AM Shift — Independent Design Review Log

> Maintained by the **Independent Reviewer** (external design critic).
> Role boundary: critique only. The Reviewer does **not** write product code, modify implementation, or hand over patches. The Builder Agent owns all implementation.
> Standard applied: Apple reveal / Stripe interaction / Linear / Vercel / Framer showcase / Anthropic seriousness. Target quality **9.5+/10**.
> Concept ("One System, One Journey": Cold Open → Chaos → Awakening → Reasoning → Resolution → Invitation) is **approved** — only execution is reviewed.

---

## Score History

| Review | Date | First 3s | Continuous film | Visual hierarchy | Motion | Emotional | Clarity | Premium | Cinematic | **Final** |
|---|---|---|---|---|---|---|---|---|---|---|
| №1 | 2026-06-28 | 5.0 | 6.0 | 7.0 | 6.5 | 5.5 | 8.5 | 7.0 | 6.0 | **6.3** |

---

## Open Issues Tracker

Status legend: 🔴 open · 🟡 partially addressed · 🟢 resolved (Reviewer-confirmed)

| # | Severity | Issue | First raised | Status |
|---|---|---|---|---|
| I-1 | Critical | Cold-open ignition occluded by the H1; system & headline reveal simultaneously (no sequencing) → no wonder in first 3s | №1 | 🔴 |
| I-2 | Critical | Chaos and Awakening are nearly identical point-clouds; "Chaos" act has no actual chaos (no jitter/storm/warm tension color); "agents arrive" is not a visible event | №1 | 🔴 |
| I-3 | Critical | Resolution climax is spatially broken — root-cause node ignites top-right while the verdict card caption sits center-left; answer and claim are unconnected | №1 | 🔴 |
| I-4 | High | Packets are hard dots (no trails/streaks) — flow reads as particles translating, not a system thinking | №1 | 🔴 |
| I-5 | High | Single `easeInOut` for all morphs → no tempo contrast; reads as animation, not direction | №1 | 🔴 |
| I-6 | High | Monochrome cool-blue = the observability-tool palette the project explicitly wants to escape; lone teal accent carries all emotional load | №1 | 🔴 |
| I-7 | Medium | Copy hard-pops per 100vh section while the canvas dissolves continuously; adjacent captions bleed at frame edges during transition | №1 | 🔴 |
| I-8 | Medium | Best moments (Reasoning convergence ~50%, root-cause ignition ~74%) are buried deep in scroll; weakest moment is the first thing every visitor sees | №1 | 🔴 |

---

## Review №1 — 2026-06-28

**Build reviewed:** local `main`, full scroll-through at 1440×900. Acts captured at scroll progress ≈ 0 (cold open settled), 0.14 (chaos), 0.30 (awakening), 0.52 (reasoning), 0.74 (verdict), 0.93 (invitation).

**Final score: 6.3 / 10 — Not good enough. Significant refinement required.**

### Scores & one-line judgments
- **First 3 seconds — 5.0** · Ignition hidden behind its own headline. No wonder.
- **Continuous film — 6.0** · Canvas is continuous; the story isn't — text pops like slides.
- **Visual hierarchy — 7.0** · Protagonist in Reasoning/Verdict; wallpaper in Cold Open/Chaos.
- **Motion sophistication — 6.5** · Good easing fundamentals, but no trails, no tempo contrast.
- **Emotional impact — 5.5** · One future-tech moment. The rest is tasteful SaaS blue.
- **Product clarity — 8.5** · The one genuine strength. Four messages land in one breath.
- **Premium feeling — 7.0** · Looks expensive. Doesn't yet look inevitable.
- **Overall cinematic quality — 6.0** · A film with two real scenes and four placeholder slides.

### The three failures that cap this at 6, not 9.5
1. **Cardinal sin — the protagonist is occluded by text.** The SystemCanvas ignites *behind* the H1; nodes are trapped inside the letterforms of "engineering intelligence." Canvas ignition (~0–2400ms) and headline reveal (~1150–1850ms) fire simultaneously — no sequencing, no drama. The system gets zero seconds alone before words appear. (→ I-1)
2. **Chaos and Awakening are the same picture.** Two named, distinct acts that look identical = continuity failure. The act *called* Chaos has no tension — no jitter, no storm, no warm color. Without real tension there is no release to earn in Reasoning. The tension→release rhythm is missing its first half. (→ I-2)
3. **The payoff shot is choreographed like an accident.** In Resolution the glowing answer (root-cause node, top-right) and the written answer (card caption, center-left) sit in different regions, unconnected. The climax doesn't link proof to claim. (→ I-3)

### Secondary weaknesses
- Packets are dots, not energy — no trails. (→ I-4)
- One easing curve for everything; no tempo contrast. (→ I-5)
- Monochrome blue = observability-tool look; single teal accent overloaded. (→ I-6)
- Copy hard-pops per section; caption bleed at transitions. (→ I-7)

### Premium Perception Test
Would this sit credibly next to Apple / Stripe / Anthropic? **Not yet.** It reads as a strong Series-A startup site, not a category definer. Precise reason: a category-definer's first three seconds are unforgettable; these are forgettable — a centered headline with dots behind it, the most common SaaS composition in existence. The extraordinary material is buried at 50%/74% scroll where most visitors never reach. **The best moments are hidden; the weakest moment is the first thing everyone sees.** (→ I-8)

### Bar for the next pass (Reviewer's minimum to move off 6)
1. Stage the cold open as a **sequence** — system before words, in clear space. (I-1)
2. Make **Chaos violent** and **Awakening an arrival event** so the two acts look nothing alike and tension exists. (I-2)
3. **Reunite root-cause node with its verdict** in the climax frame. (I-3)

Trails + tempo contrast are the difference between 8 and 9. Sequencing, tension, and a staged climax are the difference between 6 and 8. **Nothing above 8.0 is on the table until the first three seconds stop looking like a template.**

---

<!-- Next review appended below. Add a row to Score History, update the Open Issues Tracker statuses, then a new "## Review №N" section. -->
