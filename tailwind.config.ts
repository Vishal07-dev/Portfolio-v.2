import type { Config } from "tailwindcss";

/*
 * Ink ramp (dark) + one amber accent.
 * Direction: exact, steady, a little warm. The world is a developer's
 * working screen: editor, terminal, API responses.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0d14", // page
          deep: "#07080d", // deepest surface
        },
        surface: {
          DEFAULT: "#11141c", // card
          raised: "#1a1e28", // active row, input, secondary button
        },
        ink: {
          DEFAULT: "#eef0f5", // primary text
          secondary: "#a3a9b8",
          muted: "#7a8296", // meta, captions, icons
        },
        accent: {
          DEFAULT: "#f2a33a", // amber, like a terminal cursor
          soft: "rgba(242, 163, 58, 0.14)",
        },
        line: "rgba(238, 240, 245, 0.08)", // hairline
        "line-strong": "rgba(238, 240, 245, 0.14)",
        positive: "#4cc38a",
        negative: "#e5484d",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        meta: ["12px", { lineHeight: "16px" }],
      },
      boxShadow: {
        "top-hl": "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        window: "0 24px 64px rgba(0, 0, 0, 0.45)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
