import { Meta, StoryObj } from '@storybook/react-vite';

import DataError from './DataError';
import { ApolloError } from '@apollo/client';

const meta: Meta<typeof DataError> = {
  title: 'Errors/DataError',
  component: DataError,
};

export default meta;

type Story = StoryObj<typeof DataError>;

const error = new ApolloError({
  networkError: {
    name: 'Mock Error',
    message: 'Mock error message',
    result: { errors: [{ message: 'error text here' }] },
  },
});

export const Basic: Story = {
  render: () => <DataError error={error} />,
};
