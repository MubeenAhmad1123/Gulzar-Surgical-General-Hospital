/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#F8E7EC',
        ivory: '#FFFAF9',
        rosegold: '#C9A496',
        sage: '#A5C3B1',
        charcoal: '#333333',
      },
    },
  },
  plugins: [],
}