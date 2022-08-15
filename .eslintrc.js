module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config`
  extends: ["@kasey-turbo/eslint-config"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
