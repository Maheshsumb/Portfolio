/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: 'rgb(var(--bg-dark-900) / <alpha-value>)',
          800: 'rgb(var(--bg-dark-800) / <alpha-value>)',
          700: '#151515' // Static dark gray for specialized borders if needed
        },
        primary: {
          100: 'rgb(var(--primary) / 0.1)',
          200: 'rgb(var(--primary) / 0.2)',
          300: 'rgb(var(--primary) / 0.3)',
          400: 'rgb(var(--primary) / 0.8)',
          500: 'rgb(var(--primary) / 1)',
          600: 'rgb(var(--primary) / 1)', // Fallback to same as 500 for simplicity or adjust opacity
          700: 'rgb(var(--primary) / 0.8)',
          800: 'rgb(var(--primary) / 0.6)',
          900: 'rgb(var(--primary) / 0.4)',
        }
      },
      fontFamily: {
        sans: ['"Fira Code"', 'monospace'], // Hacker font
        mono: ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}
