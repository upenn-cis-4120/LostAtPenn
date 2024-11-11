/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '1/7': '13%',
      },
      colors: {
        'cblue': '#011f5b',
        'cred': '#8c1a11',
      },
    },
  },
  plugins: [],
}