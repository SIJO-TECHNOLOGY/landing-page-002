import { Beat } from "@/components/beats/Beat";
import { Button } from "@/components/ui/Button";

/**
 * HeroFirstLight — the opening statement (content only).
 *
 * Just the hero copy, placed asymmetrically over the shared DawnEnvironment.
 * The cold-open bloom and the dawn live in the environment now; the type stays
 * still on load and only drifts subtly as the camera travels onward.
 */
export function HeroFirstLight() {
  return (
    <Beat id="hero">
      <div className="mr-auto max-w-2xl text-left">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.32em] text-warm-strong/80 backdrop-blur-sm">
          <span aria-hidden className="h-1 w-1 rounded-full bg-warm" />
          AM Shift
        </span>

        <h1 className="font-display text-[clamp(2.8rem,7vw,5.8rem)] font-medium leading-[1.0] tracking-[-0.035em] [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
          The operating system for engineering{" "}
          <span className="font-serif font-normal italic text-warm-strong">
            intelligence
          </span>
          .
        </h1>

        <p className="mt-7 max-w-md text-lg leading-relaxed text-white/70 [text-shadow:0_1px_20px_rgba(0,0,0,0.55)]">
          Clarity, the instant everything breaks.
        </p>

        <div className="mt-10">
          <Button href="#cta">Request a demo</Button>
        </div>
      </div>
    </Beat>
  );
}
