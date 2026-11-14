import { MockedProvider } from '@apollo/client/testing/react';
import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { useUpdateAuth } from '../../../../hooks';
import { resetAuth } from '../../../../store';
import { store } from '../../../../store/store';
import { authStorage } from '../../../../utils';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { FETCH_ORGS_BY_USER, FETCH_TEAMS_BY_USER, FETCH_USER } from '../../graphql';
import ProfileOrganizations from '../ProfileOrganization';

vi.mock('../../../admin/containers/RequestOrgAdmin', () => ({
  default: () => null,
}));

vi.mock('../../../admin/containers/RequestTeamAdmin', () => ({
  default: () => null,
}));

const org = (id: string, name: string) => ({
  __typename: 'Organization',
  _id: id,
  name,
  badge: { __typename: 'UploadedImage', public_id: id, url: `https://example.com/${id}.png` },
});

const team = (id: string, organization: ReturnType<typeof org>, isActive = true) => ({
  __typename: 'Team',
  _id: id,
  teamName: id,
  country: null,
  isActive,
  teamBadge: null,
  orgId: organization,
});

const orgMock = (orgs: ReturnType<typeof org>[]) => ({
  request: { query: FETCH_ORGS_BY_USER },
  result: { data: { orgs } },
});

const teamsMock = (teams: ReturnType<typeof team>[]) => ({
  request: { query: FETCH_TEAMS_BY_USER },
  result: { data: { teams } },
});

function RefreshAuth() {
  const { updateAuth } = useUpdateAuth();
  return <button onClick={() => void updateAuth('new-token')}>Refresh access</button>;
}

describe('ProfileOrganizations', () => {
  beforeAll(async () => {
    await import('../../components/ProfileOrgView');
  });

  afterEach(() => {
    authStorage.removeToken();
    store.dispatch(resetAuth());
  });

  it('merges direct and team organizations by ID, including inactive teams', async () => {
    const direct = org('1', 'Direct organization');
    const sameName = org('2', 'Direct organization');
    const inactive = org('3', 'Inactive team organization');
    render(
      <MemoryRouter>
        <MockedProvider
          mocks={[
            orgMock([direct]),
            teamsMock([
              team('a', direct),
              team('b', sameName),
              team('c', inactive, false),
              team('d', inactive),
            ]),
          ]}
        >
          <TestWrapper>
            <Suspense fallback={<div>Loading profile</div>}>
              <ProfileOrganizations />
            </Suspense>
          </TestWrapper>
        </MockedProvider>
      </MemoryRouter>
    );

    const directLinks = await screen.findAllByRole('link', { name: /Direct organization/ });
    expect(directLinks).toHaveLength(2);
    expect(directLinks.map(link => link.getAttribute('href'))).toEqual(['/org/1', '/org/2']);
    expect(screen.getByRole('link', { name: /Inactive team organization/ })).toHaveAttribute(
      'href',
      '/org/3'
    );
  });

  it('waits for both queries before showing organizations', async () => {
    const direct = org('1', 'Direct organization');
    render(
      <MemoryRouter>
        <MockedProvider mocks={[orgMock([direct]), { ...teamsMock([]), delay: 100 }]}>
          <TestWrapper>
            <Suspense fallback={<div>Loading profile</div>}>
              <ProfileOrganizations />
            </Suspense>
          </TestWrapper>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Direct organization')).not.toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /Direct organization/ })).toHaveAttribute(
      'href',
      '/org/1'
    );
  });

  it('shows no results when both lists are empty', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={[orgMock([]), teamsMock([])]}>
          <TestWrapper>
            <Suspense fallback={<div>Loading profile</div>}>
              <ProfileOrganizations />
            </Suspense>
          </TestWrapper>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('No organizations found')).toBeInTheDocument();
  });

  it.each([
    [
      'organizations',
      { request: { query: FETCH_ORGS_BY_USER }, error: new Error('Org failed') },
      teamsMock([]),
      'Org failed',
    ],
    [
      'teams',
      orgMock([]),
      { request: { query: FETCH_TEAMS_BY_USER }, error: new Error('Teams failed') },
      'Teams failed',
    ],
  ])('shows a %s query error instead of an empty list', async (_label, first, second, message) => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={[first, second]}>
          <TestWrapper>
            <Suspense fallback={<div>Loading profile</div>}>
              <ProfileOrganizations />
            </Suspense>
          </TestWrapper>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText(new RegExp(message, 'i'))).toBeInTheDocument();
    expect(screen.queryByText('No organizations found')).not.toBeInTheDocument();
  });

  it('refreshes organizations after admin access changes', async () => {
    const newOrg = org('new', 'New team organization');
    const mocks = [
      orgMock([]),
      teamsMock([]),
      {
        request: { query: FETCH_USER },
        result: {
          data: {
            user: {
              __typename: 'User',
              _id: 'user',
              isVerified: true,
              username: 'user',
              email: 'user@example.com',
              roles: ['USER', 'TEAM_ADMIN'],
              teamIds: ['team'],
              orgIds: [],
              createdAt: null,
              updatedAt: null,
              image: null,
              dateOfBirth: null,
              nationality: null,
            },
          },
        },
      },
      orgMock([]),
      teamsMock([team('team', newOrg)]),
    ];
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks}>
          <TestWrapper>
            <Suspense fallback={<div>Loading profile</div>}>
              <ProfileOrganizations />
              <RefreshAuth />
            </Suspense>
          </TestWrapper>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('No organizations found')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Refresh access' }));
    await waitFor(() =>
      expect(screen.getByRole('link', { name: /New team organization/ })).toHaveAttribute(
        'href',
        '/org/new'
      )
    );
  });
});
