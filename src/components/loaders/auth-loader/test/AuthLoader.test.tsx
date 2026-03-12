import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import AuthLoader from '../AuthLoader';

describe('AuthLoader', () => {
  it('renders the checking authentication text', () => {
    render(
      <TestWrapper>
        <AuthLoader />
      </TestWrapper>
    );
    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
  });

  it('renders a spinner element', () => {
    const { container } = render(
      <TestWrapper>
        <AuthLoader />
      </TestWrapper>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
