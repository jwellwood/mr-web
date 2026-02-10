import { Meta, StoryObj } from '@storybook/react-vite';
import { TApolloError } from '../../../types/apollo';
import DataError from './DataError';

const meta: Meta<typeof DataError> = {
  title: 'Errors/DataError',
  component: DataError,
};

export default meta;

type Story = StoryObj<typeof DataError>;

const error: TApolloError = {
  message: 'Mock error message',
  networkError: new Error('Mock network error'),
};

export const Basic: Story = {
  render: () => <DataError error={error} />,
};
