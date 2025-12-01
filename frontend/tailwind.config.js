module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: "#0b3d91",
        star: "#ffffff",
        nebula: "#ff007f",
      },
      screens: {
        xs1: "400px",
        xs: "460px",
        sm2: "600px",
        lg2: "1100px",
        lg3: "1220px",
        xl2: "1350px",
        xl3: "1650px",
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      animation: {
        "slide-up": "slideUp 2s ease-in-out",
        "slide-up-loop": "slideUp 10s ease-in-out infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(10rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      // fontFamily: {
      //   lato: ['Lato', 'sans-serif'],
      //   roboto: ['Roboto', 'sans-serif'],
      //   bold: ['Roboto Bold', 'sans-serif'],
      //   semibold: ['Roboto Semi-Bold', 'sans-serif'],
      // },
      
    },
  },
  plugins: [require("@tailwindcss/typography", 'tailwind-scrollbar-hide')],
}
