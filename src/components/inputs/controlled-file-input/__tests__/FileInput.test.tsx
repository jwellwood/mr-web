import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import FileInput from '../FileInput';

describe('FileInput', () => {
  it('renders a file input', () => {
    const { container } = render(
      <TestWrapper>
        <FileInput inputName="photo" onChange={vi.fn()} />
      </TestWrapper>
    );

    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'photo');
  });

  it('calls onChange when a file is selected', async () => {
    const handleChange = vi.fn();
    const { container } = render(
      <TestWrapper>
        <FileInput inputName="photo" onChange={handleChange} />
      </TestWrapper>
    );

    const file = new File(['content'], 'photo.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, file);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows an error message when errors are provided', () => {
    render(
      <TestWrapper>
        <FileInput
          inputName="photo"
          onChange={vi.fn()}
          errors={[{ message: 'File is required' }]}
        />
      </TestWrapper>
    );

    expect(screen.getByText('File is required')).toBeInTheDocument();
  });

  it('does not show an error message when errors are empty', () => {
    render(
      <TestWrapper>
        <FileInput inputName="photo" onChange={vi.fn()} errors={[]} />
      </TestWrapper>
    );

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });
});
