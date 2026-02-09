import { Meta, StoryObj } from '@storybook/react-vite';
import ErrorBoundary from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Errors/ErrorBoundary',
  component: ErrorBoundary,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

const ErrorComponent = () => {
  throw new Error('Mock error text here');
};

export const Basic: Story = {
  render: () => (
    <>
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    </>
  ),
};
