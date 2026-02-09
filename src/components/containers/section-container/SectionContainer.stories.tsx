import { Meta, StoryObj } from '@storybook/react-vite';
import SectionContainer from './SectionContainer';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SectionContainer> = {
  title: 'Containers/SectionContainer',
  component: SectionContainer,
  argTypes: {
    title: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SectionContainer>;

export const Basic: Story = {
  args: {
    title: 'Section Title',
    subtitle: 'Section Subtitle',
    children: <div style={{ color: 'white', height: 200 }}>Children here</div>,
  },
};
