module.exports = {
  root: true,
  extends: ["next", "turbo", "prettier"],
  ignorePatterns: [".next", "public", "cypress"],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
