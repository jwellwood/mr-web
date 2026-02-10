import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import LinkButton from '../link-button/LinkButton';

describe('LinkButton', () => {
  it('renders with children text', () => {
    render(
      <BrowserRouter>
        <LinkButton link="/test">Go to Page</LinkButton>
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /go to page/i })).toBeInTheDocument();
  });

  it('renders with correct link', () => {
    render(
      <BrowserRouter>
        <LinkButton link="/test-path">Test Link</LinkButton>
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-path');
  });

  it('renders with outlined variant by default', () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton link="/test">Test</LinkButton>
      </BrowserRouter>
    );

    const button = container.querySelector('.MuiButton-outlined');
    expect(button).toBeInTheDocument();
  });

  it('renders with contained variant when specified', () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton link="/test" type="contained">
          Test
        </LinkButton>
      </BrowserRouter>
    );

    const button = container.querySelector('.MuiButton-contained');
    expect(button).toBeInTheDocument();
  });

  it('renders with text variant when specified', () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton link="/test" type="text">
          Test
        </LinkButton>
      </BrowserRouter>
    );

    const button = container.querySelector('.MuiButton-text');
    expect(button).toBeInTheDocument();
  });

  it('renders with primary color by default', () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton link="/test">Test</LinkButton>
      </BrowserRouter>
    );

    const button = container.querySelector('.MuiButton-colorPrimary');
    expect(button).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton link="/test" color="secondary">
          Test
        </LinkButton>
      </BrowserRouter>
    );

    const button = container.querySelector('.MuiButton-colorSecondary');
    expect(button).toBeInTheDocument();
  });
});
