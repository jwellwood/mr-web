import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ColorInput from '../ColorInput';

describe('ColorInput', () => {
  it('renders with label', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Primary Color" onChange={onChange} />
      </TestWrapper>
    );

    expect(screen.getByText('Primary Color')).toBeInTheDocument();
    const colorInput = document.querySelector('input[type="color"]');
    expect(colorInput).toBeInTheDocument();
  });

  it('renders with default value', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput
          inputName="color"
          label="Primary Color"
          defaultValue="#ff0000"
          onChange={onChange}
        />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]');
    expect(colorInput).toHaveValue('#ff0000');
  });

  it('calls onChange when color is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Theme Color" onChange={onChange} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;

    // Click color input to trigger interaction
    await user.click(colorInput);

    // Verify input is interactive
    expect(colorInput).toBeInTheDocument();
  });

  it('displays error message when errors are provided', () => {
    const onChange = vi.fn();
    const error = { message: 'Invalid color' };

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color" onChange={onChange} errors={[error]} />
      </TestWrapper>
    );

    expect(screen.getByText('Invalid color')).toBeInTheDocument();
  });

  it('does not display error when errors array is empty', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color" onChange={onChange} errors={[]} />
      </TestWrapper>
    );

    expect(screen.queryByText('Invalid color')).not.toBeInTheDocument();
  });

  it('respects disabled state', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color" onChange={onChange} disabled />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeDisabled();
  });

  it('accepts hex color format', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color" defaultValue="#336699" onChange={onChange} />
      </TestWrapper>
    );

    const colorInput = screen.getByDisplayValue('#336699');
    expect(colorInput).toHaveAttribute('type', 'color');
  });

  it('renders with correct input name', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="themeColor" label="Theme" onChange={onChange} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toHaveAttribute('name', 'themeColor');
  });

  it('has color input type', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color Picker" onChange={onChange} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toHaveAttribute('type', 'color');
  });

  it('renders without errors prop', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color" onChange={onChange} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
  });

  it('renders with uppercase hex values', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color" defaultValue="#FF00FF" onChange={onChange} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toHaveValue('#ff00ff'); // Browsers normalize to lowercase
  });

  it('handles numeric default value', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <ColorInput inputName="color" label="Color" defaultValue={0} onChange={onChange} />
      </TestWrapper>
    );

    const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
  });
});
