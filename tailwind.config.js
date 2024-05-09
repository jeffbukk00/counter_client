/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "9/10": "90%",
        "30vw": "30vw",
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
        "40vh": "40vh",
        "60vh": "60vh",
      },
      margin: {
        "1/20": "5%",
      },
      colors: {
        positive: "#7FD69D",
        negative: "#FA7070",
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
      },
      animation: {
        countDisplayScreenNegative: "countDisplayScreenNegative 0.5s ease-out",
        countDisplayScreenPositive: "countDisplayScreenPositive 0.2s ease-in",
      },
    },
  },
  plugins: [],
};
