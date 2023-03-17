/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#1f2937",
        bgSecondary: "#131922",
      },
    },
  },
  plugins: [],
};
