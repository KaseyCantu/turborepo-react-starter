/** @type { import('eslint').Linter.BaseConfig } */
module.exports = {
  extends: ['../../.eslintrc.js'],
  ignorePatterns: ['dist', 'node_modules', 'tmp*'],
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: [
        '@typescript-eslint',
        'formatjs',
        'jest',
        'jsx-a11y',
        'react',
        'react-hooks',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off', // buggy.
        '@typescript-eslint/no-unsafe-argument': 'off', // buggy.
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          2,
          {
            allowBoolean: true,
            allowAny: true,
          },
        ],
        'no-case-declarations': 0,
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_', // don't require _foo to be used if in an argument list.
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'typeLike',
            format: ['PascalCase'], // Types should always be PascalCase
          },
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-static-element-interactions': [
          'warn',
          {
            handlers: [
              'onClick',
              'onMouseDown',
              'onMouseUp',
              'onKeyPress',
              'onKeyDown',
              'onKeyUp',
            ],
          },
        ],
        'formatjs/no-offset': 'error',
        'formatjs/enforce-default-message': ['error', 'literal'],
        'formatjs/enforce-description': ['error', 'literal'],
      },
      // https://www.npmjs.com/package/eslint-import-resolver-typescript
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
            project: ['./tsconfig.json'],
          },
        },
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
