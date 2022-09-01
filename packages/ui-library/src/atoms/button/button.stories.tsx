import React from 'react';
import { Button } from "./Button"
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Atoms/Button',
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
<Button {...args}>{args.children}</Button>
);

export const Default = Template.bind({});

Default.args = {
  children: 'Kasey Rules!!'
};
