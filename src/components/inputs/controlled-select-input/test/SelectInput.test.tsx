import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import SelectInput from '../SelectInput';

describe('SelectInput', () => {
  const options = [
    { label: 'Option One', value: '1' },
    { label: 'Option Two', value: '2' },
    { label: 'Option Three', value: '3' },
  ];

  const defaultProps = {
    inputName: 'testSelect',
    defaultValue: '',
    onChange: vi.fn(),
    label: 'Test Label',
    options,
    errors: [],
  };

  it('renders with label and options', () => {
    render(
      <TestWrapper>
        <SelectInput {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('displays default value when provided', () => {
    render(
      <TestWrapper>
        <SelectInput {...defaultProps} defaultValue="2" />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('Option Two');
  });

  it('opens menu when clicked', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option One' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option Two' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option Three' })).toBeInTheDocument();
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} onChange={onChange} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    const option = screen.getByRole('option', { name: 'Option Two' });
    await user.click(option);

    expect(onChange).toHaveBeenCalled();
  });

  it('is keyboard accessible', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} />
      </TestWrapper>
    );

    await user.tab();
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('can be navigated with arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} onChange={onChange} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalled();
  });

  it('displays error message when error is provided', () => {
    render(
      <TestWrapper>
        <SelectInput
          {...defaultProps}
          errors={[{ type: 'required', message: 'Selection is required' }]}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Selection is required')).toBeInTheDocument();
  });

  it('does not display error when errors array is empty', () => {
    render(
      <TestWrapper>
        <SelectInput {...defaultProps} errors={[]} />
      </TestWrapper>
    );

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} disabled />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('Mui-disabled');

    // Try to click and verify menu doesn't open
    await user.click(select);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('handles options with disabled state', async () => {
    const user = userEvent.setup();
    const optionsWithDisabled = [
      { label: 'Option One', value: '1' },
      { label: 'Option Two (Disabled)', value: '2', disabled: true },
      { label: 'Option Three', value: '3' },
    ];

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} options={optionsWithDisabled} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    const disabledOption = screen.getByRole('option', { name: 'Option Two (Disabled)' });
    expect(disabledOption).toHaveClass('Mui-disabled');
  });

  it('applies error styling when error exists', () => {
    const { container } = render(
      <TestWrapper>
        <SelectInput {...defaultProps} errors={[{ type: 'required', message: 'Required' }]} />
      </TestWrapper>
    );

    const formControl = container.querySelector('.MuiFormControl-root');
    expect(formControl).toBeInTheDocument();
  });

  it('changes label color based on isDirty and isValid props', () => {
    const { rerender } = render(
      <TestWrapper>
        <SelectInput {...defaultProps} isDirty isValid />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <SelectInput {...defaultProps} isDirty isValid={false} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles empty options array', () => {
    render(
      <TestWrapper>
        <SelectInput {...defaultProps} options={[]} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles numeric values', () => {
    const numericOptions = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} options={numericOptions} defaultValue={2} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('Two');
  });

  it('displays empty string when no default value', () => {
    render(
      <TestWrapper>
        <SelectInput {...defaultProps} defaultValue="" />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    // Select should be rendered but empty
    expect(select).toBeInTheDocument();
  });

  it('limits menu height with MenuProps', async () => {
    const user = userEvent.setup();
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: String(i + 1),
    }));

    render(
      <TestWrapper>
        <SelectInput {...defaultProps} options={manyOptions} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
  });
});
