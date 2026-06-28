import { Panel } from "@/components/panels/Panel";
import { Button } from "@/components/ui/Button";

/**
 * HeroFirstLight — Sprint 1 SHELL of the "First Light" hero.
 *
 * Concept: dawn over a dark system — deep night warming to a band of first
 * light on the horizon ("AM" = morning; light = clarity replacing manual dark).
 * This sprint ships the static composition + placeholder warm light; Sprint 2
 * adds the animated light loop and the staged cold open.
 */
export function HeroFirstLight() {
  return (
    <Panel
      id="hero"
      rounded={false}
      style={{
        background:
          "linear-gradient(180deg, #070b14 0%, #0b1220 52%, #120f0a 100%)",
      }}
    >
      {/* Placeholder "first light" — warm dawn band rising from the horizon. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "radial-gradient(130% 90% at 50% 125%, rgba(242,184,115,0.30) 0%, rgba(242,184,115,0.08) 38%, transparent 68%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.32em] text-warm-strong/80">
          <span aria-hidden className="h-1 w-1 rounded-full bg-warm" />
          AM Shift
        </span>

        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[1.03] tracking-[-0.03em]">
          The operating system for engineering{" "}
          <span className="font-serif font-normal italic text-warm-strong">
            intelligence
          </span>
          .
        </h1>

        <p className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-dim sm:text-lg">
          AM Shift sends collaborative AI agents into your distributed systems —
          Kafka, databases, logs, Kubernetes — to find root causes in minutes,
          not hours.
        </p>

        <div className="mt-10">
          <Button href="#cta">Request a demo</Button>
        </div>
      </div>
    </Panel>
  );
}
