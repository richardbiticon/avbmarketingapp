"use client";

import { useEffect, useRef, useState, createElement } from "react";
import { clsx } from "@/lib/clsx";

export interface Segment {
  text: string;
  accent?: boolean;
}

/**
 * Masked word-reveal heading. Each word sits in an overflow-hidden box and its
 * inner span translates up into place, staggered. Honors reduced-motion (the
 * CSS resets .word-inner transform). Reveals once on enter.
 */
export default function SplitText({
  segments,
  as = "h2",
  className,
  immediate = false,
}: {
  segments: Segment[];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  let wordIndex = 0;
  const children = segments.map((seg, si) => {
    const words = seg.text.split(/\s+/).filter(Boolean);
    return (
      <span key={si} className={seg.accent ? "accent" : undefined}>
        {words.map((w, wi) => {
          const delay = wordIndex * 0.045;
          wordIndex += 1;
          return (
            <span key={wi}>
              <span className="word">
                <span
                  className="word-inner"
                  style={{ transitionDelay: `${delay}s` }}
                >
                  {w}
                </span>
              </span>
              {/* Space lives outside the masked box so it never collapses. */}
              {wi < words.length - 1 ? " " : null}
            </span>
          );
        })}
        {si < segments.length - 1 ? " " : null}
      </span>
    );
  });

  return createElement(
    as,
    {
      ref,
      className: clsx(revealed && "is-revealed", className),
    },
    children
  );
}
