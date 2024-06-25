/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      pokemon: ["Pokemon", "sans-serif"]
    },
    extend: {
      colors:{
        'pokemonYellow': '#ffde00',
        'pokemonRed':'#ff0000',
        'pokemonDarkRed': '#cc0000',
        'pokemonBlue': '#3b4cca',
        'pokemonGold':'#b3a125'
      }
    },
  },
  plugins: [],
}

