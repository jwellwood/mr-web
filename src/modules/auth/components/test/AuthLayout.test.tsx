import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import AuthLayout from '../AuthLayout';

describe('AuthLayout', () => {
  it('renders the app title', () => {
    render(
      <TestWrapper>
        <AuthLayout>
          <div />
        </AuthLayout>
      </TestWrapper>
    );

    expect(screen.getByText('Footy Stats')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <TestWrapper>
        <AuthLayout>
          <div data-testid="child-content" />
        </AuthLayout>
      </TestWrapper>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders helpText when provided', () => {
    render(
      <TestWrapper>
        <AuthLayout helpText="Please sign in to continue">
          <div />
        </AuthLayout>
      </TestWrapper>
    );

    expect(screen.getByText('Please sign in to continue')).toBeInTheDocument();
  });

  it('does not render helpText section when omitted', () => {
    render(
      <TestWrapper>
        <AuthLayout>
          <div />
        </AuthLayout>
      </TestWrapper>
    );

    expect(screen.queryByText('Please sign in to continue')).not.toBeInTheDocument();
  });
});
