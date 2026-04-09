import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import AuthorizationLinks from '../AuthorizationLinks';

const links = [
  { label: "Don't have an account yet?", value: 'Sign up here', link: '/sign_in' },
  { label: 'Forgotten your password?', value: 'Reset here', link: '/forgot_password' },
];

describe('AuthorizationLinks', () => {
  it('renders a label and button for each link', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <AuthorizationLinks links={links} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
    expect(screen.getByText('Sign up here')).toBeInTheDocument();
    expect(screen.getByText('Forgotten your password?')).toBeInTheDocument();
    expect(screen.getByText('Reset here')).toBeInTheDocument();
  });

  it('renders a button with the correct link for each item', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <AuthorizationLinks links={links} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByRole('link', { name: 'Sign up here' })).toHaveAttribute('href', '/sign_in');
    expect(screen.getByRole('link', { name: 'Reset here' })).toHaveAttribute(
      'href',
      '/forgot_password'
    );
  });

  it('renders nothing when links is empty', () => {
    const { container } = render(
      <TestWrapper>
        <MemoryRouter>
          <AuthorizationLinks links={[]} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(container.firstChild?.childNodes).toHaveLength(0);
  });
});
