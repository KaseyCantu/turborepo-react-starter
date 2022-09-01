// Third Party
const react = require("@vitejs/plugin-react");

// Utils
const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    config.plugins = config.plugins.filter(
      (plugin) =>
        !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react'))
    );

    config.plugins.push(
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      })
    )

    console.log(`Vite Config Plugins: ${config.plugins}`)

    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: '@kasey-turbo/ui-library',
            replacement: path.resolve(
              __dirname,
              '../../../packages/ui-library/'
            ),
          },
        ],
      },
    };
  },
};
