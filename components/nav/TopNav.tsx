"use client";

import { motion } from "motion/react";

/** Ultra-minimal nav that fades in once the cold open has resolved. */
export function TopNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 3.7 }}
      className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10"
    >
      <a
        href="#"
        className="font-display text-sm font-semibold tracking-tight"
      >
        AM<span className="text-accent-soft"> Shift</span>
      </a>
      <a
        href="#invitation"
        className="rounded-full border border-white/12 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:border-white/30 hover:text-white"
      >
        Request demo
      </a>
    </motion.header>
  );
}
