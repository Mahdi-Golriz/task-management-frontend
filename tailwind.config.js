/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Use class strategy
  theme: {
    extend: {
      width: {
        "3/10": "30%", // For the first element
        "3/20": "15%", // For the middle four elements
        "1/20": "5%", // For the last two elements
      },
    },
  },
  plugins: [],
};
