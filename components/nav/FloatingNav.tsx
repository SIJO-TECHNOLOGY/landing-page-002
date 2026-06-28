/**
 * FloatingNav — a top-center pill that reads as an object inside the
 * composition, not browser chrome (Fixa-inspired). Dark/translucent to stay
 * within the brand's serious register; warm accent on the wordmark dot.
 */
export function FloatingNav() {
  return (
    <header className="fixed left-1/2 top-4 z-40 -translate-x-1/2">
      <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-4 pr-1.5 backdrop-blur-xl shadow-[0_10px_40px_-16px_rgba(0,0,0,0.7)]">
        <a
          href="#top"
          className="whitespace-nowrap font-display text-sm font-semibold tracking-tight text-white"
        >
          AM Shift<span className="text-warm">.</span>
        </a>
        <span aria-hidden className="mx-1 h-4 w-px bg-white/15" />
        <a
          href="#cta"
          className="whitespace-nowrap rounded-full bg-white/[0.08] px-3.5 py-1.5 text-xs font-medium text-white/90 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.14] hover:text-white"
        >
          Request demo
        </a>
      </nav>
    </header>
  );
}
