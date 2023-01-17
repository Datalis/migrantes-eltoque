/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    colors: {
      'light': '#f5f6f9',
      'dark': '#201f25',
      'accent': '#7856ff',
      'gray': '#e0e0e0'
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  },
  plugins: [],
}
