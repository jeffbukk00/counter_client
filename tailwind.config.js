/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "9/10": "90%",
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
      margin: {
        "1/20": "5%",
      },
    },
  },
  plugins: [],
};
