/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  content: [],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out infinite",
      },

      colors: {
        themeBlue: "#0627f0",
        themeLime: "#d1fd0a",
        themeDark: "#040f15",
      },

      fontFamily: {
        "bungee-outline": ["Bungee Outline", "sans-serif"],
      },
    },
  },
  plugins: [],
};
