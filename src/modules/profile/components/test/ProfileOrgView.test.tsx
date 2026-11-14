import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { afterEach, describe, it, expect, vi } from 'vitest';
import i18n from '../../../../i18n/react-i18n';
import { resetAuth, setAuth, store } from '../../../../store';
import { theme } from '../../../../theme';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ProfileOrgsView from '../ProfileOrgView';

vi.mock('../../../admin/containers/RequestOrgAdmin', () => ({
  default: () => <div data-testid="request-org-admin" />,
}));

vi.mock('../../../admin/containers/RequestTeamAdmin', () => ({
  default: () => <div data-testid="request-team-admin" />,
}));

const makeOrg = (id: string, name: string) => ({
  _id: id,
  name,
  badge: { url: `https://example.com/${id}.png`, public_id: `org-${id}` },
});

describe('ProfileOrgsView', () => {
  afterEach(() => {
    store.dispatch(resetAuth());
  });

  it('renders the Organizations header', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(
      screen.getByText(i18n.t('HEADERS.ORGANIZATIONS', { ns: 'profile' }))
    ).toBeInTheDocument();
  });

  it('renders NoProfileItems when data has no orgs', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView loading={false} data={{ orgs: [] }} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('No organizations found')).toBeInTheDocument();
  });

  it('renders org names when data is populated', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView
            loading={false}
            data={{
              orgs: [makeOrg('1', 'FC Barcelona'), makeOrg('2', 'Real Madrid')],
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('FC Barcelona')).toBeInTheDocument();
    expect(screen.getByText('Real Madrid')).toBeInTheDocument();
  });

  it('shows admin and user labels with their respective colors', () => {
    store.dispatch(setAuth({ orgIds: ['1'] }));
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView
            loading={false}
            data={{ orgs: [makeOrg('1', 'Admin org'), makeOrg('2', 'Team-only org')] }}
          />
        </TestWrapper>
      </MemoryRouter>
    );

    const adminLink = screen.getByRole('link', { name: /Admin org/ });
    const teamOnlyLink = screen.getByRole('link', { name: /Team-only org/ });
    expect(within(adminLink).getByText('Admin')).toHaveStyle({
      color: theme.palette.tertiary.main,
    });
    expect(within(teamOnlyLink).queryByText('Admin')).not.toBeInTheDocument();
    expect(within(teamOnlyLink).getByText('User')).toHaveStyle({ color: theme.palette.info.main });
    expect(within(adminLink).queryByText('User')).not.toBeInTheDocument();
  });

  it('renders the request admin button in the header', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByTestId('request-org-admin')).toBeInTheDocument();
  });

  it('renders a DataError when error is provided', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView
            loading={false}
            error={{
              message: 'Fetch failed',
              graphQLErrors: [],
              networkError: null,
            }}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText(/fetch failed/i)).toBeInTheDocument();
  });
});
