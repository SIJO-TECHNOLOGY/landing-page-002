import { FloatingNav } from "@/components/nav/FloatingNav";
import { PanelStack } from "@/components/panels/PanelStack";
import { Panel } from "@/components/panels/Panel";
import { Atmosphere } from "@/components/atmosphere/Atmosphere";
import { HeroFirstLight } from "@/components/hero/HeroFirstLight";
import { Button } from "@/components/ui/Button";

/**
 * v0.3 Sprint 1.5 — visual WORLD + asymmetric composition + First Light
 * progression (dark uncertainty → warm confidence). No animation; the
 * environment is built from static atmospheric layers. Product/infra language
 * is kept out of the hero and surfaces mid-page (Reasoning).
 */

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-dim backdrop-blur-sm">
      {children}
    </span>
  );
}

const HEADING =
  "font-display text-[clamp(2rem,5vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.03em] [text-shadow:0_2px_40px_rgba(0,0,0,0.45)]";

export default function Home() {
  return (
    <>
      <FloatingNav />

      <PanelStack>
        <HeroFirstLight />

        {/* Beat 1 — Problem · cold valley (deep blue / uncertainty) · upper-right */}
        <Panel id="problem" atmosphere={<Atmosphere warmth={0} sunX={28} />}>
          <div className="ml-auto max-w-xl self-start pt-[19vh] text-right">
            <Eyebrow>the problem</Eyebrow>
            <h2 className={HEADING}>
              Modern systems fail in ways no one person can{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                trace
              </span>
              .
            </h2>
          </div>
        </Panel>

        {/* Beat 2 — The shift · first warmth · lower-left */}
        <Panel id="shift" atmosphere={<Atmosphere warmth={0.42} sunX={40} />}>
          <div className="mr-auto max-w-xl self-end pb-[16vh] text-left">
            <Eyebrow>the shift</Eyebrow>
            <h2 className={HEADING}>
              So AM Shift sends in a{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                team
              </span>{" "}
              of agents.
            </h2>
          </div>
        </Panel>

        {/* Beat 3 — Reasoning · warming · center-right · product clarity here */}
        <Panel id="reasoning" atmosphere={<Atmosphere warmth={0.6} sunX={66} />}>
          <div className="ml-auto max-w-xl self-center text-right">
            <Eyebrow>reasoning</Eyebrow>
            <h2 className={HEADING}>
              They investigate every layer — and agree on one{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                answer
              </span>
              .
            </h2>
            <p className="mt-6 ml-auto max-w-md text-base leading-relaxed text-white/65">
              Across logs, databases, message queues, and infrastructure, AM
              Shift correlates every signal into a single root cause — in
              minutes, not hours.
            </p>
          </div>
        </Panel>

        {/* Beat 5 — Final CTA · full warm dawn (confidence) · center-low */}
        <Panel id="cta" atmosphere={<Atmosphere warmth={0.92} sunX={50} />}>
          <div className="mx-auto flex max-w-3xl flex-col items-center self-center text-center">
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.03] tracking-[-0.035em] [text-shadow:0_2px_40px_rgba(0,0,0,0.45)]">
              Stop searching. Start{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                shifting
              </span>
              .
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
        v0.3-sprint2
      </div>
    </>
  );
}
