import { Meta, StoryObj } from '@storybook/react-vite';

import CustomButton from './CustomButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CustomButton> = {
  title: 'Buttons/CustomButton',
  component: CustomButton,
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const Basic: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('You clicked the button!'),
  },
};
