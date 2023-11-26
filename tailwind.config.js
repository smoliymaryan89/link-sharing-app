import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-grey": "#FAFAFA",
        "dark-grey": "#333333",
        grey: "#737373",
        blue: "#633CFF",
        "light-purple": "#EFEBFF",
        active: "#BEADFF",
        disabled: "rgba(99, 60, 255, 0.25)",
        red: "#FF3939",
        input: "#D9D9D9",
        "dark-white": "rgba(217, 217, 217, 1)",
        overlay: "rgba(0, 0, 0, 0.8)",
      },
      boxShadow: {
        "card-shadow": "0px 0px 32px 0px rgba(0, 0, 0, 0.10)",
      },
      fontFamily: {
        sans: ["Instrument Sans", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: { max: "360px" },
        sm: { max: "767px" },
        md: "768px",
        lg: "1200px",
      },
      transitionDuration: {
        350: "350ms",
      },
    },
  },
  plugins: [],
};
