import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import ImageForm from '../ImageForm';

const baseProps = {
  setImageUrl: vi.fn(),
  onSubmit: vi.fn(),
  removeImage: vi.fn(),
  loading: false,
  fallbackIcon: 'user' as const,
} as const;

describe('ImageForm', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TestWrapper>
        <ImageForm {...baseProps} imageUrl="https://example.com/img.jpg" />
      </TestWrapper>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('does not show Cancel button when imageUrl equals currentUrl', () => {
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          imageUrl="https://example.com/img.jpg"
          currentUrl="https://example.com/img.jpg"
        />
      </TestWrapper>
    );
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });

  it('shows Cancel button when imageUrl differs from currentUrl', () => {
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          imageUrl="https://example.com/new.jpg"
          currentUrl="https://example.com/old.jpg"
        />
      </TestWrapper>
    );
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('shows Remove image button when currentUrl exists and is not "default" and imageUrl is not "default"', () => {
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          imageUrl="https://example.com/img.jpg"
          currentUrl="https://example.com/img.jpg"
        />
      </TestWrapper>
    );
    expect(screen.getByText(/remove image/i)).toBeInTheDocument();
  });

  it('does not show Remove image button when imageUrl is "default"', () => {
    render(
      <TestWrapper>
        <ImageForm {...baseProps} imageUrl="default" currentUrl="https://example.com/img.jpg" />
      </TestWrapper>
    );
    expect(screen.queryByText(/remove image/i)).not.toBeInTheDocument();
  });

  it('does not show Remove image button when currentUrl is "default"', () => {
    render(
      <TestWrapper>
        <ImageForm {...baseProps} imageUrl="https://example.com/img.jpg" currentUrl="default" />
      </TestWrapper>
    );
    expect(screen.queryByText(/remove image/i)).not.toBeInTheDocument();
  });

  it('shows Default button when currentUrl exists and imageUrl is not "default"', () => {
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          imageUrl="https://example.com/img.jpg"
          currentUrl="https://example.com/img.jpg"
        />
      </TestWrapper>
    );
    expect(screen.getByRole('button', { name: /default/i })).toBeInTheDocument();
  });

  it('renders skeleton submit button when loading', () => {
    const { container } = render(
      <TestWrapper>
        <ImageForm {...baseProps} imageUrl="https://example.com/img.jpg" loading />
      </TestWrapper>
    );
    expect(container.querySelector('[class*="MuiSkeleton"]')).toBeInTheDocument();
  });

  it('does not show Default button when currentUrl is absent', () => {
    render(
      <TestWrapper>
        <ImageForm {...baseProps} imageUrl="https://example.com/img.jpg" />
      </TestWrapper>
    );
    expect(screen.queryByRole('button', { name: /^default$/i })).not.toBeInTheDocument();
  });

  it('submit button is disabled when currentUrl equals imageUrl', () => {
    const { container } = render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          imageUrl="https://example.com/img.jpg"
          currentUrl="https://example.com/img.jpg"
        />
      </TestWrapper>
    );
    const submitBtn = container.querySelector('button[type="submit"]');
    expect(submitBtn).toBeDisabled();
  });

  it('renders an error message when error prop is provided', () => {
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          imageUrl="https://example.com/img.jpg"
          error={{ message: 'Upload failed' }}
        />
      </TestWrapper>
    );
    expect(screen.getByText('Upload failed')).toBeInTheDocument();
  });

  it('clicking Cancel calls setImageUrl with currentUrl', async () => {
    const setImageUrl = vi.fn();
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          setImageUrl={setImageUrl}
          imageUrl="https://example.com/new.jpg"
          currentUrl="https://example.com/old.jpg"
        />
      </TestWrapper>
    );
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(setImageUrl).toHaveBeenCalledWith('https://example.com/old.jpg');
  });

  it('clicking Cancel without currentUrl does not call setImageUrl', async () => {
    const setImageUrl = vi.fn();
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          setImageUrl={setImageUrl}
          imageUrl="https://example.com/img.jpg"
        />
      </TestWrapper>
    );
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(setImageUrl).not.toHaveBeenCalled();
  });

  it('clicking Default calls setImageUrl with "default"', async () => {
    const setImageUrl = vi.fn();
    render(
      <TestWrapper>
        <ImageForm
          {...baseProps}
          setImageUrl={setImageUrl}
          imageUrl="https://example.com/img.jpg"
          currentUrl="https://example.com/img.jpg"
        />
      </TestWrapper>
    );
    await userEvent.click(screen.getByRole('button', { name: /^default$/i }));
    expect(setImageUrl).toHaveBeenCalledWith('default');
  });
});
