import type { Variants } from "framer-motion";

/** The house easing curve. Weighted, no overshoot. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Reveal a block: opacity + small Y, expo-out. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Stagger container for grouped reveals (40–80ms apart). */
export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren },
  },
});

/** Fade only, for overlays. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
};
