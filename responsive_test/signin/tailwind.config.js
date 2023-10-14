/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        screens: {
          'imad': '400px',
        },
      },
      screens: {
        'sm': '200px',
        // => @media (min-width: 576px) { ... }
  
        'md': '960px',
        // => @media (min-width: 960px) { ... }
  
        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
      }
    },
    plugins: [],
}
