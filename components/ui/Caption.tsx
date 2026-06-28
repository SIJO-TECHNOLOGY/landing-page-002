import type { ReactNode } from "react";

interface CaptionProps {
  children: ReactNode;
}

/** A drifting mono "telemetry whisper" — the system's vernacular as a label. */
export function Caption({ children }: CaptionProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-signal/70">
      <span aria-hidden className="h-1 w-1 rounded-full bg-signal/80" />
      {children}
    </span>
  );
}
