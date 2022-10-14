/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        13: "3.25rem",
        15: "3.75rem",
      },
      colors: {
        primary: "#EAEBEF",
        'button-primary': '#1283C6',
      },
    },
  },
  plugins: [],
};
