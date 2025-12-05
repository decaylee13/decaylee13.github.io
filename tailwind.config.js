/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quattrocento': ['"Quattrocento Sans"', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'martel': ['Martel', 'serif'],
      },
      fontSize: {
        // Add custom sizes
        'h1': ['72px', { lineHeight: '0.2', fontWeight: '100' }],
        'h2': ['40px', { lineHeight: '1', fontWeight: '500' }],
        'h3': ['36px', { lineHeight: '1', fontWeight: '500' }],
        'h4': ['24px', { lineHeight: '1', fontWeight: '500' }],
        'h5': ['20px', { lineHeight: '1', fontWeight: '500' }],
        'h6': ['18px', { lineHeight: '1', fontWeight: '500' }],

      }
    },
  },
  plugins: [],
}

