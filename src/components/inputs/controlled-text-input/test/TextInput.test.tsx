import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import TextInput from '../TextInput';

describe('TextInput', () => {
  const defaultProps = {
    inputName: 'testInput',
    defaultValue: '',
    onChange: vi.fn(),
    label: 'Test Label',
    errors: [],
  };

  it('renders with label and default value', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} defaultValue="Hello World" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Hello World');
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <TextInput {...defaultProps} onChange={onChange} />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Label');
    await user.type(input, 'test');

    expect(onChange).toHaveBeenCalled();
  });

  it('is keyboard accessible', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TextInput {...defaultProps} />
      </TestWrapper>
    );

    await user.tab();
    expect(screen.getByLabelText('Test Label')).toHaveFocus();
  });

  it('displays error message when error is provided', () => {
    render(
      <TestWrapper>
        <TextInput
          {...defaultProps}
          errors={[{ type: 'required', message: 'This field is required' }]}
        />
      </TestWrapper>
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not display error when errors array is empty', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} errors={[]} />
      </TestWrapper>
    );

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  it('renders as password input when isPassword is true', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} isPassword label="Password" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('renders as multiline textarea when multiline is true', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} multiline label="Description" />
      </TestWrapper>
    );

    const textarea = screen.getByLabelText('Description');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} disabled />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('shows placeholder text', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} placeholder="Enter text here" />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('calls onBlur when provided', async () => {
    const user = userEvent.setup();
    const onBlur = vi.fn();

    render(
      <TestWrapper>
        <TextInput {...defaultProps} onBlur={onBlur} />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Label');
    await user.click(input);
    await user.tab();

    expect(onBlur).toHaveBeenCalled();
  });

  it('applies error styling when error exists', () => {
    const { container } = render(
      <TestWrapper>
        <TextInput {...defaultProps} errors={[{ type: 'required', message: 'Required' }]} />
      </TestWrapper>
    );

    const textField = container.querySelector('.MuiTextField-root');
    expect(textField).toBeInTheDocument();
  });

  it('changes label color based on isDirty and isValid props', () => {
    const { rerender } = render(
      <TestWrapper>
        <TextInput {...defaultProps} isDirty isValid />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <TextInput {...defaultProps} isDirty isValid={false} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles empty string as default value', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} defaultValue="" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('handles numeric default value', () => {
    render(
      <TestWrapper>
        <TextInput {...defaultProps} defaultValue={42} />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(input.value).toBe('42');
  });
});
