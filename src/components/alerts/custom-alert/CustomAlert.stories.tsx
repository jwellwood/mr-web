import { Meta, StoryObj } from '@storybook/react-vite';
import CustomAlert from './CustomAlert';

const meta: Meta<typeof CustomAlert> = {
  title: 'Alerts/CustomAlert',
  component: CustomAlert,
  decorators: [Story => <Story />],
};

export default meta;

type Story = StoryObj<typeof CustomAlert>;

export const Basic: Story = {
  render: () => (
    <>
      <CustomAlert type="success" text="Success Alert text" />
      <CustomAlert type="error" text="Error Alert text" />
      <CustomAlert type="warning" text="Warning Alert text" />
      <CustomAlert type="info" text="Info Alert text" />
    </>
  ),
};
