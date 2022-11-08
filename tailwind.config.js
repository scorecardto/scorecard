const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
          100: "#F1F8FF",
          150: "#daecff",
          200: "#E1EFFF",
          250: "#c9dff7",
          300: "#56A2E9",
          400: "#4F86D9",
          500: "#7C4FB6",
          600: "#485D72",
          650: "#2f4965",
          700: "#3B5269",
          750: "#24384d",
          800: "#1b242c",
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
          200: "#33373e",
          300: "#36393d",
          350: "#37393d",
          400: "#454A52",
          450: "#555a61",
          500: "#909090",
          600: "#FFFFFF",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-children"),
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
