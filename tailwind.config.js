/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      'baloo-2': ["'Baloo 2'", 'sans-serif'],
    },
    extend: {
      fontSize: {
        xxs: ['0.625rem', '0.875rem'],
      },
      backgroundImage: {
        home: 'url(/home-bg.png)',
      },
      colors: {
        gray: {
          900: '#272221',
          800: '#403937',
          700: '#574f4d',
          600: '#8d8686',
          500: '#d7d5d5',
          400: '#e6e5e5',
          300: '#ededed',
          200: '#f3f2f2',
          100: '#fafafa',
        },
        yellow: {
          700: '#c47f17',
          500: '#dbac2c',
          200: '#f1e9c9',
        },
        purple: {
          700: '#4b2995',
          500: '#8047f8',
          200: '#ebe5f9',
        },
        red: {
          400: '#c44117',
          200: '#e8baab',
          100: '#f2dfd8',
        },
      },
    },
  },
  plugins: [],
}
