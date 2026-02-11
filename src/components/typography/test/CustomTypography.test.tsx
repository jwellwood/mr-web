import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { theme } from '../../../theme';
import CustomTypography from '../custom-typography/CustomTypography';

describe('CustomTypography', () => {
  it('renders children text', () => {
    render(<CustomTypography color="data">Hello World</CustomTypography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies bold font weight when bold prop is true', () => {
    render(
      <CustomTypography color="data" bold>
        Bold Text
      </CustomTypography>
    );

    const el = screen.getByText('Bold Text');
    const style = window.getComputedStyle(el);
    // Accept numeric or named font-weight
    expect(['bold', '700'].includes(style.fontWeight) || Number(style.fontWeight) >= 700).toBe(
      true
    );
  });

  it('maps size token to the expected font-size', () => {
    render(
      <CustomTypography color="data" size="xl">
        Large
      </CustomTypography>
    );

    const el = screen.getByText('Large');
    const style = window.getComputedStyle(el);
    expect(style.fontSize).toBe('32px');
  });

  it('renders as a link when `link` prop is provided', () => {
    render(
      <MemoryRouter>
        <CustomTypography color="data" link="/test/path">
          Click me
        </CustomTypography>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    // react-router Link renders an anchor with href
    expect(link.getAttribute('href')).toBe('/test/path');
  });

  it('uses the theme fontFamily', () => {
    render(
      <CustomTypography color="data" size="sm">
        FontCheck
      </CustomTypography>
    );

    const el = screen.getByText('FontCheck');
    const style = window.getComputedStyle(el);
    // fontFamily may include fallback list, assert contains the theme family
    expect(style.fontFamily.includes(theme.typography.fontFamily as string)).toBe(true);
  });
});
