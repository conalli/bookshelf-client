// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["var(--font-overpass)", "var(--font-murecho)", ...fontFamily.sans],
    },
    extend: {
      colors: {
        "bk-bg-dark": "#21212180",
        "bk-primary-light": "#ffffff01",
        "bk-primary-dark": "#21212180",
        "bk-orange": "#F2994A",
        "bk-blue": "#63B3ED",
        "bk-red": "#EB5757",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
