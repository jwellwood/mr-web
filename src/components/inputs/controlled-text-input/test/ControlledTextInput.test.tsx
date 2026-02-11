import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ControlledTextInput from '../ControlledTextInput';

// Integration test component wrapper
function TestForm({ defaultValues = {}, onSubmit = () => {} }) {
  const { control, handleSubmit } = useForm<{ email: string }>({
    defaultValues,
    mode: 'onBlur', // Validate on blur
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('ControlledTextInput', () => {
  it('renders and integrates with react-hook-form', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ email: 'test@example.com' }} />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test@example.com');
  });

  it('updates form state when user types', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm onSubmit={onSubmit} />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Email');
    await user.type(input, 'new@example.com');

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'new@example.com',
        }),
        expect.anything()
      );
    });
  });

  it('renders without error message initially', () => {
    function FormWithValidation() {
      const { control } = useForm({
        defaultValues: { email: '' },
        mode: 'onBlur',
      });

      return <ControlledTextInput control={control} name="email" label="Email" />;
    }

    render(
      <TestWrapper>
        <FormWithValidation />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    // No error should be visible initially
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('is accessible via keyboard navigation', async () => {
    const user = userEvent.setup();

    function SimpleForm() {
      const { control } = useForm({ defaultValues: { email: '' } });

      return <ControlledTextInput control={control} name="email" label="Email" />;
    }

    render(
      <TestWrapper>
        <SimpleForm />
      </TestWrapper>
    );

    await user.tab();
    expect(screen.getByLabelText('Email')).toHaveFocus();
  });

  it('supports password input type', () => {
    function PasswordForm() {
      const { control } = useForm({ defaultValues: { password: '' } });

      return <ControlledTextInput control={control} name="password" label="Password" isPassword />;
    }

    render(
      <TestWrapper>
        <PasswordForm />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('supports multiline textarea', () => {
    function MultilineForm() {
      const { control } = useForm({ defaultValues: { description: '' } });

      return (
        <ControlledTextInput control={control} name="description" label="Description" multiline />
      );
    }

    render(
      <TestWrapper>
        <MultilineForm />
      </TestWrapper>
    );

    const textarea = screen.getByLabelText('Description');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('handles placeholder text', () => {
    function FormWithPlaceholder() {
      const { control } = useForm({ defaultValues: { name: '' } });

      return (
        <ControlledTextInput
          control={control}
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
      );
    }

    render(
      <TestWrapper>
        <FormWithPlaceholder />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('handles user clearing input', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ email: 'old@example.com' }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Email');
    await user.clear(input);
    await user.type(input, 'new@example.com');

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'new@example.com',
        }),
        expect.anything()
      );
    });
  });
});
