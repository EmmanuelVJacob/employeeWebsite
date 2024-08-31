/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       customVioletDark3:'#3D52A0',
       customVioletDark2:'#7091E6',
       customGrey:'#8697c4',
       customPurple:'#ADBBDA',
       custompink:'#EDE8F5',
      },
    },
  },
  plugins: [],
}