/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          primary: "#0A3D62",
        accent: "#E67E22",
        lightbg: "#F4F6F7",
        darktext: "#2C3E50",
      }
    },
  },

  plugins: [],
}

