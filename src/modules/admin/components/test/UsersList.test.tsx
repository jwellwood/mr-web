import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import UsersList from '../UsersList';

describe('UsersList', () => {
  it('displays admin users and their emails', () => {
    render(
      <TestWrapper>
        <UsersList
          users={[
            { label: 'jane', value: 'jane@example.com' },
            { label: 'john', value: 'john@example.com' },
          ]}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Admin Users')).toBeInTheDocument();
    expect(screen.getByText('jane')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('john')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
