/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
        "pulse-subtle": "pulseSub 2s infinite ease-in-out", // Adding missing animation that was defined in CSS
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
          // Adding missing keyframe that was defined in CSS
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
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
