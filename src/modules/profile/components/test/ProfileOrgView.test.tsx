import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ProfileOrgsView from '../ProfileOrgView';

vi.mock('../../../home/containers/OrgSearch', () => ({
  default: ({ buttonElement }: { buttonElement: React.ReactNode }) => (
    <div data-testid="org-search">{buttonElement}</div>
  ),
}));

vi.mock('../../../home/containers/TeamSearch', () => ({
  default: ({ buttonElement }: { buttonElement: React.ReactNode }) => (
    <div data-testid="team-search">{buttonElement}</div>
  ),
}));

const makeOrg = (id: string, name: string) => ({
  _id: id,
  name,
  badge: { url: `https://example.com/${id}.png`, public_id: `org-${id}` },
});

describe('ProfileOrgsView', () => {
  it('renders the Organizations header', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Organizations')).toBeInTheDocument();
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

  it('renders the OrgSearch button in the header', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <ProfileOrgsView loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByTestId('org-search')).toBeInTheDocument();
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
