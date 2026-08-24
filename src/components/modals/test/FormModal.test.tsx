import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import FormModal from '../form-modal/FormModal';

describe('FormModal', () => {
  it('renders children when open', () => {
    render(
      <TestWrapper>
        <FormModal open onClose={vi.fn()}>
          <div>Form content</div>
        </FormModal>
      </TestWrapper>
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <TestWrapper>
        <FormModal open onClose={vi.fn()} title="Edit Profile">
          <div>Form</div>
        </FormModal>
      </TestWrapper>
    );
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  it('does not render title element when no title prop', () => {
    render(
      <TestWrapper>
        <FormModal open onClose={vi.fn()}>
          <div>Form</div>
        </FormModal>
      </TestWrapper>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('does not render dialog content when closed', () => {
    render(
      <TestWrapper>
        <FormModal open={false} onClose={vi.fn()}>
          <div>Hidden content</div>
        </FormModal>
      </TestWrapper>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });
});
