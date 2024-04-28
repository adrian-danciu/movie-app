/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#ff8906",
        background: "#0f0e17",
        text: "#a7a9be",
        primary: "#fffffe",
      },
    },
  },
  plugins: [],
};
