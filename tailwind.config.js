module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#3363FF',
          50: '#001866',
          10: '#99B1FF',
        },
        secondary: {
          100: '#FDE35',
          50: '#CA5B02',
          10: '#FEC69A',
        },
        'gray-scale': {
          10: '#F8F8F9',
          50: '#E3E5E9',
          100: '#FFFFFF'
        },
      }
    },
  },
  plugins: [],
}