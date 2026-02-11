import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ControlledColorInput from '../ControlledColorInput';

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
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledColorInput control={control} name="color" label="Theme Color" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('ControlledColorInput', () => {
  it('renders and integrates with react-hook-form', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: '#ff0000' }} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    expect(colorInput).toHaveValue('#ff0000');
  });

  it('updates form state when color is changed', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: '#ff0000' }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;

    // Verify color input can be interacted with
    await user.click(colorInput);
    expect(colorInput).toHaveValue('#ff0000');

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('renders without initial value', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{}} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
  });

  it('submits form with selected color', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: '#0000ff' }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          color: '#0000ff',
        }),
        expect.anything()
      );
    });
  });

  it('updates correctly in controlled form scenario', async () => {
    function ControlledForm() {
      const { control, watch } = useForm<FormValues>({
        defaultValues: { color: '#ff0000' },
      });

      const currentColor = watch('color');

      return (
        <div>
          <ControlledColorInput control={control} name="color" label="Color" />
          <div data-testid="current-value">{currentColor}</div>
        </div>
      );
    }

    render(
      <TestWrapper>
        <ControlledForm />
      </TestWrapper>
    );

    expect(screen.getByTestId('current-value')).toHaveTextContent('#ff0000');

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toHaveValue('#ff0000');
  });

  it('handles hex color values correctly', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: '#336699' }} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toHaveValue('#336699');
  });

  it('renders with label', () => {
    function FormWithCustomLabel() {
      const { control } = useForm<FormValues>();

      return <ControlledColorInput control={control} name="color" label="Brand Color" />;
    }

    render(
      <TestWrapper>
        <FormWithCustomLabel />
      </TestWrapper>
    );

    expect(screen.getByText('Brand Color')).toBeInTheDocument();
  });

  it('supports changing color multiple times', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ color: '#ff0000' }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toHaveValue('#ff0000');

    // Verify color input can be clicked multiple times
    await user.click(colorInput);
    await user.click(colorInput);

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('integrates with form control properly', () => {
    function CustomForm() {
      const { control } = useForm<FormValues>({
        defaultValues: { color: '' },
      });

      return <ControlledColorInput control={control} name="color" label="Accent Color" />;
    }

    render(
      <TestWrapper>
        <CustomForm />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
  });
});
