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
      },
      stripesSize : {
        sm: '12px',
        md: '20px',
        lg: '30px',
        xl: '40px'
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
          "--stripes-size": "20px",
          "--stripes-speed": "1s"
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
            animation: "slide var(--stripes-speed) infinite linear"
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

      //size modifiers
      matchUtilities({
        'stripes-size': value => ({
          '--stripes-size' : value
        })
      } , {
        values: theme('stripesSize')
      })

      //speed modifires
      matchUtilities({
        'stripes-speed': value => ({ 
          '--stripes-speed' : value
        })
      } , {
        values: theme('stripesSpeed')
      })


    } , {
      theme: {
        stripesSpeed : {
          s: '1s',
          m: '0.5s',
          f: '0.3s'
        }
      }
    })
  ],
}

/* 
  addUtilities(): for registering new static utility styles 
  matchUtilities(): for registering new dynamic utility styles 
  addComponents(): for registering new static component styles 
  matchComponents(): for registering new dynamic component styles 
  addBase(): for registering new base styles 
  addVariant(): for registering custom static variants 
  matchVariant(): for registering custom dynamic variants 
  theme(): for looking up values in the user’s theme configuration 
  config(): for looking up values in the user’s Tailwind configuration 
  corePlugins(): for checking if a core plugin is enabled 
  e(): for manually escaping strings meant to be used in class names
*/