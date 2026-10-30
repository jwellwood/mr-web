import '@testing-library/jest-dom/vitest';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { FETCH_TEAM_ADMIN_VIEW } from '../../graphql';
import AdminTeam from '../AdminTeam';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../../../hooks/useCustomParams', () => ({
  useCustomParams: vi.fn(),
}));

vi.mock('../../../../components', () => ({
  DataError: ({ error }: { error?: { message?: string } }) => (
    <div>DataError:{error?.message || 'unknown'}</div>
  ),
  PageHeader: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

vi.mock('../../../../components/loaders', () => ({
  Spinner: () => <div>Spinner</div>,
}));

vi.mock('../../components/TeamAdminView', () => ({
  default: ({ team }: { team?: { teamName?: string } }) => (
    <div>TeamAdminView:{team?.teamName || 'none'}</div>
  ),
}));

const mockedUseCustomParams = vi.mocked(useCustomParams);

describe('AdminTeam GraphQL integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCustomParams.mockReturnValue({ teamId: 'team-1', orgId: 'org-1' } as never);
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
});
