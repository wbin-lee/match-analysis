import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0910",
        surface: {
          DEFAULT: "#141120",
          2: "#1c1830",
          3: "#221e38",
        },
        brand: {
          DEFAULT: "#e8789a",
          light: "#f5b8cc",
          dim: "rgba(232,120,154,0.12)",
          glow: "rgba(232,120,154,0.25)",
          border: "rgba(232,120,154,0.22)",
          50: "#fdf2f8",
          100: "#fce7f3",
          500: "#e8789a",
          600: "#e8789a",
          700: "#f5b8cc",
        },
        purple: {
          DEFAULT: "#9b85e8",
          light: "#c4b5f8",
          dim: "rgba(155,133,232,0.12)",
          border: "rgba(155,133,232,0.22)",
        },
        teal: {
          DEFAULT: "#5ecfb0",
          dim: "rgba(94,207,176,0.12)",
          border: "rgba(94,207,176,0.22)",
        },
        amber: {
          DEFAULT: "#f0a83a",
          dim: "rgba(240,168,58,0.12)",
          border: "rgba(240,168,58,0.22)",
        },
        coral: {
          DEFAULT: "#e8785a",
          dim: "rgba(232,120,90,0.12)",
        },
        blue: {
          DEFAULT: "#5ea8df",
          dim: "rgba(94,168,223,0.12)",
        },
        txt: {
          DEFAULT: "#ede9f8",
          2: "#9b94b8",
          3: "#5a5475",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          2: "rgba(255,255,255,0.12)",
        },
      },
      fontFamily: {
        serif: ["'Nanum Myeongjo'", "serif"],
        sans: ["'Noto Sans KR'", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.14)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out",
        heartbeat: "heartbeat 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
