/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F2A52",
        slate: {
          850: "#16202F",
        },
        paper: "#F7F8FB",
        copper: {
          DEFAULT: "#B8892E",
          light: "#D8AC4E",
        },
        teal: {
          DEFAULT: "#2F8577",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
