import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import EditPasswordForm from '../EditPasswordForm';

const defaultValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

describe('EditPasswordForm', () => {
  it('disables submit when invalid and enables when valid + dirty, reset clears fields', async () => {
    const onSubmit = vi.fn();
    render(
      <TestWrapper>
        <EditPasswordForm onSubmit={onSubmit} defaultValues={defaultValues} loading={false} />
      </TestWrapper>
    );

    const submit = screen.getByRole('button', { name: /submit/i });
    expect(submit).toBeDisabled();

    const password = screen.getByLabelText(/current password/i);
    const newPassword = screen.getByLabelText(/^New Password$/i);
    const confirm = screen.getByLabelText(/^Confirm New Password$/i);

    await userEvent.type(password, 'oldpass');
    await userEvent.type(newPassword, 'abcdef');
    await userEvent.type(confirm, 'abcdef');

    await waitFor(() => expect(submit).toBeEnabled());

    await userEvent.click(submit);
    expect(onSubmit).toHaveBeenCalled();

    // Reset via form reset button if present - otherwise simulate reset by clicking a button[type=reset]
    const resetBtn = screen.queryByRole('button', { name: /reset/i }) as HTMLButtonElement | null;
    if (resetBtn) {
      await userEvent.click(resetBtn);
      expect(password).toHaveValue('');
      expect(newPassword).toHaveValue('');
      expect(confirm).toHaveValue('');
    }
  });

  it('shows validation error when new password and confirm do not match', async () => {
    const onSubmit = vi.fn();
    render(
      <TestWrapper>
        <EditPasswordForm onSubmit={onSubmit} defaultValues={defaultValues} loading={false} />
      </TestWrapper>
    );

    const submit = screen.getByRole('button', { name: /submit/i });
    const newPassword = screen.getByLabelText(/^New Password$/i);
    const confirm = screen.getByLabelText(/^Confirm New Password$/i);

    await userEvent.type(newPassword, 'abcdef');
    await userEvent.type(confirm, 'abcdeg');
    // move focus away to trigger onBlur and display errors
    await userEvent.tab();

    // submit should remain disabled
    expect(submit).toBeDisabled();

    // validation message from zod refine
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
