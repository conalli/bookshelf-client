module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../libs/ui/**/*.{js,ts,jsx,tsx}",
    "../../libs/web/components/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("../../tailwind.preset.js")],
};
