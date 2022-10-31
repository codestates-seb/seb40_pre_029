/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        tline: "inset 0 2px 1px 0 rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};
