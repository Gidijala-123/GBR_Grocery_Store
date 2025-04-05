// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff7b25",
        "primary-dark": "#e64a19",
        "primary-light": "#ff9e4f",
        secondary: "#ffab40",
        dark: "#2c3e50",
        light: "#f5f5f5",
      },
      backgroundImage: (theme) => ({
        dark: "linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%)",
        navbar: "linear-gradient(135deg, #e64a19 0%, #ff7b25 100%)",
        primary: "linear-gradient(135deg, #ff7b25 0%, #ff9e4f 100%)",
        "primary-hover": "linear-gradient(135deg, #e64a19 0%, #ff7b25 100%)",
      }),
    },
  },
  plugins: [],
};
