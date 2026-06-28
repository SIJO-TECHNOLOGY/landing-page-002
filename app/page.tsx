import { SystemCanvas } from "@/components/system/SystemCanvas";
import { TopNav } from "@/components/nav/TopNav";
import { ColdOpen } from "@/components/acts/ColdOpen";
import { ScrollAct } from "@/components/acts/ScrollAct";
import { Verdict } from "@/components/acts/Verdict";
import { Invitation } from "@/components/acts/Invitation";

export default function Home() {
  return (
    <>
      {/* The protagonist — one persistent living system behind every act. */}
      <SystemCanvas />
      <TopNav />

      <main className="relative">
        {/* Act 0 — Cold open */}
        <ColdOpen />

        {/* Act I — Chaos */}
        <ScrollAct
          caption="incident · 02:14:07"
          heading="Distributed systems fail in ways no human can trace."
          sub="A thousand signals scatter across services, queues, and logs. By the time you've found them, the page is already down."
          align="left"
        />

        {/* Act II — Awakening */}
        <ScrollAct
          caption="agents online"
          heading="So AM Shift sends in a team of agents."
          sub="Specialist AI agents — for logs, databases, APIs, and infrastructure — wake up and move on the incident together."
          align="right"
        />

        {/* Act III — Reasoning */}
        <ScrollAct
          id="reasoning"
          caption="correlating evidence"
          heading="They investigate every layer at once — and resolve the conflicts."
          sub="Evidence from each system is normalized, cross-checked, and reasoned over. The noise collapses into a single line of inquiry."
          align="left"
        />

        {/* Act IV — Resolution */}
        <Verdict />

        {/* Act V — Invitation */}
        <Invitation />
      </main>

      {/* TEMPORARY build marker (Sprint 1.1) — remove before release. */}
      <div className="pointer-events-none fixed bottom-3 left-3 z-50 font-mono text-[10px] tracking-[0.2em] text-faint/50">
        v0.2-sprint1.1
      </div>
    </>
  );
}
