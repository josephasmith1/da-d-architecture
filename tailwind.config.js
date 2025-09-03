import { heroui } from "@heroui/react";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-jakarta)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FAFAFA",
            foreground: "#11181C",
            primary: {
              DEFAULT: "#000000",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#787878",
              foreground: "#FFFFFF",
            },
            focus: "#000000",
          },
        },
        dark: {
          colors: {
            background: "#0A0A0A",
            foreground: "#ECEDEE",
            primary: {
              DEFAULT: "#FFFFFF",
              foreground: "#000000",
            },
          },
        },
      },
    }),
    typography,
  ],
};
