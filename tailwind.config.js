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
      sans: ["DMSans", "sans-serif"],
    },
    extend: {},
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
    }),
  ],
};
