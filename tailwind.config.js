/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        /* Navbar breakpoint — tablets (including 768, 1024 and 1032 wide)
           use the hamburger drawer; the full desktop nav takes over here. */
        nav: "1040px"
      },
      colors: {
        /* Colors are driven by CSS variables so light/dark themes switch
           from css/input.css. Format: rgb(var(--x) / <alpha-value>) */
        primary: "rgb(var(--c-primary) / <alpha-value>)",
        /* Foreground accent — stays traditional red in light mode and
           brightens in dark mode so small text keeps accessible contrast. */
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        page: "rgb(var(--c-page) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        tintred: "rgb(var(--c-tint-red) / <alpha-value>)",
        tintgold: "rgb(var(--c-tint-gold) / <alpha-value>)"
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "'Segoe UI'", "Roboto", "Arial", "sans-serif"],
        decorative: ["'Noto Serif SC'", "'Playfair Display'", "serif"]
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(51, 37, 31, 0.15)",
        lift: "0 22px 45px -20px rgba(51, 37, 31, 0.35)",
        gold: "0 14px 30px -16px rgba(212, 166, 74, 0.65)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        steam: {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.9)" },
          "40%": { opacity: "0.55" },
          "100%": { opacity: "0", transform: "translateY(-18px) scale(1.15)" }
        }
      },
      animation: {
        fadeUp: "fadeUp .7s cubic-bezier(.22,.68,.36,1) both",
        fadeIn: "fadeIn .6s ease both",
        floatY: "floatY 6s ease-in-out infinite",
        steam: "steam 3.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
