/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts,scss}',
    './styles/**/*.{css,scss}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem'
    },
    extend: {
      colors: {
        primary: '#FD272D',
        black: '#000000',
        'gray-100': '#F1F1F1',
        white: '#FFFFFF'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        heading: ['"Work Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        elevated: '0 16px 40px rgba(0, 0, 0, 0.12)'
      },
      transitionDuration: {
        400: '400ms'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};

