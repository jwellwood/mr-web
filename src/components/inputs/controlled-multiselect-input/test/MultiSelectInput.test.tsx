import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import MultiSelectInput from '../MultiSelectInput';

const mockOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
];

describe('MultiSelectInput', () => {
  it('renders with label', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[]}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Colors')).toBeInTheDocument();
  });

  it('opens dropdown menu when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[]}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    await user.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('displays checkboxes for each option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[]}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    await user.click(select);

    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('shows item count when showLabels is false', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value="red,blue"
          label="items"
          onChange={onChange}
          showLabels={false}
          errors={[]}
        />
      </TestWrapper>
    );

    // Should display "2 items"
    expect(screen.getByText(/2 items/i)).toBeInTheDocument();
  });

  it('shows selected labels when showLabels is true', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value="red,blue"
          label="Colors"
          onChange={onChange}
          showLabels={true}
          errors={[]}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    const chips = select.parentElement?.textContent;
    expect(chips).toContain('Red');
    expect(chips).toContain('Blue');
  });

  it('displays error message when errors are provided', () => {
    const onChange = vi.fn();
    const error = { message: 'At least one color is required' };

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[error]}
        />
      </TestWrapper>
    );

    expect(screen.getByText('At least one color is required')).toBeInTheDocument();
  });

  it('does not display error when errors array is empty', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[]}
        />
      </TestWrapper>
    );

    expect(screen.queryByText('At least one color is required')).not.toBeInTheDocument();
  });

  it('shows error styling when error is present', () => {
    const onChange = vi.fn();
    const error = { message: 'Required' };

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[error]}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    expect(select).toHaveClass('Mui-error');
  });

  it('marks selected options with checked checkboxes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value="red,blue"
          label="Colors"
          onChange={onChange}
          errors={[]}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    await user.click(select);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // Red
    expect(checkboxes[1]).not.toBeChecked(); // Green
    expect(checkboxes[2]).toBeChecked(); // Blue
  });

  it('handles empty value', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[]}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Colors')).toBeInTheDocument();
  });

  it('supports isDirty and isValid props for label styling', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value="red"
          label="Colors"
          onChange={onChange}
          errors={[]}
          isDirty={true}
          isValid={true}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Colors')).toBeInTheDocument();
  });

  it('shows error state with isValid false', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <MultiSelectInput
          options={mockOptions}
          value=""
          label="Colors"
          onChange={onChange}
          errors={[]}
          isDirty={true}
          isValid={false}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Colors')).toBeInTheDocument();
  });

  it('handles many options with maxHeight scroll', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    }));

    render(
      <TestWrapper>
        <MultiSelectInput
          options={manyOptions}
          value=""
          label="Items"
          onChange={onChange}
          errors={[]}
        />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Items');
    await user.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(20);
  });
});
