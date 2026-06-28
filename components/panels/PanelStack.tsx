import type { ReactNode } from "react";

/**
 * PanelStack — the relative containing block for the sticky panels. Children
 * (Panels) stick to the viewport top within this stack, layering as the user
 * scrolls. Marked `#top` as the nav's scroll anchor.
 */
export function PanelStack({ children }: { children: ReactNode }) {
  return (
    <div id="top" className="relative">
      {children}
    </div>
  );
}
