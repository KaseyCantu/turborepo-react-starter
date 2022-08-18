export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    values: [
      {
        name: 'Dashboard',
        value: 'rgb(249, 252, 255)',
      },
      {
        name: 'Sidebar',
        value: 'rgb(234, 240, 250)',
      },
    ],
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Atoms', 'Molecules', 'Organisms'],
    },
  },
};
