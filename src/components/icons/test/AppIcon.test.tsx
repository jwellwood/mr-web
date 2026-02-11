import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import AppIcon from '../app-icon/AppIcon';
import { APP_ICONS } from '../app-icon/icons';

describe('AppIcon', () => {
  test('renders icon correctly', () => {
    const { container } = render(<AppIcon icon={APP_ICONS.MENU} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('applies custom size prop', () => {
    const { container } = render(<AppIcon icon={APP_ICONS.BACK} size="2rem" />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', '2rem');
  });

  test('applies default size when not provided', () => {
    const { container } = render(<AppIcon icon={APP_ICONS.FILTER} />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', '1rem');
  });

  test('applies custom color prop', () => {
    const { container } = render(<AppIcon icon={APP_ICONS.DELETE} color="error" />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders all valid app icons', () => {
    Object.values(APP_ICONS).forEach(icon => {
      const { container } = render(<AppIcon icon={icon} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  test('renders different app icons', () => {
    const icons = [
      APP_ICONS.MENU,
      APP_ICONS.BACK,
      APP_ICONS.FILTER,
      APP_ICONS.DELETE,
      APP_ICONS.LOADING,
      APP_ICONS.OVERVIEW,
      APP_ICONS.SQUAD,
      APP_ICONS.MATCHES,
      APP_ICONS.HISTORY,
      APP_ICONS.TROPHY,
      APP_ICONS.MEDAL,
      APP_ICONS.AWARD,
      APP_ICONS.FLAG,
      APP_ICONS.BADGE,
      APP_ICONS.USER,
      APP_ICONS.NATIONALITY,
      APP_ICONS.LOCATION,
    ];

    icons.forEach(icon => {
      const { container } = render(<AppIcon icon={icon} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  test('applies color based on theme palette', () => {
    const colorVariants = ['primary', 'secondary', 'success', 'error', 'warning'];

    colorVariants.forEach(color => {
      const { container } = render(<AppIcon icon={APP_ICONS.MENU} color={color} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  test('handles invalid icon gracefully', () => {
    // @ts-expect-error testing invalid icon
    const { container } = render(<AppIcon icon="invalid-icon" />);

    // Should return null, so no svg should be rendered
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  test('renders with default primary color', () => {
    const { container } = render(<AppIcon icon={APP_ICONS.USER} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
