/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        cyber: "#ec1447"
      },
      fontFamily: {
        iransans : ['iransans'],
        yekan: ['yekan']
      }
    },
  },
   plugins: [
    plugin(function({addBase, addComponents, addUtilities, matchUtilities, theme }){
      
      addBase({
        ":root": {
          "--stripes-rgb": "0 0 0",
          "--stripes-angle": "-45deg",
          "--stripes-opacity": "1",
          "--stripes-size": "20px"
        },
        "@keyframes slide": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(var(--stripes-size))" }
        }
      })

      // add components 

      addComponents({
         ".stripes": {
            position: "relative",
            overflow: "hidden",
            isolation: "isolate"
          },
          ".stripes::before": {
            "--stripes-color": "rgb(var(--stripes-rgb) / var(--stripes-opacity))",
            position: "absolute",
            zIndex: -1,
            top: "0",
            right: "0",
            height: "100%",
            width: "calc(100% + var(--stripes-size))",
            content: '""',
            backgroundImage: `linear-gradient( 
              var(--stripes-angle), 
              var(--stripes-color) 5%, 
              transparent 5% 45%,
              var(--stripes-color) 45% 55%, 
              transparent 55% 95%, 
              var(--stripes-color) 95% 100%)`,
            backgroundSize: "var(--stripes-size) var(--stripes-size)",
            animation: "slide 1s infinite linear"
          }
      })

      // add utilities
      addUtilities({
        ".stripes-white": { "--stripes-rgb": "255 255 255" },
        ".stripes-reverse": { "--stripes-angle": "45deg" }
      })

      //opacity modifiers
      matchUtilities({
        'stripes-opacity' : value => ({
            '--stripes-opacity': value
        })
      } , {
        values : theme('opacity')
      })

    })
  ],
}

