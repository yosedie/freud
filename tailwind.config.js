/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        freud: {
          cream: '#FAF7F2',
          sand: '#F2ECE1',
          surface: '#FFFFFF',
          border: '#E8E0D5',
          brown: '#2D231E',
          'brown-dark': '#201814',
          'brown-light': '#4A3B33',
          muted: '#85776E',
          'muted-light': '#B3A79E',
          green: '#7A9A60',
          'green-light': '#EBF2E5',
          'green-dark': '#5D7747',
          coral: '#E57351',
          'coral-light': '#FCEEE9',
          'coral-dark': '#C05333',
          yellow: '#E8B84B',
          'yellow-light': '#FDF5E2',
          lavender: '#9C8EB9',
          'lavender-light': '#F2EFF7',
          dark: '#161311',
          'dark-card': '#221C18',
          'dark-border': '#352C26',
          'dark-muted': '#968980',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Urbanist', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'freud-sm': '0 2px 10px rgba(45, 35, 30, 0.04)',
        'freud-md': '0 8px 24px -4px rgba(45, 35, 30, 0.06)',
        'freud-lg': '0 20px 40px -8px rgba(45, 35, 30, 0.09)',
        'freud-glow-green': '0 0 25px rgba(122, 154, 96, 0.35)',
        'freud-glow-coral': '0 0 25px rgba(229, 115, 81, 0.35)',
      }
    },
  },
  plugins: [],
}
