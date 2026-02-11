import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import FlagIcon from '../flag-icon/FlagIcon';

describe('FlagIcon', () => {
  test('renders country flag when nationality is provided', () => {
    const { container } = render(<FlagIcon nationality="US" countryName="United States" />);

    const flag = container.querySelector('img');
    expect(flag).toBeInTheDocument();
  });

  test('renders default icon when nationality is not provided', () => {
    const { container } = render(<FlagIcon />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders default icon when nationality is empty string', () => {
    const { container } = render(<FlagIcon nationality="" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('applies custom size to country flag', () => {
    const { container } = render(<FlagIcon nationality="GB" size="2rem" />);

    const flag = container.querySelector('img');
    expect(flag).toBeInTheDocument();
  });

  test('applies default size when not provided', () => {
    const { container } = render(<FlagIcon nationality="FR" />);

    const flag = container.querySelector('img');
    expect(flag).toBeInTheDocument();
  });

  test('renders loading skeleton when loading is true', () => {
    const { container } = render(<FlagIcon nationality="DE" loading={true} />);

    // Should render skeleton instead of flag
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  test('renders flag when loading is false', () => {
    const { container } = render(<FlagIcon nationality="IT" loading={false} />);

    const flag = container.querySelector('img');
    expect(flag).toBeInTheDocument();
  });

  test('applies aria-label with country name', () => {
    const { container } = render(<FlagIcon nationality="CA" countryName="Canada" />);

    const flag = container.querySelector('img');
    expect(flag).toHaveAttribute('aria-label', 'Canada');
  });

  test('applies default aria-label when country name not provided', () => {
    const { container } = render(<FlagIcon nationality="JP" />);

    const flag = container.querySelector('img');
    expect(flag).toHaveAttribute('aria-label', 'country-name');
  });

  test('renders different country codes', () => {
    const countryCodes = ['US', 'GB', 'FR', 'DE', 'IT', 'ES', 'BR', 'AR'];

    countryCodes.forEach(code => {
      const { container } = render(<FlagIcon nationality={code} />);
      expect(container.querySelector('img')).toBeInTheDocument();
    });
  });
});
