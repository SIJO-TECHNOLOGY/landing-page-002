import { FloatingNav } from "@/components/nav/FloatingNav";
import { PanelStack } from "@/components/panels/PanelStack";
import { Panel } from "@/components/panels/Panel";
import { HeroFirstLight } from "@/components/hero/HeroFirstLight";
import { Button } from "@/components/ui/Button";

/**
 * v0.3 Sprint 1 — SKELETON.
 * Floating pill nav + layered sticky-panel choreography + hero shell.
 * Panels 1–3 and the verdict are placeholders here; full composition lands in
 * Sprints 3–4. The five-beat narrative order is preserved.
 */

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-dim">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <FloatingNav />

      <PanelStack>
        <HeroFirstLight />

        {/* Beat 1 — Problem (cool register) */}
        <Panel id="problem" className="bg-panel-cool">
          <div className="max-w-3xl text-center">
            <Eyebrow>the problem</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              Engineering systems are too complex for humans{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                alone
              </span>
              .
            </h2>
          </div>
        </Panel>

        {/* Beat 2 — The shift / agents (warm register) */}
        <Panel
          id="shift"
          className="bg-panel-warm"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, #1a140c 0%, #14110b 55%, #0d0b08 100%)",
          }}
        >
          <div className="max-w-3xl text-center">
            <Eyebrow>the shift</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              So AM Shift sends in a{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                team
              </span>{" "}
              of agents.
            </h2>
          </div>
        </Panel>

        {/* Beat 3 — Reasoning (cool register) */}
        <Panel id="reasoning" className="bg-panel-cool">
          <div className="max-w-3xl text-center">
            <Eyebrow>reasoning</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              They investigate every layer — and agree on one{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                answer
              </span>
              .
            </h2>
          </div>
        </Panel>

        {/* Beat 5 — Final CTA (warm register) */}
        <Panel
          id="cta"
          className="bg-panel-warm"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 70%, #1a140c 0%, #100d09 60%, #08070b 100%)",
          }}
        >
          <div className="flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.03em]">
              Stop searching logs. Start{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                shifting
              </span>{" "}
              operations.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button href="#">Get early access</Button>
              <Button href="#" variant="ghost">
                Request a demo
              </Button>
            </div>
          </div>
        </Panel>
      </PanelStack>

      {/* TEMPORARY build marker — remove before release. */}
      <div className="pointer-events-none fixed bottom-3 left-3 z-50 font-mono text-[10px] tracking-[0.2em] text-faint/50">
        v0.3-sprint1
      </div>
    </>
  );
}
