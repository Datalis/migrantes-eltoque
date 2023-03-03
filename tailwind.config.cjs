/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    colors: {
      'light': '#f5f6f9',
      'dark': '#201f25',
      'accent': '#7856ff',
      'accent-dark': '#3a298c',
      'error': '#cc0000',
      'gray': '#e0e0e0'
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
