module.exports = {
  purge: ["./components/**/*.js", "./content/**/*.md", "./pages/**/*.js"],
  theme: {
    colors: {
      blue: {
        light: "#7FA8CC",
        DEFAULT: "#6987a1",
      },
      gray: {
        lighter: "#EBEBEB",
        light: "#BEBEBE",
        DEFAULT: "#707070",
        dark: "#333333",
        darker: "#222222",
      },
      green: {
        light: "#A1D66A",
        DEFAULT: "#76B833",
      },
      orange: {
        dark: "#E5AC52",
      },
      white: "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        "career-teaser": "url('/images/career-teaser.jpg')",
        "application-teaser": "url('/images/application-teaser.jpg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
