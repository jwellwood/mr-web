import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ControlledMultiSelectInput from '../ControlledMultiSelectInput';

const mockOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
];

interface FormValues {
  colors?: string;
}

function TestForm({
  defaultValues = {},
  onSubmit = () => {},
  showLabels = false,
}: {
  defaultValues?: Partial<FormValues>;
  onSubmit?: (data: FormValues) => void;
  showLabels?: boolean;
}) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledMultiSelectInput
        control={control}
        name="colors"
        label="Colors"
        options={mockOptions}
        showLabels={showLabels}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('ControlledMultiSelectInput', () => {
  it('renders and integrates with react-hook-form', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ colors: 'red,blue' }} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Colors')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    await user.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('submits form with selected values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ colors: 'red,green' }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          colors: 'red,green',
        }),
        expect.anything()
      );
    });
  });

  it('displays selected options with checkmarks', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ colors: 'red,blue' }} />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    await user.click(select);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // Red
    expect(checkboxes[1]).not.toBeChecked(); // Green
    expect(checkboxes[2]).toBeChecked(); // Blue
  });

  it('updates form state when option is selected', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ colors: '' }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    await user.click(select);

    const greenOption = screen.getByRole('option', { name: 'Green' });
    await user.click(greenOption);

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('shows labels when showLabels is true', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ colors: 'red,blue' }} showLabels={true} />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Colors');
    const content = select.parentElement?.textContent;
    expect(content).toContain('Red');
    expect(content).toContain('Blue');
  });

  it('shows count when showLabels is false', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ colors: 'red,blue' }} showLabels={false} />
      </TestWrapper>
    );

    expect(screen.getByText(/2 Colors/i)).toBeInTheDocument();
  });

  it('handles empty selection', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ colors: '' }} />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Colors')).toBeInTheDocument();
  });

  it('is accessible via keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    );

    await user.tab();
    expect(screen.getByLabelText('Colors')).toHaveFocus();
  });

  it('updates correctly in controlled form scenario', async () => {
    function ControlledForm() {
      const { control, watch } = useForm<FormValues>({
        defaultValues: { colors: 'red' },
      });

      const currentColors = watch('colors');

      return (
        <div>
          <ControlledMultiSelectInput
            control={control}
            name="colors"
            label="Colors"
            options={mockOptions}
          />
          <div data-testid="current-value">{currentColors}</div>
        </div>
      );
    }

    render(
      <TestWrapper>
        <ControlledForm />
      </TestWrapper>
    );

    expect(screen.getByTestId('current-value')).toHaveTextContent('red');
  });

  it('handles many options', async () => {
    const user = userEvent.setup();

    interface ManyFormValues {
      items?: string;
    }

    function ManyOptionsForm() {
      const { control } = useForm<ManyFormValues>({
        defaultValues: { items: '' },
      });

      const manyOptions = Array.from({ length: 30 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: `item-${i + 1}`,
      }));

      return (
        <ControlledMultiSelectInput
          control={control}
          name="items"
          label="Items"
          options={manyOptions}
        />
      );
    }

    render(
      <TestWrapper>
        <ManyOptionsForm />
      </TestWrapper>
    );

    const select = screen.getByLabelText('Items');
    await user.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(30);
  });
});
