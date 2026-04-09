import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import EditProfileImagePage from '../../pages/EditProfileImagePage';

describe('EditProfileImagePage', () => {
  const defaultProps = {
    imageUrl: null,
    setImageUrl: vi.fn(),
    onSubmit: vi.fn(),
    currentUrl: undefined,
    removeImage: vi.fn(),
    loading: false,
  };

  it('renders the Edit Profile Image page title', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfileImagePage {...defaultProps} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Edit Profile Image')).toBeInTheDocument();
  });

  it('renders a spinner when loading', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfileImagePage {...defaultProps} loading={true} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders the image upload form', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <EditProfileImagePage {...defaultProps} />
        </TestWrapper>
      </MemoryRouter>
    );
    // The ImageForm renders a file input
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
