/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'ping': 'ping 4s ease-in-out infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    
  ],
};
