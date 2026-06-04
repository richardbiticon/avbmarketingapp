"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Counts to 100, then lifts away on a single weighted curve.
 * Under reduced-motion it resolves to 100 immediately and skips the lift.
 */
export default function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setCount(100);
      setDone(true);
      return;
    }
    // Time-based count so a throttled/backgrounded tab cannot stall it, plus a
    // hard fallback that guarantees the curtain always lifts.
    const DURATION = 1400;
    let start: number | null = null;
    let raf = 0;
    let finish: ReturnType<typeof setTimeout>;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / DURATION);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else finish = setTimeout(() => setDone(true), 200);
    };
    raf = requestAnimationFrame(step);
    const hard = setTimeout(() => {
      setCount(100);
      setDone(true);
    }, 3200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(finish);
      clearTimeout(hard);
    };
  }, [reduce]);

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={done ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1, ease: EASE }}
      onAnimationComplete={() => {
        if (done) document.body.classList.add("loaded");
      }}
      className="fixed inset-0 z-[8000] flex flex-col items-center justify-center gap-7 bg-surface text-bone"
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <div className="overflow-hidden">
        <motion.div
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="text-[clamp(26px,5vw,46px)] font-medium tracking-tight"
        >
          All Volleyball<span className="text-red"> Team Order</span>
        </motion.div>
      </div>
      <div className="relative h-px w-[min(260px,60vw)] overflow-hidden bg-surface/20">
        <motion.span
          className="absolute inset-y-0 left-0 bg-red"
          animate={{ width: `${count}%` }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </div>
      <div className="label text-bone/55">{count} / 100</div>
    </motion.div>
  );
}
