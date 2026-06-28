import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
}

const base =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_0_1px_rgba(56,189,248,0.0)] hover:bg-accent-soft hover:shadow-[0_8px_40px_-8px_rgba(37,99,235,0.8)]",
  ghost:
    "text-text/90 ring-1 ring-white/12 backdrop-blur-sm hover:ring-white/30 hover:bg-white/[0.04]",
};

export function Button({ children, href = "#", variant = "primary" }: ButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
