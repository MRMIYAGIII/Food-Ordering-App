module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      dancing: ["Dancing Script", "cursive"],
      raleway: ["Raleway", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      lato: ["Lato", "sans-serif"] // Add Lato font
    },
    colors: {
      'gray': '#7C6A46',
      'customBlack': "#1C1C1C",
      'white': '#FFFFFF',
      'garyWhite': '#FAFAFA',
      // Add new custom colors from your CSS variables
      'light': '#F9F9F9',
      'blue': '#3C91E6',
      'light-blue': '#CFE8FF',
      'dark-grey': '#AAAAAA',
      'dark': '#342E37',
      'red': '#DB504A',
      'yellow': '#FFCE26',
      'light-yellow': '#FFF2C6',
      'orange': '#FD7238',
      'light-orange': '#FFE0D3'
    },
    extend: {
      // You can add more custom configurations here if needed
    },
  },
  plugins: [],
}