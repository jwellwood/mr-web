import { Meta, StoryObj } from '@storybook/react-vite';
import LinkButton from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Buttons/LinkButton',
  component: LinkButton,
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Basic: Story = {
  args: {
    link: '/home',
    children: 'Go home',
  },
};
