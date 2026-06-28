import type { CSSProperties, ReactNode } from "react";

interface PanelProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Rounded top + top shadow create the "slides up over the previous" seam. */
  rounded?: boolean;
  /** The static environment rendered behind the content (see Atmosphere). */
  atmosphere?: ReactNode;
  children: ReactNode;
}

/**
 * Panel — one cinematic surface in the layered stack.
 *
 * Each panel is `sticky top-0` and full-height, so the next slides UP over the
 * previous (which stays pinned), giving one continuous layered film. The panel
 * hosts an `atmosphere` (the visual world) behind a free-form content layer —
 * composition/alignment is left to the children so panels can break symmetry.
 */
export function Panel({
  id,
  className = "",
  style,
  rounded = true,
  atmosphere,
  children,
}: PanelProps) {
  return (
    <section
      id={id}
      style={style}
      className={`sticky top-0 min-h-screen w-full overflow-hidden bg-bg-deep ${
        rounded
          ? "rounded-t-[2rem] shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.8)]"
          : ""
      } ${className}`}
    >
      {atmosphere}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {children}
      </div>
    </section>
  );
}
