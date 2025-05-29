 import daisyui from "daisyui";
 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js,jsx}"],
   theme: {
     extend: {
       animation: {
         'fade-in': 'fadeIn 0.5s ease-in-out',
         'slide-up': 'slideUp 0.5s ease-out',
         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
       },
       keyframes: {
         fadeIn: {
           '0%': { opacity: 0 },
           '100%': { opacity: 1 },
         },
         slideUp: {
           '0%': { transform: 'translateY(10px)', opacity: 0 },
           '100%': { transform: 'translateY(0)', opacity: 1 },
         }
       }
     },
   },
   plugins: [daisyui],
   daisyui: {
     themes: ["forest", "garden"],
     darkTheme: "forest"
   }
 }