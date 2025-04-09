/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        light: {
          primary: "#f6ebff",
          secondary1: "#b6cbff",
          secondary2: "#FFFFFF",
        },
        dark: {
          primary: "#340062",
          secondary1: "#11014c",
          secondary2: "#000000",
        },
      },
    },
  },
  plugins: [],
}

