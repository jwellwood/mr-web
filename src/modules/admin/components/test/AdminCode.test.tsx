import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { useCopy } from '../../../../hooks/useCopy';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import AdminCode from '../AdminCode';

vi.mock('../../containers/GenerateAdminCode', () => ({
  default: () => <button>Generate Admin Code</button>,
}));

vi.mock('../../containers/SetAdminAccessCode', () => ({
  default: () => <button>Set Admin Access Code</button>,
}));

vi.mock('../../../../hooks/useCopy', () => ({
  useCopy: vi.fn(),
}));

describe('AdminCode', () => {
  it('offers code generation for an organization and setting a missing code', () => {
    vi.mocked(useCopy).mockReturnValue({ copied: false, onCopy: vi.fn() });
    render(
      <TestWrapper>
        <AdminCode type="org" />
      </TestWrapper>
    );

    expect(screen.getByText('Not set')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Set Admin Access Code' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Admin Code' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument();
  });

  it('copies an existing code without offering team code generation', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    vi.mocked(useCopy).mockReturnValue({ copied: false, onCopy });
    render(
      <TestWrapper>
        <AdminCode type="team" accessCode="team-code" />
      </TestWrapper>
    );

    expect(screen.getByText('team-code')).toBeInTheDocument();
    expect(useCopy).toHaveBeenCalledWith('team-code');
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledOnce();
    expect(screen.queryByRole('button', { name: 'Set Admin Access Code' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Generate Admin Code' })).not.toBeInTheDocument();
  });
});
