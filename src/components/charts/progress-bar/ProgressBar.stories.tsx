import { Meta, StoryObj } from '@storybook/react-vite';
import ProgressBar from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Charts/ProgressBar',
  component: ProgressBar,
  argTypes: {
    max: {
      control: 'number',
    },
    value: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Basic: Story = {
  args: {
    max: 100,
    value: 70,
  },
};
