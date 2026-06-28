import { FloatingNav } from "@/components/nav/FloatingNav";
import { DawnEnvironment } from "@/components/atmosphere/DawnEnvironment";
import { Beat } from "@/components/beats/Beat";
import { HeroFirstLight } from "@/components/hero/HeroFirstLight";
import { Button } from "@/components/ui/Button";

/**
 * v0.3 Sprint 3 — Continuity architecture.
 * One continuous evolving world (DawnEnvironment, fixed) + transparent beats
 * that the camera travels through. No panels, no cover/reveal, no seams: the
 * cold→warm dawn is the visible continuous backbone; statements cross-dissolve.
 */

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-dim backdrop-blur-sm">
      {children}
    </span>
  );
}

const HEADING =
  "font-display text-[clamp(2rem,5vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.03em] [text-shadow:0_2px_44px_rgba(0,0,0,0.5)]";

export default function Home() {
  return (
    <>
      <DawnEnvironment />
      <FloatingNav />

      <main className="relative">
        <HeroFirstLight />

        {/* Problem — cold valley · upper-right */}
        <Beat id="problem">
          <div className="ml-auto max-w-xl text-right">
            <Eyebrow>the problem</Eyebrow>
            <h2 className={HEADING}>
              Modern systems fail in ways no one person can{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                trace
              </span>
              .
            </h2>
          </div>
        </Beat>

        {/* The shift · left */}
        <Beat id="shift">
          <div className="mr-auto max-w-xl text-left">
            <Eyebrow>the shift</Eyebrow>
            <h2 className={HEADING}>
              So AM Shift sends in a{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                team
              </span>{" "}
              of agents.
            </h2>
          </div>
        </Beat>

        {/* Reasoning · right · product clarity */}
        <Beat id="reasoning">
          <div className="ml-auto max-w-xl text-right">
            <Eyebrow>reasoning</Eyebrow>
            <h2 className={HEADING}>
              They investigate every layer — and agree on one{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                answer
              </span>
              .
            </h2>
            <p className="ml-auto mt-6 max-w-md text-base leading-relaxed text-white/65">
              Across logs, databases, message queues, and infrastructure, AM
              Shift correlates every signal into a single root cause — in
              minutes, not hours.
            </p>
          </div>
        </Beat>

        {/* Final CTA · full warm dawn · center */}
        <Beat id="cta">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.03] tracking-[-0.035em] [text-shadow:0_2px_44px_rgba(0,0,0,0.5)]">
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
        </Beat>
      </main>

      {/* TEMPORARY build marker — remove before release. */}
      <div className="pointer-events-none fixed bottom-3 left-3 z-50 font-mono text-[10px] tracking-[0.2em] text-faint/50">
        v0.3-sprint3
      </div>
    </>
  );
}
