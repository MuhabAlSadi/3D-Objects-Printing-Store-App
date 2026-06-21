/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF7518",
        secondary: "#0F172A",
        backgroundlight: "#F8FAFC",
        backgrounddark: "#1E293B",
      },
    },
  },
  plugins: [],
}
