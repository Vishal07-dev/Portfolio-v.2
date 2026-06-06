import type { Config } from "tailwindcss";

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
          DEFAULT: "#07070f",
          subtle: "#0a0a18",
        },
        surface: {
          DEFAULT: "#101020",
          elevated: "#14142a",
          hover: "#18183a",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          fuchsia: "#e879f9",
          dim: "rgba(139, 92, 246, 0.15)",
          glow: "rgba(139, 92, 246, 0.3)",
        },
        ink: {
          DEFAULT: "#e8e8f8",
          muted: "#8a8aaa",
          subtle: "#52526e",
        },
        success: "#10b981",
        border: "rgba(255, 255, 255, 0.06)",
        "border-accent": "rgba(139, 92, 246, 0.25)",
        "border-fuchsia": "rgba(217, 70, 239, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-name":
          "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(217,70,239,0.04) 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #c084fc 0%, #818cf8 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.3)",
        "glow-sm": "0 0 20px rgba(139, 92, 246, 0.2)",
        "glow-fuchsia": "0 0 40px rgba(217, 70, 239, 0.25)",
        card: "0 4px 24px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 8px 48px rgba(0, 0, 0, 0.6)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
      },
      fontSize: {
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
      },
    },
  },
  plugins: [],
};

export default config;
