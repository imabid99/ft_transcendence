/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      screens: {
        '4xl': '2124px',
        '3xl': '1940px',
        '2xl': '1536px',
        'xl': '1280px',
        'lg': '1024px',
        'md': '768px',
        'sm': '640px',
        'xs': '430px',
        'lsm': '360px',
      },
    },
    plugins: [],
}