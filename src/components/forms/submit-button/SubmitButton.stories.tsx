import { Meta, StoryObj } from '@storybook/react-vite';
import SubmitButton from './SubmitButton';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SubmitButton> = {
  title: 'Buttons/SubmitButton',
  component: SubmitButton,
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Basic: Story = {
  args: {
    onClick: () => alert('You clicked the button!'),
  },
};
