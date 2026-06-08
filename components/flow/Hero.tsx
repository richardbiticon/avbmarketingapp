"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-surface text-bone">
      {/* Faint tactical grid + a single soft red wash for depth. No objects. */}
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(110% 75% at 78% 8%, rgba(215,23,42,0.12), transparent 56%)",
        }}
        aria-hidden
      />

      <div className="relative shell flex min-h-[92vh] flex-col justify-center pb-24 pt-36">
        <motion.div style={reduce ? undefined : { opacity: fade }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <Eyebrow onDark>For coaches and club directors</Eyebrow>
          </motion.div>

          <SplitText
            as="h1"
            immediate
            className="mt-8 max-w-[16ch] text-[clamp(48px,10vw,140px)] font-semibold leading-[0.92] tracking-[-0.035em]"
            segments={[
              { text: "Order the season your team" },
              { text: "deserves.", accent: true },
            ]}
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mt-9 max-w-[52ch] text-[clamp(17px,2vw,21px)] leading-relaxed text-bone/65"
          >
            Uniforms, warmups, shoes, the whole package, configured in one place
            and quoted by people who do volleyball and nothing else. This is the
            room where next season gets built.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
            className="mt-11 flex flex-wrap gap-3.5"
          >
            <ButtonLink href="/order" variant="solid" arrow magnetic>
              Start your order
            </ButtonLink>
            <ButtonLink href="/#process" variant="light" magnetic>
              See how it works
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="label text-bone/45">Scroll</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-7 w-px bg-bone/30"
          />
        </div>
      </motion.div>
    </section>
  );
}
