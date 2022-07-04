const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/*.html',
    './src/js/**/*.js'
  ],
  theme: {
    screens: {
      'xs': '525px',
      ...defaultTheme.screens,
      '2xl': '1300px'
    },
    extend: {
      backgroundPosition: {
        'hero-img': "left 32px center",
        'hero-img-lg': "right -200px center;",
        'hero-img-xl': "right -100px bottom 45%;",
        'hero-img-2xl': "left calc(50% + 400px) bottom 45%;",
        'shorten-img': "left 80px center",
        'shorten-img-desktop': "left",
        'boost-img-desktop': "center"
      },
      backgroundImage: {
        'hero': "url(/public/images/illustration-working-background.svg)",
        'shorten': "url(/public/images/bg-shorten-mobile.svg)",
        'shorten-desktop': "url(/public/images/bg-shorten-desktop.svg)",
        'boost': "url(/public/images/bg-boost-mobile.svg)",
        'boost-desktop': "url(/public/images/bg-boost-desktop.svg)",
      },
      fontFamily: {
        'poppins': ['Poppins'],
      },
      colors: {
        'primary-cyan': 'hsl(180, 66%, 49%)',
        'primary-dark-violet': 'hsl(257, 27%, 26%)',
        'secondary-red': 'hsl(0, 87%, 67%',
        'neutral-gray': 'hsl(0, 0%, 75%)',
        'neutral-grayish-violet': 'hsl(257, 7%, 63%)',
        'neutral-dark-blue': 'hsl(255, 11%, 22%)',
        'neutral-very-dark-violet': 'hsl(260, 8%, 14%)',
        'transparent-black': '#000000B3'
      },
    },
  },
  plugins: [],
}