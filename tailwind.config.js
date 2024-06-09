/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { NotoSans: ["Noto Sans KR", "Noto Sans", "sans-serif"] },
      width: {
        "9/10": "90%",
        "30vw": "30vw",
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
        "40vh": "40vh",
        "60vh": "60vh",
        "loading-modal-large": "12rem",
      },
      margin: {
        "1/20": "5%",
      },
      colors: {
        positive: "#7FD69D",
        negative: "#FA7070",
        default: "#232323",
        middle: "#FFA62F",
      },
      keyframes: {
        countDisplayScreenNegative: {
          "0%": { backgroundColor: "#FA7070" },
          "100%": { backgroundColor: "#FFF" },
        },
        countDisplayScreenPositive: {
          "0%": { backgroundColor: "#FFF" },
          "100%": { backgroundColor: "#7FD69D" },
        },
        spinning: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        bounceX: {
          "0%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
        bounceY: {
          "0%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
    },
    animation: {
      countDisplayScreenNegative: "countDisplayScreenNegative 0.5s ease-in-out",
      countDisplayScreenPositive: "countDisplayScreenPositive 0.5s ease-in-out",
      spinning: "spinning 0.8s ease-in-out infinite",
      bounceX: "bounceX 1s infinite",
      bounceY: "bounceY 1s infinite",
    },

    screens: {
      sm: "760px",
      // => @media (min-width: 640px) { ... }

      md: "900px",
      // => @media (min-width: 768px) { ... }

      "semi-lg": "1100px",

      lg: "1280px",
      // => @media (min-width: 1024px) { ... }

      xl: "1400px",
      // => @media (min-width: 1280px) { ... }
    },
  },

  plugins: [],
};
