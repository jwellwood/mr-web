import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import EditProfileForm from '../EditProfileForm';
import type { EditProfileFormData } from '../schema';

vi.mock('../../../../../hooks', async () => {
  const actual =
    await vi.importActual<typeof import('../../../../../hooks')>('../../../../../hooks');
  return {
    ...actual,
    useNationality: () => ({
      nationalityOptions: [
        { label: '', value: '' },
        { label: 'United Kingdom', value: 'GB' },
        { label: 'Spain', value: 'ES' },
      ],
      countryName: '',
      getCountryName: vi.fn(),
    }),
  };
});

const defaultValues: EditProfileFormData = {
  username: 'jdoe',
  email: 'jdoe@example.com',
  dateOfBirth: new Date('1990-06-15'),
  nationality: 'GB',
};

const renderForm = (overrides: Partial<EditProfileFormData> = {}) =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <EditProfileForm
          onSubmit={vi.fn()}
          defaultValues={{ ...defaultValues, ...overrides }}
          loading={false}
        />
      </TestWrapper>
    </MemoryRouter>
  );

describe('EditProfileForm', () => {
  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /date of birth/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nationality/i)).toBeInTheDocument();
  });

  it('submit button is disabled when form is not dirty', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('enables submit after changing a field', async () => {
    renderForm();
    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText(/username/i);
    await user.clear(usernameInput);
    await user.type(usernameInput, 'newname');
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled());
  });

  it('calls onSubmit with form values when submitted', async () => {
    const onSubmit = vi.fn();
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfileForm onSubmit={onSubmit} defaultValues={defaultValues} loading={false} />
        </TestWrapper>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText(/username/i);
    await user.clear(usernameInput);
    await user.type(usernameInput, 'newname');
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled());
    await user.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('shows validation error for username that is too short', async () => {
    renderForm();
    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText(/username/i);
    await user.clear(usernameInput);
    await user.type(usernameInput, 'x');
    await user.tab();
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled());
  });

  it('shows validation error for an invalid email', async () => {
    renderForm();
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email address/i);
    await user.clear(emailInput);
    await user.type(emailInput, 'not-an-email');
    await user.tab();
    await waitFor(() => expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled());
  });

  it('form shows spinner when loading', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfileForm onSubmit={vi.fn()} defaultValues={defaultValues} loading={true} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
