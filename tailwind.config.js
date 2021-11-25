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
      screens: {
        "h-sm": {"raw": "(min-height: 450px)"},
        "h-md": {"raw": "(min-height: 580px)"}
      },
      colors: {
        gray: {
          100: "#fcfcfa", // bg light
          200: "#eeeeec", // sidebar bg light
          300: "#e0e0df", // sidebar btn bg light
          400: "#b7b6b6",
          500: "#8d8b8c",
          600: "#636163",
          700: "#393639", // sidebar btn bg dark
          800: "#2d2b2d", // sidebar bg dark
          900: "#221f22", // bg dark
        },
        primary: {
          100: "#cfe5e6",
          200: "#a4dadf",
          300: "#79cfd8",
          400: "#21b1c1",
          500: "#1e9eac",
          600: "#1a8a97",
          700: "#1d5f68",
          800: "#204e55",
          900: "#223c42",
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
