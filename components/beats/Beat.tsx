"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { ReactNode } from "react";

interface BeatProps {
  id?: string;
  children: ReactNode;
}

/**
 * Beat — one statement in the continuous journey.
 *
 * Transparent, normal-flow section over the single fixed DawnEnvironment (no
 * background, no sticky, no seam). As the camera travels, the content drifts
 * gently and cross-dissolves with its neighbours, so beats melt into one
 * another instead of cutting. The world behind persists and evolves throughout.
 * Reduced-motion → static, always visible.
 */
export function Beat({ id, children }: BeatProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["48px", "0px", "-48px"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={ref}
      id={id}
      className="relative z-10 flex min-h-screen w-full items-center px-6 sm:px-10 lg:px-16"
    >
      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="mx-auto flex w-full max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
