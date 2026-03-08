import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ControlledFileInput from '../ControlledFileInput';

beforeAll(() => {
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: vi.fn(() => 'blob:mock-url'),
  });
});

type TestForm = { photo: File | null };

function Fixture({ onFileChange }: { onFileChange?: (url: string) => void }) {
  const { control } = useForm<TestForm>({ defaultValues: { photo: null } });
  return (
    <TestWrapper>
      <ControlledFileInput control={control} name="photo" onFileChange={onFileChange} />
    </TestWrapper>
  );
}

function FixtureWithError() {
  const { control, setError, setValue } = useForm<TestForm>({
    defaultValues: { photo: null },
  });

  const forceError = () => {
    setValue('photo', null, { shouldTouch: true });
    setError('photo', { message: 'File is required' });
  };

  return (
    <TestWrapper>
      <>
        <button onClick={forceError}>Force error</button>
        <ControlledFileInput control={control} name="photo" />
      </>
    </TestWrapper>
  );
}

describe('ControlledFileInput', () => {
  it('renders a file input', () => {
    const { container } = render(<Fixture />);

    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'photo');
  });

  it('calls onFileChange with a blob URL when a file is selected', async () => {
    const handleFileChange = vi.fn();
    const { container } = render(<Fixture onFileChange={handleFileChange} />);

    const file = new File(['content'], 'photo.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, file);

    expect(handleFileChange).toHaveBeenCalledTimes(1);
    expect(handleFileChange).toHaveBeenCalledWith('blob:mock-url');
  });

  it('does not call onFileChange when no file is selected', async () => {
    const handleFileChange = vi.fn();
    const { container } = render(<Fixture onFileChange={handleFileChange} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.click(input);

    expect(handleFileChange).not.toHaveBeenCalled();
  });

  it('shows an error message when the field is touched and has an error', async () => {
    render(<FixtureWithError />);

    await userEvent.click(screen.getByRole('button', { name: 'Force error' }));

    expect(screen.getByText('File is required')).toBeInTheDocument();
  });
});
