import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ProfileView from '../ProfileView';

vi.mock('../../../../hooks', async () => {
  const actual = await vi.importActual<typeof import('../../../../hooks')>('../../../../hooks');
  return {
    ...actual,
    useDateOfBirth: () => ({ age: '34', formattedDateOfBirth: '15/06/1990' }),
  };
});

// Mock GettingStarted to avoid localStorage interaction noise in these tests
vi.mock('../GettingStarted', () => ({
  default: () => <div data-testid="getting-started" />,
}));

const baseData = {
  user: {
    _id: 'user-1',
    isVerified: true,
    username: 'jdoe',
    email: 'jdoe@example.com',
    roles: [] as string[],
    dateOfBirth: '1990-06-15T00:00:00.000Z',
    nationality: 'GB',
    image: { url: 'https://example.com/img.png', public_id: 'img-1' },
    teamIds: [],
    orgIds: [],
    createdAt: '2020-01-01T00:00:00.000Z',
    updatedAt: '2021-06-01T00:00:00.000Z',
  },
};

describe('ProfileView', () => {
  it('renders the username', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileView data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('jdoe')).toBeInTheDocument();
  });

  it('renders the email address', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileView data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('jdoe@example.com')).toBeInTheDocument();
  });

  it('renders the DataError component when an error is provided', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileView
            loading={false}
            error={{
              message: 'Not found',
              graphQLErrors: [],
              networkError: null,
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('renders the GettingStarted section', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileView data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByTestId('getting-started')).toBeInTheDocument();
  });

  it('renders a spinner-like state when loading (no username yet)', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileView data={undefined} loading={true} />
        </TestWrapper>
      </MemoryRouter>
    );
    // When loading there is no username, component renders the skeleton/empty state
    expect(screen.queryByText('jdoe')).not.toBeInTheDocument();
  });
});
