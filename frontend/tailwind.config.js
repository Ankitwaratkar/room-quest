/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'misty-rose': '#f5e3e0ff',
        'orchid-pink': '#e8b4bcff',
        'thulian-pink': '#d282a6ff',
        'eggplant': '#6e4555ff',
        'jet': '#3a3238ff',
      },
    },
  },
  plugins: [],
}
