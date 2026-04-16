/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'accent-lime': '#c8ff00',
        'accent-purple': '#6C63FF',
        'bg-dark': '#0a0a0f',
      },
    },
  },
  plugins: [],
}