import type { Config } from "tailwindcss";

/**
 * Brand tokens live here and in app/globals.css as CSS variables.
 * Components reference these names, never raw hexes. One source of truth.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#D7172A", // primary brand red
          alt: "#C8102E", // secondary red, hovers/depth
        },
        // Blacked-out performance system. Near-black base, charcoal panels.
        surface: {
          DEFAULT: "#0E0F10", // base, near-black
          2: "#121315", // slightly raised base
        },
        panel: {
          DEFAULT: "#16181A", // charcoal panel
          2: "#1E2125", // raised panel / inputs
          3: "#272B30", // hover / active surface
        },
        // Warm off-white text so it never reads clinical-blue on black.
        bone: {
          DEFAULT: "#F4F2EC",
          soft: "#A7A39B",
          faint: "#6E6A62",
        },
        steel: "#7B8794", // cool secondary detail, used sparingly
      },
      fontFamily: {
        // Locked system. Display + body share Helvetica Neue.
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        serif: ['"Times New Roman"', "Times", "serif"], // italic red accent only
        mono: ["ui-monospace", '"SF Mono"', "Menlo", "Consolas", "monospace"],
      },
      maxWidth: {
        shell: "1280px",
      },
      transitionTimingFunction: {
        // Weighted, no overshoot. The house curve.
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-3%, -2%)" },
          "30%": { transform: "translate(2%, -4%)" },
          "50%": { transform: "translate(-2%, 3%)" },
          "70%": { transform: "translate(3%, 2%)" },
          "90%": { transform: "translate(-3%, 1%)" },
        },
      },
      animation: {
        grain: "grain 8s steps(6) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
