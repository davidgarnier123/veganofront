/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0c6294',
        'secondary': '#83c5be',
        'light': '#edf6f9',
        'accent': '#ffd740',
        'accent-secondary': '#b53526',
      },
    },
  },
  plugins: [],
}