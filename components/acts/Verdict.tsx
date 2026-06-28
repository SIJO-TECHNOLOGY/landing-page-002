"use client";

import { motion } from "motion/react";
import { Caption } from "@/components/ui/Caption";

const EASE = [0.16, 1, 0.3, 1] as const;

const EVIDENCE = [
  "elk.logs · timeout",
  "kafka.orders · lag +4.2s",
  "service-b.ext · 503",
  "payments.api · 500",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** The resolution beat — where product clarity lives. */
export function Verdict() {
  return (
    <section
      id="resolution"
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-surface/60 p-7 backdrop-blur-md sm:p-9"
      >
        <motion.div variants={item}>
          <Caption>root cause · confidence 0.96</Caption>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 font-mono text-sm text-dim"
        >
          <span className="text-faint">query ▸ </span>
          “Why did the payment endpoint fail?”
        </motion.p>

        <motion.div variants={item} className="mt-5 flex flex-wrap gap-2">
          {EVIDENCE.map((e) => (
            <span
              key={e}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-signal/80"
            >
              {e}
            </span>
          ))}
        </motion.div>

        <motion.h2
          variants={item}
          className="mt-7 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.02em]"
        >
          External dependency timeout in{" "}
          <span className="text-ok">Service B.</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-4 text-base leading-relaxed text-dim"
        >
          A Kafka consumer lag cascaded into the payment API. AM Shift
          correlated 1,284 log lines across 3 datastores and 2 services down to
          a single cause — in 94 seconds.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex items-center gap-3 rounded-xl border border-ok/20 bg-ok/[0.06] px-4 py-3"
        >
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full bg-ok shadow-[0_0_12px] shadow-ok"
          />
          <span className="text-sm text-text/90">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ok/80">
              recommended action ▸{" "}
            </span>
            Restart the connector and replay the queue.
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
