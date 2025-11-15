import { Meta, StoryObj } from '@storybook/react-vite';

import CustomIconButton from './CustomIconButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CustomIconButton> = {
  title: 'Buttons/CustomIconButton',
  component: CustomIconButton,
};

export default meta;
type Story = StoryObj<typeof CustomIconButton>;

export const Basic: Story = {
  args: {
    color: 'white',
    icon: 'menu',
    //👇 The args you need here will depend on your component
    onClick: () => alert('You clicked the button!'),
  },
};
