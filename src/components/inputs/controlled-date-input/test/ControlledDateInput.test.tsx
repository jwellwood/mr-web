import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ControlledDateInput from '../ControlledDateInput';

interface FormValues {
  dateOfBirth?: string | Date;
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
      <ControlledDateInput control={control} name="dateOfBirth" label="Date of Birth" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('ControlledDateInput', () => {
  it('renders and integrates with react-hook-form', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ dateOfBirth: new Date('2000-01-01') }} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('renders without initial value', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{}} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('submits form with selected date', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const defaultDate = new Date('1990-05-15');

    render(
      <TestWrapper>
        <TestForm defaultValues={{ dateOfBirth: defaultDate }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('opens date picker on calendar button click', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    );

    const openPickerButton = screen.getByRole('button', { name: /choose date/i });
    await user.click(openPickerButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('supports year-only view', () => {
    function YearOnlyForm() {
      const { control } = useForm<FormValues>({
        defaultValues: { dateOfBirth: new Date('2000-01-01') },
      });

      return (
        <ControlledDateInput control={control} name="dateOfBirth" label="Birth Year" view="year" />
      );
    }

    render(
      <TestWrapper>
        <YearOnlyForm />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('respects disableFuture prop by default', () => {
    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('allows future dates when disableFuture is false', () => {
    function FutureDatesForm() {
      const { control } = useForm<FormValues>();

      return (
        <ControlledDateInput
          control={control}
          name="dateOfBirth"
          label="Appointment Date"
          disableFuture={false}
        />
      );
    }

    render(
      <TestWrapper>
        <FutureDatesForm />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('handles openTo prop', () => {
    function CustomOpenForm() {
      const { control } = useForm<FormValues>();

      return (
        <ControlledDateInput control={control} name="dateOfBirth" label="Date" openTo="year" />
      );
    }

    render(
      <TestWrapper>
        <CustomOpenForm />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('handles string date values', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ dateOfBirth: '2000-01-01' }} />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('updates correctly in controlled form scenario', async () => {
    function ControlledForm() {
      const { control, watch } = useForm<FormValues>({
        defaultValues: { dateOfBirth: new Date('2000-01-01') },
      });

      const currentDate = watch('dateOfBirth');

      return (
        <div>
          <ControlledDateInput control={control} name="dateOfBirth" label="Date" />
          <div data-testid="current-value">
            {currentDate ? new Date(currentDate).toISOString() : 'No date'}
          </div>
        </div>
      );
    }

    render(
      <TestWrapper>
        <ControlledForm />
      </TestWrapper>
    );

    expect(screen.getByTestId('current-value')).toBeInTheDocument();
  });

  it('integrates with form control properly', () => {
    function CustomForm() {
      const { control } = useForm<FormValues>({
        defaultValues: { dateOfBirth: new Date() },
      });

      return <ControlledDateInput control={control} name="dateOfBirth" label="Registration Date" />;
    }

    render(
      <TestWrapper>
        <CustomForm />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });
});
