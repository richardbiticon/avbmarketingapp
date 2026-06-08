"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { FAQS } from "@/lib/stores";
import { EASE } from "@/lib/motion";

export default function StoresFaq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-[color:var(--line)] bg-panel py-28 md:py-36">
      <div className="shell">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-start">
          <Reveal>
            <span className="label border-t border-red pt-3 text-red">Questions</span>
          </Reveal>
          <SplitText
            as="h2"
            className="max-w-[16ch] text-[clamp(30px,4.6vw,54px)] font-semibold leading-[1.05] tracking-[-0.03em]"
            segments={[{ text: "The things teams ask" }, { text: "first.", accent: true }]}
          />
        </div>

        <div className="border-t border-[color:var(--line)]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-[color:var(--line)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[clamp(17px,2.2vw,24px)] font-medium tracking-tight text-bone">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 text-2xl text-red transition-transform duration-300 ease-expo ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[68ch] pb-7 text-[16px] leading-relaxed text-bone-soft">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
