import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
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
  orgId: { _id: string; name: string }
) => ({
  _id: id,
  teamName: name,
  isActive: active,
  country: null as string | null,
  teamBadge: { url: `https://example.com/${id}.png`, public_id: `team-${id}` } as {
    url: string;
    public_id: string;
  } | null,
  orgId,
});

describe('ProfileTeamsView', () => {
  it('renders the Teams header', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileTeamsView loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Teams')).toBeInTheDocument();
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
