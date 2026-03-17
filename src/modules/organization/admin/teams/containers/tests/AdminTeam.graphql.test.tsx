import '@testing-library/jest-dom/vitest';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '../../../../../../hooks';
import { useCustomParams } from '../../../../../../hooks/useCustomParams';
import { FETCH_TEAM_ADMIN_VIEW } from '../../graphql';
import AdminTeam from '../AdminTeam';

vi.mock('../../../../../../hooks', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../../../../hooks/useCustomParams', () => ({
  useCustomParams: vi.fn(),
}));

vi.mock('../../../../../../components', () => ({
  DataError: ({ error }: { error?: { message?: string } }) => (
    <div>DataError:{error?.message || 'unknown'}</div>
  ),
  PageHeader: ({
    title,
    links,
    children,
  }: {
    title: string;
    links?: unknown[];
    children: React.ReactNode;
  }) => (
    <div>
      <h1>{title}</h1>
      <div data-testid="links-mode">{Array.isArray(links) ? 'empty-links' : 'default-links'}</div>
      {children}
    </div>
  ),
}));

vi.mock('../../../../../../components/loaders', () => ({
  Spinner: () => <div>Spinner</div>,
}));

vi.mock('../../components/TeamAdminView', () => ({
  default: ({ team }: { team?: { teamName?: string } }) => (
    <div>TeamAdminView:{team?.teamName || 'none'}</div>
  ),
}));

const mockedUseAuth = vi.mocked(useAuth);
const mockedUseCustomParams = vi.mocked(useCustomParams);

describe('AdminTeam GraphQL integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCustomParams.mockReturnValue({ teamId: 'team-1', orgId: 'org-1' } as never);
    mockedUseAuth.mockReturnValue({ isOrgAuth: false } as never);
  });

  it('renders loading first, then team admin view from GraphQL result', async () => {
    const mocks = [
      {
        request: {
          query: FETCH_TEAM_ADMIN_VIEW,
          variables: { teamId: 'team-1' },
        },
        result: {
          data: {
            team: {
              teamName: 'Rovers',
              teamAdminAccessCode: 'abc123',
              adminUsers: [],
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <AdminTeam />
      </MockedProvider>
    );

    expect(screen.getByText('Spinner')).toBeInTheDocument();
    expect(await screen.findByText('TeamAdminView:Rovers')).toBeInTheDocument();
  });

  it('renders DataError when GraphQL query fails', async () => {
    const mocks = [
      {
        request: {
          query: FETCH_TEAM_ADMIN_VIEW,
          variables: { teamId: 'team-1' },
        },
        error: new Error('boom'),
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <AdminTeam />
      </MockedProvider>
    );

    expect(screen.getByText('Spinner')).toBeInTheDocument();
    expect(await screen.findByText('DataError:boom')).toBeInTheDocument();
  });

  it('passes empty links to page header for org-auth users', async () => {
    mockedUseAuth.mockReturnValue({ isOrgAuth: true } as never);

    const mocks = [
      {
        request: {
          query: FETCH_TEAM_ADMIN_VIEW,
          variables: { teamId: 'team-1' },
        },
        result: {
          data: {
            team: {
              teamName: 'Rovers',
              teamAdminAccessCode: 'abc123',
              adminUsers: [],
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <AdminTeam />
      </MockedProvider>
    );

    expect(await screen.findByTestId('links-mode')).toHaveTextContent('empty-links');
  });
});
