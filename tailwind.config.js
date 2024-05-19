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
      },
      animation: {
        countDisplayScreenNegative:
          "countDisplayScreenNegative 0.5s ease-in-out",
        countDisplayScreenPositive:
          "countDisplayScreenPositive 0.5s ease-in-out",
        spinning: "spinning 0.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
