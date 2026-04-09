import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import { changePasswordFormState } from '../../forms/edit-password/schema';
import EditPasswordPage from '../EditPasswordPage';

describe('EditPasswordPage', () => {
  it('renders the Change Password page title', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditPasswordPage
            onSubmit={vi.fn()}
            loading={false}
            defaultValues={changePasswordFormState}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });

  it('renders the password form fields', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditPasswordPage
            onSubmit={vi.fn()}
            loading={false}
            defaultValues={changePasswordFormState}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^New Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm New Password$/i)).toBeInTheDocument();
  });

  it('shows spinner when loading', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditPasswordPage
            onSubmit={vi.fn()}
            loading={true}
            defaultValues={changePasswordFormState}
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
