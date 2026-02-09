import { Meta, StoryObj } from '@storybook/react-vite';
import ImageAvatar from './ImageAvatar';

const mockBadge =
  'https://imgs.search.brave.com/jiWCu7sSuaPVTuvMnnu4k0j1QscCCi2PmSCQGrX961U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/Mi81Ni9zcG9ydC10/ZWFtLWJhZGdlLWxp/b24tYmFsbC12ZWN0/b3ItMTM5NjQyNTYu/anBn';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ImageAvatar> = {
  title: 'Avatars/ImageAvatar',
  component: ImageAvatar,
  argTypes: {
    imageUrl: {
      control: 'select',
      options: [mockBadge, 'default', ''],
    },
    loading: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['30px', '50px', '90px'],
    },
    iconSize: {
      control: 'select',
      options: ['30px', '50px', '90px'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageAvatar>;

export const Default: Story = {
  args: {
    imageUrl: mockBadge,
    size: '50px',
  },
};
