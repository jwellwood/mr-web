import type { Meta, StoryObj } from '@storybook/react';

import LogoutButton from './LogoutButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LogoutButton> = {
  title: 'Buttons/LogoutButton',
  component: LogoutButton,
};

export default meta;
type Story = StoryObj<typeof LogoutButton>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
    onClick: () => alert('You clicked the button!'),
  },
};
