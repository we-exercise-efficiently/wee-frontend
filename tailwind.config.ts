/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  content: [],
  theme: {
    extend: {
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
