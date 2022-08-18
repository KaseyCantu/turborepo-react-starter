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
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: '@kasey-turbo/ui-library',
            replacement: path.resolve(__dirname, '../../../libs/ui-library/'),
          },
        ],
      },
    };
  },
};
