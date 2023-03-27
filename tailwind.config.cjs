/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
      Primary: {
        600: '#272E71'
      },
      Black: {
        600: '#374151'
      },
      Gray: {
        400: '#6B7280',
        200: '#E5E7EB',
        100: '#F9FAFB'
      }
    }
  },
  plugins: []
};
