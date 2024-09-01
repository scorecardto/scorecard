const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  variants: [
    "children",
    "default",
    "children-first",
    "children-last",
    "children-odd",
    "children-even",
    "children-not-first",
    "children-not-last",
    "children-hover",
    "hover",
    "children-focus",
    "focus",
    "children-focus-within",
    "focus-within",
    "children-active",
    "active",
    "children-visited",
    "visited",
    "children-disabled",
    "disabled",
    "responsive",
  ],
  theme: {
    fontFamily: {
      os: ["Inter", "sans-serif"],
      sans: ["DMSans", "sans-serif"],
      mono: ["AnekKannada", "monospace"],
    },
    extend: {
      maxWidth: {
        "6xl": "68rem",
      },
      colors: {
        accent: {
          100: "var(--accent-100, #F1F8FF)",
          150: "var(--accent-150, #daecff)",
          200: "var(--accent-200, #E1EFFF)",
          250: "var(--accent-250, #c9dff7)",
          300: "var(--accent-300, #56A2E9)",
          350: "var(--accent-350, #5682e9)",
          400: "var(--accent-400, #426ac6)",
          500: "var(--accent-500, #7C4FB6)",
          600: "var(--accent-600, #1c2e4a)",
          650: "var(--accent-650, #2f4965)",
          700: "var(--accent-700, #182843)",
          750: "var(--accent-750, #24384d)",
          800: "var(--accent-800, #1b242c)",
        },
        "mono-l": {
          100: "#FFFFFF",
          150: "#FAFAFA",
          200: "#f4f4f4",
          300: "#eaeaea",
          350: "#e9e9e9",
          400: "#C9C9C9",
          450: "#b2b2b2",
          500: "#909090",
          600: "#333333",
        },
        "mono-d": {
          100: "#2D3136",
          150: "#23272b",
          200: "#272b30",
          300: "#414347",
          350: "#37393d",
          400: "#454A52",
          450: "#555a61",
          500: "#909090",
          600: "#FFFFFF",
        },
        club: {
          25: "#FBFCFD",
          50: "#BFDAFF",
          100: "#B4E4FF",
          101: "#95B9FF",
          200: "#5757FF",
          201: "#2F97F8",
          500: "#2939CB",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-children"),
    require("tailwindcss-scoped-groups")({
      groups: ["one", "two"],
    }),
    plugin(function ({ addBase, theme }) {
      addBase({
        "@font-face": {
          fontFamily: "DMSans",
          fontStyle: "normal",
          fontWeight: 400,
          src: "url(font/DMSans-Regular.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 400,
          src: "url(font/Inter-Regular.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 600,
          src: "url(font/Inter-Medium.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 700,
          src: "url(font/Inter-Bold.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "DMSans",
          fontStyle: "italic",
          fontWeight: 400,
          src: "url(font/DMSans-Italic.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "DMSans",
          fontStyle: "normal",
          fontWeight: 500,
          src: "url(font/DMSans-Medium.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "DMSans",
          fontStyle: "italic",
          fontWeight: 500,
          src: "url(font/DMSans-MediumItalic.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "DMSans",
          fontStyle: "normal",
          fontWeight: 700,
          src: "url(font/DMSans-Bold.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "DMSans",
          fontStyle: "italic",
          fontWeight: 700,
          src: "url(font/DMSans-BoldItalic.ttf)",
        },
      });

      addBase({
        "@font-face": {
          fontFamily: "AnekKannada",
          src: "url(font/AnekKannada.ttf)",
        },
      });
    }),
  ],
};
