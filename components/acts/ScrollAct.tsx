"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Caption } from "@/components/ui/Caption";

type Align = "left" | "right" | "center";

interface ScrollActProps {
  id?: string;
  caption: string;
  heading: string;
  sub?: string;
  align?: Align;
}

const wrap: Record<Align, string> = {
  left: "items-start text-left",
  right: "items-end text-right",
  center: "items-center text-center",
};

const position: Record<Align, string> = {
  left: "justify-start",
  right: "justify-end",
  center: "justify-center",
};

/** A single cinematic narrative beat that floats over the canvas. */
export function ScrollAct({
  id,
  caption,
  heading,
  sub,
  align = "left",
}: ScrollActProps) {
  return (
    <section
      id={id}
      className={`relative z-10 flex min-h-screen items-center px-6 sm:px-12 lg:px-20 ${position[align]}`}
    >
      <Reveal className={`flex max-w-xl flex-col gap-5 ${wrap[align]}`}>
        <Caption>{caption}</Caption>
        <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-balance">
          {heading}
        </h2>
        {sub ? (
          <p className="max-w-md text-base leading-relaxed text-dim">{sub}</p>
        ) : null}
      </Reveal>
    </section>
  );
}
