module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  important: true,
  theme: {
    fontFamily: {
      "sans": ['"PT Sans"'],
      "mono": ['"Meslo LG S"'],
    },
    extend: {
      colors: {
        gray: {
          100: "#fcfcfa", // bg light
          200: "#e1e1df", // sidebar bg light
          300: "#c6c5c4", // sidebar btn bg light
          400: "#abaaa9",
          500: "#8f8e8e",
          600: "#747373",
          700: "#595758", // sidebar btn bg dark
          800: "#3e3b3d", // sidebar bg dark
          900: "#221f22", // bg dark
        },
        primary: {
          100: "#86e3ea",
          200: "#6bd0db",
          300: "#4dc4d1",
          400: "#21b1c1",
          500: "#1e9eac",
          600: "#1a8a97",
          700: "#156f79",
          800: "#0f5057",
          900: "#093034",
        },
        secondary: {
          light: "#e14e05",
          dark: "#fc9867"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
