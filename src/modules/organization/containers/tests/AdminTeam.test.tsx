import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { useAuth } from '../../../../hooks';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import AdminTeamPage from '../../pages/AdminTeamPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../../../hooks', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../../hooks/useCustomParams', () => ({
  useCustomParams: vi.fn(),
}));

vi.mock('../../../../components', () => ({
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

vi.mock('../../../../components/loaders', () => ({
  Spinner: () => <div>Spinner</div>,
}));

vi.mock('../../components/TeamAdminView', () => ({
  default: ({ team }: { team?: { teamName?: string } }) => (
    <div>TeamAdminView:{team?.teamName || 'none'}</div>
  ),
}));

const mockedUseAuth = vi.mocked(useAuth);
const mockedUseCustomParams = vi.mocked(useCustomParams);

describe('AdminTeamPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCustomParams.mockReturnValue({ teamId: 'team-1', orgId: 'org-1' } as never);
    mockedUseAuth.mockReturnValue({ isOrgAuth: false } as never);
  });

  it('renders spinner while loading', () => {
    render(<AdminTeamPage data={undefined} loading={true} error={undefined} />);

    expect(screen.getByText('Spinner')).toBeInTheDocument();
    expect(screen.queryByText(/TeamAdminView:/)).not.toBeInTheDocument();
  });

  it('renders team admin view when data is loaded', () => {
    render(
      <AdminTeamPage
        data={{
          team: {
            __typename: 'TeamAdminView',
            teamName: 'Rovers',
            teamAdminAccessCode: null,
            adminUsers: [],
          },
        }}
        loading={false}
        error={undefined}
      />
    );

    expect(screen.getByText('TeamAdminView:Rovers')).toBeInTheDocument();
  });

  it('renders DataError when query fails', () => {
    render(<AdminTeamPage data={undefined} loading={false} error={{ message: 'boom' } as never} />);

    expect(screen.getByText('DataError:boom')).toBeInTheDocument();
    expect(screen.queryByText('Spinner')).not.toBeInTheDocument();
  });

  it('passes empty links to page header for org auth users', () => {
    mockedUseAuth.mockReturnValue({ isOrgAuth: true } as never);

    render(
      <AdminTeamPage
        data={{
          team: {
            __typename: 'TeamAdminView',
            teamName: 'Rovers',
            teamAdminAccessCode: null,
            adminUsers: [],
          },
        }}
        loading={false}
        error={undefined}
      />
    );

    expect(screen.getByTestId('links-mode')).toHaveTextContent('empty-links');
  });
});
