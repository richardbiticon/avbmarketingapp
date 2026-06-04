"use client";

import { motion, useReducedMotion } from "framer-motion";

const PHRASES = [
  "Volleyball only. That is the whole business.",
  "Too big to care. Too small to deliver.",
  "Built for teams where average is not good enough.",
  "On time. Under budget. Done correctly.",
];

export default function Marquee() {
  const reduce = useReducedMotion();
  const items = [...PHRASES, ...PHRASES];

  return (
    <div className="overflow-hidden border-y border-[color:var(--line)] bg-panel py-5">
      <motion.div
        className="flex w-max gap-14 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {items.map((phrase, i) => (
          <span
            key={i}
            className="flex items-center gap-14 text-[19px] text-bone-soft"
          >
            {phrase}
            <span className="text-red" aria-hidden>
              ✳
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
