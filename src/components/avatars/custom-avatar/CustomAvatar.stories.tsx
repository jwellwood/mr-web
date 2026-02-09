import { Meta, StoryObj } from '@storybook/react-vite';
import CustomAvatar from './CustomAvatar';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CustomAvatar> = {
  title: 'Avatars/CustomAvatar',
  component: CustomAvatar,
  argTypes: {
    border: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'transparent'], // dropdown options
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CustomAvatar>;

export const Basic: Story = {
  args: {
    border: 'primary',
    loading: false,
  },
};
