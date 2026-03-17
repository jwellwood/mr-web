import '@testing-library/jest-dom/vitest';
import { useQuery } from '@apollo/client/react';
import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { useAuth } from '../../../../../../hooks';
import { useCustomParams } from '../../../../../../hooks/useCustomParams';
import AdminTeam from '../AdminTeam';

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
}));

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

const mockedUseQuery = vi.mocked(useQuery);
const mockedUseAuth = vi.mocked(useAuth);
const mockedUseCustomParams = vi.mocked(useCustomParams);

describe('AdminTeam', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCustomParams.mockReturnValue({ teamId: 'team-1', orgId: 'org-1' } as never);
    mockedUseAuth.mockReturnValue({ isOrgAuth: false } as never);
  });

  it('renders spinner while loading', () => {
    mockedUseQuery.mockReturnValue({ data: undefined, loading: true, error: undefined } as never);

    render(<AdminTeam />);

    expect(screen.getByText('Spinner')).toBeInTheDocument();
    expect(screen.queryByText(/TeamAdminView:/)).not.toBeInTheDocument();
  });

  it('renders team admin view when query succeeds', () => {
    mockedUseQuery.mockReturnValue({
      data: { team: { teamName: 'Rovers' } },
      loading: false,
      error: undefined,
    } as never);

    render(<AdminTeam />);

    expect(screen.getByText('TeamAdminView:Rovers')).toBeInTheDocument();
    expect(mockedUseQuery).toHaveBeenCalledWith(expect.anything(), {
      variables: { teamId: 'team-1' },
    });
  });

  it('renders DataError when query fails', () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: { message: 'boom' },
    } as never);

    render(<AdminTeam />);

    expect(screen.getByText('DataError:boom')).toBeInTheDocument();
    expect(screen.queryByText('Spinner')).not.toBeInTheDocument();
  });

  it('passes empty links to page header for org auth users', () => {
    mockedUseAuth.mockReturnValue({ isOrgAuth: true } as never);
    mockedUseQuery.mockReturnValue({
      data: { team: { teamName: 'Rovers' } },
      loading: false,
      error: undefined,
    } as never);

    render(<AdminTeam />);

    expect(screen.getByTestId('links-mode')).toHaveTextContent('empty-links');
  });
});
