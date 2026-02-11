import { Meta, StoryObj } from '@storybook/react-vite';
import { TEAM_ADMIN_LINKS } from '../../../modules/team/constants';
import PageHeader from './PageHeader';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof PageHeader> = {
  title: 'Shared/PageHeader',
  component: PageHeader,
  argTypes: {
    title: {
      control: { type: 'select' },
      options: ['Header', ''], // dropdown options
    },
    backButton: {
      control: { type: 'boolean' },
    },
    links: {
      control: { type: 'select' },
      options: [[], TEAM_ADMIN_LINKS],
    },
    children: {
      control: { type: 'select' },
      options: [
        <div style={{ height: '150vh', background: 'orange' }}>Page content goes here</div>,
        null,
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Basic: Story = {
  args: {
    title: 'Header',
  },
};
