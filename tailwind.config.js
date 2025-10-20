/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#22d3ee",
          violet: "#a855f7",
          dark: "#0f172a",
          light: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(168,85,247,0.25)",
      },
    },
  },
  plugins: [],
};
