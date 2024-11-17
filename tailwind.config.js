import pallete from  './src/theme/palette'


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '900px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'], // Custom font stack
      },
      colors: {
        darkBg: pallete(null, true).background.default,
        lightBg: pallete(null, false).background.default
      }
    }
  },

  plugins: [require('@tailwindcss/forms')]
};
