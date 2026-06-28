"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { CSSProperties, ReactNode } from "react";

interface PanelProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Rounded top + top shadow create the "slides up over the previous" seam. */
  rounded?: boolean;
  /** The static/animated environment rendered behind the content. */
  atmosphere?: ReactNode;
  children: ReactNode;
}

/**
 * Panel — one cinematic surface in the layered stack (Sprint 2).
 *
 * Each panel is `sticky top-0` so the next slides up over it. To make panels
 * read as composition SURFACES gliding into depth (not flat slides), the
 * outgoing panel's content+world gently scale down and dim as the next covers
 * it — one slow, confident transition movement. The sticky shell itself stays
 * intact (transform is on an inner layer). Reduced-motion → no transform.
 */
export function Panel({
  id,
  className = "",
  style,
  rounded = true,
  atmosphere,
  children,
}: PanelProps) {
  const ref = useRef<HTMLElement | null>(null);
  const rangeRef = useRef<[number, number]>([0, 1]);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      rangeRef.current = [el.offsetTop, el.offsetTop + el.offsetHeight];
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Local progress: 0 when this panel pins at top, 1 when fully scrolled past.
  const recess = useTransform(scrollY, (y) => {
    const [a, b] = rangeRef.current;
    const p = (y - a) / Math.max(1, b - a);
    return p < 0 ? 0 : p > 1 ? 1 : p;
  });
  const scale = useTransform(recess, [0.45, 1], [1, 0.945]);
  const opacity = useTransform(recess, [0.5, 1], [1, 0.4]);

  return (
    <section
      ref={ref}
      id={id}
      style={style}
      className={`sticky top-0 h-screen w-full overflow-hidden bg-bg-deep ${
        rounded
          ? "rounded-t-[2rem] shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.8)]"
          : ""
      } ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale, opacity }}
      >
        {atmosphere}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl px-6 sm:px-10 lg:px-16">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
