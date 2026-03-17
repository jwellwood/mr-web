import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TestWrapper from '../../../../../../utils/test-helpers/TestWrapper';
import { useCopy } from '../../../hooks';
import TeamAdminView from '../TeamAdminView';

vi.mock('../../form/SetAdminAccessCode', () => ({
  default: () => <div>Set Admin Access Code</div>,
}));

vi.mock('../../../hooks', () => ({
  useCopy: vi.fn(),
}));

const mockedUseCopy = vi.mocked(useCopy);

describe('TeamAdminView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders admin code and users when data is provided', () => {
    mockedUseCopy.mockReturnValue({
      copied: false,
      onCopy: vi.fn(),
    });

    render(
      <TestWrapper>
        <TeamAdminView
          team={{
            teamName: 'Rovers',
            teamAdminAccessCode: 'abc123',
            adminUsers: [{ username: 'john', email: 'john@example.com' }],
          }}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Rovers')).toBeInTheDocument();
    expect(screen.getByText('abc123')).toBeInTheDocument();
    expect(screen.getByText('john')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
    expect(mockedUseCopy).toHaveBeenCalledWith('abc123');
  });

  it('shows copied label and calls onCopy when copy button is clicked', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();

    mockedUseCopy.mockReturnValue({
      copied: true,
      onCopy,
    });

    render(
      <TestWrapper>
        <TeamAdminView
          team={{
            teamName: 'Rovers',
            teamAdminAccessCode: 'abc123',
            adminUsers: [],
          }}
        />
      </TestWrapper>
    );

    const copyButton = screen.getByRole('button', { name: 'Copied' });
    await user.click(copyButton);

    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it('shows fallback state when admin code is not set', () => {
    mockedUseCopy.mockReturnValue({
      copied: false,
      onCopy: vi.fn(),
    });

    render(
      <TestWrapper>
        <TeamAdminView
          team={{
            teamName: 'Rovers',
            teamAdminAccessCode: null,
            adminUsers: [],
          }}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Not set')).toBeInTheDocument();
    expect(screen.getByText('Set Admin Access Code')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Copy code' })).not.toBeInTheDocument();
    expect(mockedUseCopy).toHaveBeenCalledWith('');
  });
});
