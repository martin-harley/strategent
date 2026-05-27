/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07090F',
          900: '#0A0D14',
          850: '#0D1017',
          800: '#111520',
          750: '#141829',
          700: '#1A1F2E',
          600: '#252B3B',
          300: '#5A6278',
          200: '#8892A4',
          100: '#C5CBDA',
        },
        accent: {
          500: '#7C84F2',
          600: '#5C66E6',
          700: '#4750CC',
        },
        mint: {
          500: '#3FCF8E',
          400: '#5CDBA0',
        },
        amber: {
          500: '#E8A33A',
        },
        rose: {
          500: '#E26D7C',
        },
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.01em',
        tighter2: '-0.02em',
      },
    },
  },
  plugins: [],
};
