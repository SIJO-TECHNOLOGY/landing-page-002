"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Orchestrated load reveal, timed to the canvas ignition (~2.4s). */
export function ColdOpen() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 2.3 }}
        className="mb-7 font-mono text-[11px] uppercase tracking-[0.42em] text-signal/70"
      >
        AM Shift · engineering intelligence
      </motion.div>

      <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.03em]">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 2.55 }}
        >
          The operating system
        </motion.span>
        <motion.span
          className="block bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 2.75 }}
        >
          for engineering intelligence.
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 3.2 }}
        className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-dim sm:text-lg"
      >
        AM Shift sends collaborative AI agents into your distributed systems —
        Kafka, databases, logs, Kubernetes — to find root causes in minutes,
        not hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 3.55 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-11 sm:gap-4"
      >
        <Button href="#invitation">Request a demo</Button>
        <Button href="#reasoning" variant="ghost">
          See it reason
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-10 hidden flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint sm:flex"
      >
        Scroll to investigate
        <motion.span
          aria-hidden
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
