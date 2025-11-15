import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import LinkButton from './LinkButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LinkButton> = {
  title: 'Buttons/LinkButton',
  component: LinkButton,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Basic: Story = {
  args: {
    link: '/home',
    children: 'Go home',
  },
};
