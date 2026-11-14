import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import OrgAdminView from '../OrgAdminView';

vi.mock('../../containers/ToggleAdminAccessEnabled', () => ({
  default: ({ data }: { data: { enabled: boolean } }) => (
    <div>Admin access {data.enabled ? 'enabled' : 'disabled'}</div>
  ),
}));

vi.mock('../../containers/SetAdminAccessCode', () => ({
  default: () => <div>Set Admin Access Code</div>,
}));

describe('OrgAdminView', () => {
  it('displays the organization, code, and admin users when access is enabled', () => {
    render(
      <TestWrapper>
        <OrgAdminView
          loading={false}
          org={{
            orgName: 'League One',
            orgAdminAccessEnabled: true,
            orgAdminAccessCode: 'league-code',
            adminUsers: [{ username: 'jane', email: 'jane@example.com' }],
          }}
        />
      </TestWrapper>
    );

    expect(screen.getByText('League One')).toBeInTheDocument();
    expect(screen.getByText('Admin access enabled')).toBeInTheDocument();
    expect(screen.getByText('league-code')).toBeInTheDocument();
    expect(screen.getByText('jane')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('hides the code when access is disabled', () => {
    render(
      <TestWrapper>
        <OrgAdminView
          loading={false}
          org={{
            orgName: 'League One',
            orgAdminAccessEnabled: false,
            orgAdminAccessCode: 'league-code',
            adminUsers: [],
          }}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Admin access disabled')).toBeInTheDocument();
    expect(screen.queryByText('league-code')).not.toBeInTheDocument();
  });

  it('displays a query error', () => {
    render(
      <TestWrapper>
        <OrgAdminView loading={false} error={{ message: 'Unable to load league' }} />
      </TestWrapper>
    );

    expect(screen.getByText('Unable to load league')).toBeInTheDocument();
  });

  it('shows loading instead of the organization or error', () => {
    render(
      <TestWrapper>
        <OrgAdminView loading error={{ message: 'Unable to load league' }} />
      </TestWrapper>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Unable to load league')).not.toBeInTheDocument();
    expect(screen.queryByText('Admin access disabled')).not.toBeInTheDocument();
  });
});
