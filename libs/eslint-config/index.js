module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ["node_modules", "tmp*"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
          // "./tsconfig.json",
          "../../apps/*/tsconfig.json",
          "../ui-library/tsconfig.json",
          "../tsconfig/*.json",
        ],
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/errors",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
      ],
      rules: {
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off", // buggy.
        "@typescript-eslint/no-unsafe-argument": "off", // buggy.
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/restrict-template-expressions": [
          2,
          {
            allowBoolean: true,
            allowAny: true,
          },
        ],
        "no-case-declarations": 0,
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "after-used",
            ignoreRestSiblings: true,
            argsIgnorePattern: "^_", // don't require _foo to be used if in an argument list.
          },
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "typeLike",
            format: ["PascalCase"], // Types should always be PascalCase
          },
        ],
      },
      // https://www.npmjs.com/package/eslint-import-resolver-typescript
      settings: {
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
            project: [
              // "./tsconfig.json",
              "../../apps/*/tsconfig.json",
              "../ui-library/tsconfig.json",
              "../tsconfig/*.json",
            ],
          },
        },
      },
    },
    {
      files: "*.js", // do not use typescript eslint
      extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:prettier/recommended",
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
  ],
};
