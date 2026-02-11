import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import CustomSwitch from '../CustomSwitch';

describe('CustomSwitch', () => {
  it('renders with label', () => {
    render(
      <TestWrapper>
        <CustomSwitch label="Enable notifications" errors={[]} />
      </TestWrapper>
    );

    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders checked by default when defaultChecked is true', () => {
    render(
      <TestWrapper>
        <CustomSwitch label="Dark mode" defaultChecked errors={[]} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('renders unchecked by default when defaultChecked is false', () => {
    render(
      <TestWrapper>
        <CustomSwitch label="Dark mode" defaultChecked={false} errors={[]} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('calls onCheck when toggled', async () => {
    const user = userEvent.setup();
    const onCheck = vi.fn();

    render(
      <TestWrapper>
        <CustomSwitch label="Enable feature" onCheck={onCheck} errors={[]} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);

    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onCheck).toHaveBeenCalledWith(expect.any(Object), true);
  });

  it('is accessible via keyboard', async () => {
    const user = userEvent.setup();
    const onCheck = vi.fn();

    render(
      <TestWrapper>
        <CustomSwitch label="Enable feature" onCheck={onCheck} errors={[]} />
      </TestWrapper>
    );

    await user.tab();
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveFocus();

    await user.keyboard(' ');
    expect(onCheck).toHaveBeenCalled();
  });

  it('can be toggled on and off', async () => {
    const user = userEvent.setup();
    const onCheck = vi.fn();

    render(
      <TestWrapper>
        <CustomSwitch label="Toggle" checked={false} onCheck={onCheck} errors={[]} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);
    expect(onCheck).toHaveBeenCalledWith(expect.any(Object), true);
  });

  it('displays error message when errors are provided', () => {
    const error = { message: 'This field is required' };

    render(
      <TestWrapper>
        <CustomSwitch label="Accept terms" errors={[error]} />
      </TestWrapper>
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not display error when errors array is empty', () => {
    render(
      <TestWrapper>
        <CustomSwitch label="Accept terms" errors={[]} />
      </TestWrapper>
    );

    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('respects disabled state', () => {
    const onCheck = vi.fn();

    render(
      <TestWrapper>
        <CustomSwitch label="Disabled switch" disabled onCheck={onCheck} errors={[]} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('has proper ARIA attributes', () => {
    render(
      <TestWrapper>
        <CustomSwitch name="notifications" label="Notifications" errors={[]} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('name', 'notifications');
  });

  it('supports different color variants', () => {
    const { rerender } = render(
      <TestWrapper>
        <CustomSwitch label="Primary" color="primary" errors={[]} />
      </TestWrapper>
    );

    let switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('MuiSwitch-input');

    rerender(
      <TestWrapper>
        <CustomSwitch label="Secondary" color="secondary" errors={[]} />
      </TestWrapper>
    );

    switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('MuiSwitch-input');
  });

  it('renders JSX element as label', () => {
    const jsxLabel = (
      <span data-testid="custom-label">
        Custom <strong>Label</strong>
      </span>
    );

    render(
      <TestWrapper>
        <CustomSwitch label={jsxLabel} errors={[]} />
      </TestWrapper>
    );

    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('handles controlled state', () => {
    const { rerender } = render(
      <TestWrapper>
        <CustomSwitch label="Controlled" checked={false} errors={[]} />
      </TestWrapper>
    );

    let switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    rerender(
      <TestWrapper>
        <CustomSwitch label="Controlled" checked={true} errors={[]} />
      </TestWrapper>
    );

    switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('works without name prop', () => {
    render(
      <TestWrapper>
        <CustomSwitch label="No name" errors={[]} />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });
});
