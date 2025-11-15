import { Meta, StoryObj } from '@storybook/react-vite';

import BackButton from './BackButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof BackButton> = {
  title: 'Buttons/BackButton',
  component: BackButton,
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Basic: Story = {};
