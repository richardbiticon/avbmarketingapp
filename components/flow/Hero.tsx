"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-surface text-bone"
    >
      {/* Faint tactical grid + a top-edge red hairline */}
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 80% 0%, rgba(215,23,42,0.10), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative shell grid min-h-[92vh] grid-cols-1 items-center gap-12 pb-20 pt-36 md:grid-cols-[1.15fr_0.85fr] md:pt-32">
        {/* Copy */}
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
            className="mt-7 max-w-[15ch] text-[clamp(44px,8vw,108px)] font-medium leading-[0.95] tracking-[-0.03em]"
            segments={[
              { text: "Order the season your team" },
              { text: "deserves.", accent: true },
            ]}
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mt-8 max-w-[48ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-bone/70"
          >
            Uniforms, warmups, shoes, the whole package, configured in one place
            and quoted by people who do volleyball and nothing else. This is the
            room where next season gets built.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
            className="mt-10 flex flex-wrap gap-3.5"
          >
            <ButtonLink href="/order" variant="solid" arrow magnetic>
              Start your order
            </ButtonLink>
            <ButtonLink href="/#process" variant="light" magnetic>
              See how it works
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Parallax photography */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="relative hidden h-[72vh] md:block"
        >
          <motion.div
            style={reduce ? undefined : { y: photoY }}
            className="absolute inset-0 overflow-hidden"
          >
            <Image
              src="/photos/shoe-sky-elite-1.webp"
              alt="Court shoe fitted for a team order"
              fill
              priority
              sizes="45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
          </motion.div>
          <div className="absolute bottom-5 left-5 z-10">
            <span className="label text-bone/70">
              The kit / configured to your colors
            </span>
          </div>
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
            className="block h-7 w-px bg-surface/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
