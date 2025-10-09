import type { Meta, StoryObj } from '@storybook/react';

import SubmitButton from './SubmitButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SubmitButton> = {
  title: 'Buttons/SubmitButton',
  component: SubmitButton,
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const basic: Story = {
  args: {
    //👇 The args you need here will depend on your component
    onClick: () => alert('You clicked the button!'),
  },
};
export const loading: Story = {
  args: {
    //👇 The args you need here will depend on your component
    onClick: () => alert('You clicked the button!'),
    loading: true,
  },
};
