"use client";

import { motion } from "framer-motion";
import type { Colorway, JerseyPattern } from "@/lib/order";
import { EASE } from "@/lib/motion";

const BODY =
  "M120,58 C150,48 175,70 200,92 C225,70 250,48 280,58 L312,150 C300,176 286,170 278,150 L286,440 L114,440 L122,150 C114,170 100,176 88,150 Z";
const YOKE =
  "M120,58 C150,48 175,70 200,92 C225,70 250,48 280,58 L312,150 C300,176 286,170 278,150 L280,168 L120,168 L122,150 C114,170 100,176 88,150 Z";

const colorTransition = { duration: 0.6, ease: EASE };

/**
 * Live jersey configurator preview. Recolors on a weighted curve as the
 * colorway and pattern change. Pure SVG, scales crisply on any screen.
 */
export default function JerseyPreview({
  colorway,
  pattern,
  number,
  programName,
}: {
  colorway: Colorway;
  pattern: JerseyPattern;
  number: string;
  programName: string;
}) {
  const { primary, secondary, accent } = colorway;

  return (
    <svg
      viewBox="0 0 400 480"
      className="h-full w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)]"
      role="img"
      aria-label={`Jersey preview in ${colorway.name}`}
    >
      <defs>
        <linearGradient id="sideFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={secondary} />
          <stop offset="55%" stopColor={primary} />
          <stop offset="100%" stopColor={primary} />
        </linearGradient>
      </defs>

      {/* Grounding shadow on the dark stage */}
      <ellipse cx="200" cy="452" rx="104" ry="15" fill="rgba(0,0,0,0.5)" />

      {/* Body. A light edge keeps the silhouette legible on black for any
          color, including dark jerseys. */}
      <motion.path
        d={BODY}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.5"
        animate={{ fill: pattern === "fade" ? "url(#sideFade)" : primary }}
        transition={colorTransition}
      />

      {/* Shoulder yoke (only on shoulder pattern) */}
      {pattern === "shoulder" && (
        <motion.path
          d={YOKE}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          animate={{ fill: secondary }}
          transition={colorTransition}
        />
      )}

      {/* Collar trim — hugs only the neckline opening, not the shoulders */}
      <motion.path
        d="M174,73 Q200,99 226,73"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        animate={{ stroke: accent }}
        transition={colorTransition}
      />

      {/* Side seam accents */}
      <motion.line
        x1="116" y1="180" x2="120" y2="430"
        strokeWidth="3"
        animate={{ stroke: accent }}
        transition={colorTransition}
        opacity={0.7}
      />
      <motion.line
        x1="284" y1="180" x2="280" y2="430"
        strokeWidth="3"
        animate={{ stroke: accent }}
        transition={colorTransition}
        opacity={0.7}
      />

      {/* Program name on chest */}
      <text
        x="200"
        y="210"
        textAnchor="middle"
        fontSize="17"
        letterSpacing="2"
        style={{ fontFamily: "ui-monospace, monospace", textTransform: "uppercase" }}
        fill={secondary}
      >
        {(programName || "Your program").slice(0, 16).toUpperCase()}
      </text>

      {/* Number */}
      <motion.text
        x="200"
        y="350"
        textAnchor="middle"
        fontSize="150"
        fontWeight={700}
        style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
        animate={{ fill: secondary }}
        transition={colorTransition}
        stroke={accent}
        strokeWidth="2"
      >
        {number || "10"}
      </motion.text>
    </svg>
  );
}
