/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5F84A2',
          primaryDark: '#4A6F8C',
          primaryLight: '#E8EFF5',
          primarySoft: '#F0F5F9',
          accent: '#D8B878',
          accentDark: '#C4A15E',
          accentLight: '#FBF6EB',
          dark: '#1E1E1E',
          charcoal: '#333B48',
          muted: '#69727D',
          lightMuted: '#8E98A4',
          border: '#E2E8F0',
          lightBorder: '#ECEFF3',
          card: '#FFFFFF',
          cream: '#FAF8F5',
          creamDark: '#F3EFEA',
          bg: '#F6F8FA'
        }
      },
      fontFamily: {
        serif: ['Marcellus', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'phone': '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        'soft': '0 4px 20px -2px rgba(95, 132, 162, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(95, 132, 162, 0.12)',
        'float': '0 10px 30px -5px rgba(95, 132, 162, 0.25)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.04)'
      },
      borderRadius: {
        'phone': '44px',
        'inner-phone': '36px'
      }
    },
  },
  plugins: [],
}
