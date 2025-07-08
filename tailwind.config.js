/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'golf-beige': '#F5F1E8',
        'golf-green': '#4A6741',
        'golf-brown': '#8B7355',
        'golf-dark': '#2C3E50',
        'golf-light': '#E8E0D0',
        'golf-accent': '#A67C52',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 