/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'], // Custom font stack
      },
    }
  },

  plugins: []
};
