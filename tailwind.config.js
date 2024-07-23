/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        'silver-glow': '0 0 15px 5px rgba(192, 192, 192, 0.7)',
      },
      colors: {
        'silver-500': '#C0C0C0',
        'custom-dark': '#000000', // First custom color
        'custom-light': '#FFFFFF', // Second custom color
        'custom-border': '#333',    // Border color for table
        'custom-text-light': '#333', // Text color for light mode
        'custom-text-dark': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
