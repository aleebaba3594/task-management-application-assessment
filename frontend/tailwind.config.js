/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundColor: {
        light: 'var(--bg-color-light)',
        dark: 'var(--bg-color-dark)',
      },
      textColor: {
        light: 'var(--text-color-light)',
        dark: 'var(--text-color-dark)',
      },
    },
  },
  plugins: [],
}

