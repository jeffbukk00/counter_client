/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "90vw": "90vw",
      },
      height: {
        "10vh": "10vh",
        "90vh": "90vh",
      },
      margin: {
        "5vw": "5vw",
      },
    },
  },
  plugins: [],
};
