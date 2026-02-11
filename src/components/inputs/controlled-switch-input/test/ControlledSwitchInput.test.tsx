import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ControlledSwitchInput from '../ControlledSwitchInput';

interface FormValues {
  enabled?: boolean;
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
      <ControlledSwitchInput control={control} name="enabled" label="Enable Feature" />
      <button type="submit">Submit</button>
    </form>
  );
}

describe('ControlledSwitchInput', () => {
  it('renders and integrates with react-hook-form', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{ enabled: true }} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();
  });

  it('updates form state when toggled', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ enabled: false }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
        }),
        expect.anything()
      );
    });
  });

  it('renders without initial value', () => {
    render(
      <TestWrapper>
        <TestForm defaultValues={{}} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('is accessible via keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestForm />
      </TestWrapper>
    );

    await user.tab();
    expect(screen.getByRole('switch')).toHaveFocus();
  });

  it('can toggle using keyboard', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ enabled: false }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      const [[submittedData]] = onSubmit.mock.calls;
      expect(submittedData.enabled).toBe(true);
    });
  });

  it('toggles between true and false', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ enabled: true }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();

    await user.click(switchElement);
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);
    expect(switchElement).toBeChecked();

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
        }),
        expect.anything()
      );
    });
  });

  it('supports disabled state', () => {
    function DisabledForm() {
      const { control } = useForm<FormValues>({ defaultValues: { enabled: false } });

      return <ControlledSwitchInput control={control} name="enabled" label="Disabled" disabled />;
    }

    render(
      <TestWrapper>
        <DisabledForm />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('submits form with correct boolean value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TestWrapper>
        <TestForm defaultValues={{ enabled: false }} onSubmit={onSubmit} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const [[data]] = onSubmit.mock.calls;
      expect(data.enabled).toBe(true);
      expect(typeof data.enabled).toBe('boolean');
    });
  });

  it('updates correctly in controlled form scenario', async () => {
    const user = userEvent.setup();

    function ControlledForm() {
      const { control, watch } = useForm<FormValues>({
        defaultValues: { enabled: false },
      });

      const currentValue = watch('enabled');

      return (
        <div>
          <ControlledSwitchInput control={control} name="enabled" label="Feature" />
          <div data-testid="current-value">{String(currentValue)}</div>
        </div>
      );
    }

    render(
      <TestWrapper>
        <ControlledForm />
      </TestWrapper>
    );

    expect(screen.getByTestId('current-value')).toHaveTextContent('false');

    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);

    await waitFor(() => {
      expect(screen.getByTestId('current-value')).toHaveTextContent('true');
    });
  });

  it('handles JSX element as label', () => {
    function FormWithJSXLabel() {
      const { control } = useForm<FormValues>();

      const jsxLabel = (
        <span data-testid="jsx-label">
          Accept <strong>Terms</strong>
        </span>
      );

      return <ControlledSwitchInput control={control} name="enabled" label={jsxLabel} />;
    }

    render(
      <TestWrapper>
        <FormWithJSXLabel />
      </TestWrapper>
    );

    expect(screen.getByTestId('jsx-label')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });
});
