"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Caption } from "@/components/ui/Caption";
import { Button } from "@/components/ui/Button";

/** The final calm — Act V invitation / CTA. */
export function Invitation() {
  return (
    <section
      id="invitation"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <Reveal className="flex flex-col items-center gap-7">
        <Caption>shift · am</Caption>
        <h2 className="max-w-3xl font-display text-[clamp(2.2rem,6vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.03em]">
          Stop searching logs.
          <br />
          <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Start shifting operations.
          </span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-dim">
          Autonomous, collaborative AI agents for the engineering teams running
          mission-critical distributed systems.
        </p>
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href="#">Get early access</Button>
          <Button href="#" variant="ghost">
            Request a demo
          </Button>
        </div>
      </Reveal>

      <footer className="absolute bottom-6 flex w-full flex-col items-center gap-1 px-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-faint sm:bottom-8 sm:flex-row sm:justify-between sm:gap-0 sm:px-12">
        <span>AM Shift</span>
        <span>engineering intelligence · 2026</span>
      </footer>
    </section>
  );
}
