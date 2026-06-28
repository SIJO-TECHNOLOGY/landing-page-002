import type { CSSProperties, ReactNode } from "react";

interface PanelProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Rounded top + top shadow create the "slides up over the previous" seam. */
  rounded?: boolean;
  children: ReactNode;
}

/**
 * Panel — one cinematic surface in the layered stack.
 *
 * Each panel is `sticky top-0` and full-height, so the next panel slides UP
 * over the previous (which stays pinned), giving the page a single continuous,
 * layered "film" rather than discrete stacked sections. The rounded top + soft
 * top shadow sell the overlap seam.
 */
export function Panel({
  id,
  className = "",
  style,
  rounded = true,
  children,
}: PanelProps) {
  return (
    <section
      id={id}
      style={style}
      className={`sticky top-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 ${
        rounded
          ? "rounded-t-[2rem] shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.75)]"
          : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
