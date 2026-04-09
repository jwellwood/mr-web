import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ProfilePage from '../../pages/ProfilePage';

vi.mock('../../../../hooks', async () => {
  const actual = await vi.importActual<typeof import('../../../../hooks')>('../../../../hooks');
  return {
    ...actual,
    useAuth: () => ({ isAuth: true }),
    useDateOfBirth: () => ({ age: '34', formattedDateOfBirth: '15/06/1990' }),
  };
});

// Lazy containers - mock to avoid apollo/graphql deps
vi.mock('../../containers/ProfileOrganization', () => ({
  default: () => <div data-testid="profile-organizations" />,
}));

vi.mock('../../containers/ProfileTeams', () => ({
  default: () => <div data-testid="profile-teams" />,
}));

vi.mock('../../components/ProfileView', () => ({
  default: ({ data }: { data?: { user?: { username?: string } } }) => (
    <div data-testid="profile-view">{data?.user?.username}</div>
  ),
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
    createdAt: '2020-01-01',
    updatedAt: '2021-01-01',
  },
};

describe('ProfilePage', () => {
  it('renders the Profile page title', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfilePage data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders the ProfileView with data', async () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfilePage data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(await screen.findByTestId('profile-view')).toBeInTheDocument();
    expect(screen.getByText('jdoe')).toBeInTheDocument();
  });

  it('renders the ProfileOrganizations container', async () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfilePage data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(await screen.findByTestId('profile-organizations')).toBeInTheDocument();
  });

  it('renders the ProfileTeams container', async () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfilePage data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(await screen.findByTestId('profile-teams')).toBeInTheDocument();
  });

  it('renders admin links when user is authenticated', async () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfilePage data={baseData} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    // Admin links are shown via the EditLinksModal — verified by the 'Admin' dropdown button
    expect(await screen.findByRole('button', { name: 'Admin' })).toBeInTheDocument();
  });
});
