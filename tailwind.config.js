/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#F0D980',
          400: '#DFC05A',
          500: '#C9A84C',
          600: '#A87D2A',
          700: '#7A5B1E',
        },
        ink: '#0A0A0A',
        cream: '#F5F0E8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
