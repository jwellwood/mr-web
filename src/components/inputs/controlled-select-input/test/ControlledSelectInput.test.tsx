import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ControlledSelectInput from '../ControlledSelectInput';

const mockOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
];

interface FormValues {
  color?: string;
}

function TestForm({
  defaultValues = {},
  onSubmit = () => {},
}: {
  defaultValues?: Partial<FormValues>;
  onSubmit?: (data: FormValues) => void;
}) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledSelectInput control={control} name="color" label="Color" options={mockOptions} />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('ControlledSelectInput', () => {
  it('renders and integrates with react-hook-form', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: 'green' }} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Green');
  });

  it('updates form state when user selects an option', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm onSubmit={onSubmit} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    const option = screen.getByRole('option', { name: 'Blue' });
    await user.click(option);

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'blue',
        }),
        expect.anything()
      );
    });
  });

  it('renders without initial selection', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{}} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('is accessible via keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    );

    await user.tab();
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('can select option using keyboard', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm onSubmit={onSubmit} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    // Select the first option (Red)
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      // Check that a value was submitted
      const [[submittedData]] = onSubmit.mock.calls;
      expect(submittedData.color).toBeDefined();
    });
  });

  it('changes selection when user picks different option', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: 'red' }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('Red');

    await user.click(select);
    const blueOption = screen.getByRole('option', { name: 'Blue' });
    await user.click(blueOption);

    expect(select).toHaveTextContent('Blue');

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'blue',
        }),
        expect.anything()
      );
    });
  });

  it('supports disabled state', () => {
    function DisabledForm() {
      const { control } = useForm<FormValues>({ defaultValues: { color: '' } });

      return (
        <ControlledSelectInput
          control={control}
          name="color"
          label="Color"
          options={mockOptions}
          disabled
        />
      );
    }

    render(
      <TestWrapper>
        <DisabledForm />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('Mui-disabled');
  });

  it('handles options with numeric values', async () => {
    const user = userEvent.setup();

    interface NumericFormValues {
      count?: number;
    }

    function NumericForm() {
      const { control, handleSubmit } = useForm<NumericFormValues>({
        defaultValues: { count: 1 },
      });

      const onSubmit = vi.fn();

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledSelectInput
            control={control}
            name="count"
            label="Count"
            options={[
              { label: 'One', value: 1 },
              { label: 'Two', value: 2 },
              { label: 'Three', value: 3 },
            ]}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(
      <TestWrapper>
        <NumericForm />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('One');

    await user.click(select);
    const threeOption = screen.getByRole('option', { name: 'Three' });
    await user.click(threeOption);

    expect(select).toHaveTextContent('Three');
  });

  it('works with many options', async () => {
    const user = userEvent.setup();

    interface ManyOptionsFormValues {
      item?: string;
    }

    function ManyOptionsForm() {
      const { control } = useForm<ManyOptionsFormValues>({
        defaultValues: { item: '' },
      });

      const manyOptions = Array.from({ length: 50 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: `item-${i + 1}`,
      }));

      return (
        <ControlledSelectInput control={control} name="item" label="Item" options={manyOptions} />
      );
    }

    render(
      <TestWrapper>
        <ManyOptionsForm />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Item 1' })).toBeInTheDocument();
  });

  it('handles empty string as default value', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: '' }} />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('opens and closes menu properly', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    );

    const select = screen.getByRole('combobox');

    // Open menu
    await user.click(select);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Close menu by pressing Escape
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('updates correctly in controlled form scenario', async () => {
    const user = userEvent.setup();

    function ControlledForm() {
      const { control, watch } = useForm<FormValues>({
        defaultValues: { color: 'red' },
      });

      const currentColor = watch('color');

      return (
        <div>
          <ControlledSelectInput
            control={control}
            name="color"
            label="Color"
            options={mockOptions}
          />
          <div data-testid="current-value">{currentColor}</div>
        </div>
      );
    }

    render(
      <TestWrapper>
        <ControlledForm />
      </TestWrapper>
    );

    expect(screen.getByTestId('current-value')).toHaveTextContent('red');

    const select = screen.getByRole('combobox');
    await user.click(select);

    const greenOption = screen.getByRole('option', { name: 'Green' });
    await user.click(greenOption);

    await waitFor(() => {
      expect(screen.getByTestId('current-value')).toHaveTextContent('green');
    });
  });
});
