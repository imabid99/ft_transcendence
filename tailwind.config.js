/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '4xl': '2124px',
      '3xl': '1940px',
      '2xl': '1536px',
      'xl': '1280px',
      'lg': '1024px',
      'md': '768px',
      'sm': '640px',
      'lsm': '360px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        '3xl': '0px 0px 98px 0px rgba(6, 74, 133, 0.05)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
          
        ],
        // '5xl': '0px 0px 98px 0px rgba(6, 74, 133, 0.05)',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': [ '0px 0px 0px 0px rgba(0, 0, 0, 0.10)',
        '0px 2px 5px 0px rgba(0, 0, 0, 0.10)',
        '0px 9px 9px 0px rgba(0, 0, 0, 0.09)',
        '0px 20px 12px 0px rgba(0, 0, 0, 0.05)',
        ' 0px 36px 14px 0px rgba(0, 0, 0, 0.01)',
        ' 0px 56px 16px 0px rgba(0, 0, 0, 0.00)'
        ],
        '5xl': [
          '0px 0px 0px 0px rgba(0, 0, 0, 0.34)',
          '0px 36px 79px 0px rgba(0, 0, 0, 0.33)', 
          '0px 143px 143px 0px rgba(0, 0, 0, 0.29)',
          '0px 322px 193px 0px rgba(0, 0, 0, 0.17)',
          '0px 572px 229px 0px rgba(0, 0, 0, 0.05)',
          '0px 894px 250px 0px rgba(0, 0, 0, 0.01)'
        ],
        '6xl': [
          '0px 0px 0px 0px rgba(0, 0, 0, 0.17)',
          '0px 2px 3px 0px rgba(0, 0, 0, 0.17)',
          '0px 6px 6px 0px rgba(0, 0, 0, 0.15)',
          '0px 14px 8px 0px rgba(0, 0, 0, 0.09)',
          '0px 25px 10px 0px rgba(0, 0, 0, 0.03)',
          '0px 38px 11px 0px rgba(0, 0, 0, 0.00)'
        ],
        '7xl': '0px 4px 46px 0px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
