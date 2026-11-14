import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminTeamPage from '../../pages/AdminTeamPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
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

describe('AdminTeamPage', () => {
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
});
