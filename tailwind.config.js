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
      },
      fontFamily: {
        sans: ["Instrument Sans", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1200px",
      },
    },
  },
  plugins: [],
};
