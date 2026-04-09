import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import SearchForm from '../SearchForm';

const renderForm = (type: 'team' | 'org' = 'team', onSubmit = vi.fn()) =>
  render(
    <TestWrapper>
      <SearchForm
        defaultValues={{ teamName: '' }}
        onSubmit={onSubmit}
        loading={false}
        type={type}
      />
    </TestWrapper>
  );

describe('SearchForm', () => {
  it('renders the "Team name" label when type is team', () => {
    renderForm('team');
    expect(screen.getByLabelText('Team name')).toBeInTheDocument();
  });

  it('renders the "League name" label when type is org', () => {
    renderForm('org');
    expect(screen.getByLabelText('League name')).toBeInTheDocument();
  });

  it('submit button is disabled when the field is empty', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });

  it('submit button is disabled when input is less than 2 characters', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Team name'), 'a');
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });

  it('submit button is enabled when input has at least 2 characters', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Team name'), 'ab');
    expect(screen.getByRole('button', { name: /search/i })).toBeEnabled();
  });

  it('calls onSubmit with the entered value when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderForm('team', onSubmit);
    await user.type(screen.getByLabelText('Team name'), 'Arsenal');
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(onSubmit.mock.calls[0][0]).toEqual({ teamName: 'Arsenal' });
  });

  it('clears the input when the reset icon is clicked', async () => {
    const user = userEvent.setup();
    renderForm();
    const input = screen.getByLabelText('Team name');
    await user.type(input, 'Arsenal');
    await user.click(screen.getByTestId('reset-icon'));
    expect(input).toHaveValue('');
  });
});
