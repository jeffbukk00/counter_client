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
      zIndex: {
        "modal-backdrop": "z-index: 99",
        modal: "z-index: 100",
      },
    },
  },
  plugins: [],
};
