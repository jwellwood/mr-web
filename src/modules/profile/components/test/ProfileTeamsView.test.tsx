import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { AUTH_ROLES } from '../../../../constants';
import i18n from '../../../../i18n/react-i18n';
import { resetAuth, setAuth, store } from '../../../../store';
import { theme } from '../../../../theme';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ProfileTeamsView from '../ProfileTeamsView';

vi.mock('../../../admin/containers/RequestOrgAdmin', () => ({
  default: () => <div data-testid="request-org-admin" />,
}));

vi.mock('../../../admin/containers/RequestTeamAdmin', () => ({
  default: () => <div data-testid="request-team-admin" />,
}));

const makeTeam = (
  id: string,
  name: string,
  active: boolean,
  org: { _id: string; name: string }
) => ({
  _id: id,
  teamName: name,
  isActive: active,
  country: null as string | null,
  teamBadge: { url: `https://example.com/${id}.png`, public_id: `team-${id}` } as {
    url: string;
    public_id: string;
  } | null,
  orgId: {
    ...org,
    badge: { url: `https://example.com/${org._id}.png`, public_id: `org-${org._id}` },
  },
});

describe('ProfileTeamsView', () => {
  afterEach(() => {
    store.dispatch(resetAuth());
  });

  it('renders the Teams header', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText(i18n.t('HEADERS.TEAMS', { ns: 'profile' }))).toBeInTheDocument();
  });

  it('renders NoProfileItems when there are no teams', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView loading={false} data={{ teams: [] }} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('No teams found')).toBeInTheDocument();
  });

  it('renders active team names', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView
            loading={false}
            data={{
              teams: [makeTeam('1', 'Rovers FC', true, { _id: 'org1', name: 'Premier Org' })],
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Rovers FC')).toBeInTheDocument();
  });

  it('marks administered active and inactive teams with tertiary secondary text', async () => {
    store.dispatch(setAuth({ roles: [AUTH_ROLES.TEAM_ADMIN], teamIds: ['1', '3'] }));
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView
            loading={false}
            data={{
              teams: [
                makeTeam('1', 'Admin team', true, { _id: 'org1', name: 'Org' }),
                makeTeam('2', 'Other team', true, { _id: 'org1', name: 'Org' }),
                makeTeam('3', 'Inactive admin team', false, { _id: 'org1', name: 'Org' }),
              ],
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );

    const adminLink = screen.getByRole('link', { name: /Admin team/ });
    expect(within(adminLink).getByText('Admin')).toHaveStyle({
      color: theme.palette.tertiary.main,
    });
    expect(
      within(screen.getByRole('link', { name: /Other team/ })).queryByText('Admin')
    ).not.toBeInTheDocument();
    expect(within(screen.getByRole('link', { name: /Other team/ })).getByText('User')).toHaveStyle({
      color: theme.palette.info.main,
    });

    await userEvent.click(screen.getByRole('tab', { name: 'Inactive' }));
    expect(
      within(screen.getByRole('link', { name: /Inactive admin team/ })).getByText('Admin')
    ).toHaveStyle({ color: theme.palette.tertiary.main });
  });

  it('shows user when the team admin role is absent', () => {
    store.dispatch(setAuth({ roles: [AUTH_ROLES.USER], teamIds: ['1'] }));
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView
            loading={false}
            data={{ teams: [makeTeam('1', 'Team', true, { _id: 'org1', name: 'Org' })] }}
          />
        </TestWrapper>
      </MemoryRouter>
    );

    expect(
      within(screen.getByRole('link', { name: /Team/ })).queryByText('Admin')
    ).not.toBeInTheDocument();
    expect(within(screen.getByRole('link', { name: /Team/ })).getByText('User')).toHaveStyle({
      color: theme.palette.info.main,
    });
  });

  it('groups teams by organisation name', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView
            loading={false}
            data={{
              teams: [
                makeTeam('1', 'Team A', true, { _id: 'org1', name: 'Org One' }),
                makeTeam('2', 'Team B', true, { _id: 'org2', name: 'Org Two' }),
              ],
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Org One')).toBeInTheDocument();
    expect(screen.getByText('Org Two')).toBeInTheDocument();
  });

  it('renders tabs when there are both active and inactive teams', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView
            loading={false}
            data={{
              teams: [
                makeTeam('1', 'Active Team', true, { _id: 'org1', name: 'Org One' }),
                makeTeam('2', 'Old Team', false, { _id: 'org1', name: 'Org One' }),
              ],
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('tab', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Inactive' })).toBeInTheDocument();
  });

  it('renders a DataError when error is provided', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView
            loading={false}
            error={{
              message: 'Network error',
              graphQLErrors: [],
              networkError: null,
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  it('renders the request admin button in the header', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('request-team-admin').length).toBeGreaterThan(0);
  });
});
