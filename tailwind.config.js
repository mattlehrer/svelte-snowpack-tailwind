module.exports = {
  purge: ["./src/**/*.svelte", "./src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
