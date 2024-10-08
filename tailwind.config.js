/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',  
    './public/js/**/*.js',
    './public/css/**/*.css',  
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'poppins',
        'logo': 'Kaushan Script',
        'bruno': 'Bruno Ace SC',
      },
    },
  },
  plugins: [],
}