import { FloatingNav } from "@/components/nav/FloatingNav";
import { DawnEnvironment } from "@/components/atmosphere/DawnEnvironment";
import { Beat } from "@/components/beats/Beat";
import { HeroFirstLight } from "@/components/hero/HeroFirstLight";
import { Button } from "@/components/ui/Button";

/**
 * SIJO — one continuous evolving world (DawnEnvironment, fixed) + transparent
 * beats the camera travels through. The cold→warm dawn carries the narrative:
 * the impersonal ESN world (cold valley) → a firm that thinks of its people
 * (full dawn). No panels, no cover/reveal, no seams.
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

        {/* Le constat — cold valley · upper-right */}
        <Beat id="constat">
          <div className="ml-auto max-w-xl text-right">
            <Eyebrow>le constat</Eyebrow>
            <h2 className={HEADING}>
              Dans le conseil, trop de talents avancent{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                seuls
              </span>
              .
            </h2>
          </div>
        </Beat>

        {/* Notre réponse · left */}
        <Beat id="reponse">
          <div className="mr-auto max-w-xl text-left">
            <Eyebrow>notre réponse</Eyebrow>
            <h2 className={HEADING}>
              SIJO a fait le choix du{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                collectif
              </span>
              .
            </h2>
          </div>
        </Beat>

        {/* Nos engagements · right · substance */}
        <Beat id="engagements">
          <div className="ml-auto max-w-xl text-right">
            <Eyebrow>nos engagements</Eyebrow>
            <h2 className={HEADING}>
              Transparence, expertise, accompagnement —&nbsp;et une vraie{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                proximité
              </span>
              .
            </h2>
            <p className="ml-auto mt-6 max-w-md text-base leading-relaxed text-white/65">
              Un suivi mensuel par votre business manager, des formations et
              certifications financées, et des missions au cœur des plus
              grandes institutions financières — BNP Paribas, Société
              Générale, Crédit Agricole, Amundi…
            </p>
          </div>
        </Beat>

        {/* CTA final · plein soleil · center */}
        <Beat id="cta">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.03] tracking-[-0.035em] [text-shadow:0_2px_44px_rgba(0,0,0,0.5)]">
              Construisons l&apos;avenir,{" "}
              <span className="font-serif font-normal italic text-warm-strong">
                ensemble
              </span>
              .
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button href="https://www.linkedin.com/company/sijoesn/">
                Nous rejoindre
              </Button>
              <Button href="mailto:contact@sijo.fr" variant="ghost">
                Nous contacter
              </Button>
            </div>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
              43 rue Pierre Brossolette, Levallois-Perret · 01 84 20 94 37 ·
              contact@sijo.fr
            </p>
          </div>
        </Beat>
      </main>

      {/* TEMPORARY build marker — remove before release. */}
      <div className="pointer-events-none fixed bottom-3 left-3 z-50 font-mono text-[10px] tracking-[0.2em] text-faint/50">
        sijo-v1
      </div>
    </>
  );
}
