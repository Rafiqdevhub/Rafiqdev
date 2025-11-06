/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Tinos serif font for headings and expressive typography
        tinos: ["'Tinos'", "Georgia", "serif"],
        // System UI fonts for body text
        sans: ["system-ui", "-apple-system", "sans-serif"],
        // Serif fallback option
        serif: ["'Tinos'", "Georgia", "serif"],
      },
      screens: {
        xxs: "360px", // Adding smaller breakpoint for very small devices
        xs: "480px",
        // Default tailwind breakpoints:
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      spacing: {
        // Adding more granular spacing options for better responsive control
        "1/20": "5%",
        "1/10": "10%",
        "1/8": "12.5%",
        "1/6": "16.667%",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-in-out",
        "fade-slide-in": "fadeSlideIn 0.5s ease-in-out",
        "spin-slow": "spinSlow 10s linear infinite",
        bounce: "bounce 1s infinite",
        "pulse-subtle": "pulseSub 2s infinite ease-in-out",
        fadeInSlide: "fadeInSlide 0.4s ease-out forwards",
        fillBackground: "fillBackground 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSub: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        fadeInSlide: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fillBackground: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      maxWidth: {
        // Adding container max-widths for better content display
        "content-sm": "540px",
        "content-md": "720px",
        "content-lg": "960px",
        "content-xl": "1140px",
      },
      minHeight: {
        // Adding min-height utilities for better vertical spacing
        "screen-75": "75vh",
        "screen-85": "85vh",
        "screen-90": "90vh",
      },
    },
  },
  plugins: [],
};
