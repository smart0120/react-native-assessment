/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary-default)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary-default)",
          light: "var(--color-secondary-light)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary-default)",
          light: "var(--color-tertiary-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent-default)",
          light: "var(--color-accent-light)",
        },
        grey: {
          DEFAULT: "var(--color-grey-default)",
        },
        slate: {
          DEFAULT: "var(--color-slate-default)",
        },
        dark: {
          DEFAULT: "var(--color-dark-default)",
        },
        light: {
          DEFAULT: "var(--color-light-default)",
        },
        overlay: "var(--color-overlay)",
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
        },
      },
      backgroundColor: {
        primary: {
          DEFAULT: "var(--color-bg-primary)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-bg-secondary)",
          light: "var(--color-secondary-light)",
        },
      },
      textColor: {
        primary: {
          DEFAULT: "var(--color-text-primary)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-text-secondary)",
          light: "var(--color-secondary-light)",
        },
      },
      borderColor: {
        primary: {
          DEFAULT: "var(--color-border)",
          light: "var(--color-primary-light)",
        },
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        accent: ["Tapestry", "serif"],
      },
    },
  },
  plugins: [],
};
