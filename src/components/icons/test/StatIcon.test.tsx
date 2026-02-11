import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { STAT_ICONS } from '../stat-icon/icons';
import StatIcon from '../stat-icon/StatIcon';

describe('StatIcon', () => {
  test('renders stat icon correctly', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.GOAL} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('returns null when icon is not provided', () => {
    const { container } = render(<StatIcon />);

    expect(container.firstChild).toBeNull();
  });

  test('applies custom size prop', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.ASSIST} size="2rem" />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', '2rem');
  });

  test('applies empty size when not provided', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.APP} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders all valid stat icons', () => {
    const validIcons = [
      STAT_ICONS.APP,
      STAT_ICONS.STARTER,
      STAT_ICONS.GOAL,
      STAT_ICONS.ASSIST,
      STAT_ICONS.OWN_GOAL,
      STAT_ICONS.CONCEDED,
      STAT_ICONS.PEN_SCORED,
      STAT_ICONS.PEN_MISSED,
      STAT_ICONS.PEN_SAVED,
      STAT_ICONS.SUB_IN,
      STAT_ICONS.SUB_OUT,
      STAT_ICONS.RED_CARD,
      STAT_ICONS.YELLOW_CARD,
      STAT_ICONS.CLEAN_SHEET,
      STAT_ICONS.MVP,
    ];

    validIcons.forEach(icon => {
      const { container } = render(<StatIcon icon={icon} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  test('renders appearance icon', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.APP} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('renders starter icon', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.STARTER} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('renders goal icon', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.GOAL} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('renders assist icon', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.ASSIST} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('renders card icons', () => {
    const { container: yellowContainer } = render(<StatIcon icon={STAT_ICONS.YELLOW_CARD} />);
    expect(yellowContainer.querySelector('svg')).toBeInTheDocument();

    const { container: redContainer } = render(<StatIcon icon={STAT_ICONS.RED_CARD} />);
    expect(redContainer.querySelector('svg')).toBeInTheDocument();
  });

  test('renders penalty icons', () => {
    const penaltyIcons = [STAT_ICONS.PEN_SCORED, STAT_ICONS.PEN_MISSED, STAT_ICONS.PEN_SAVED];

    penaltyIcons.forEach(icon => {
      const { container } = render(<StatIcon icon={icon} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  test('renders substitution icons', () => {
    const { container: subInContainer } = render(<StatIcon icon={STAT_ICONS.SUB_IN} />);
    expect(subInContainer.querySelector('svg')).toBeInTheDocument();

    const { container: subOutContainer } = render(<StatIcon icon={STAT_ICONS.SUB_OUT} />);
    expect(subOutContainer.querySelector('svg')).toBeInTheDocument();
  });

  test('renders clean sheet icon', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.CLEAN_SHEET} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('renders MVP icon', () => {
    const { container } = render(<StatIcon icon={STAT_ICONS.MVP} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('handles invalid icon gracefully', () => {
    // @ts-expect-error testing invalid icon
    const { container } = render(<StatIcon icon="invalid-stat" />);

    // Should return null when icon is invalid
    expect(container.firstChild).toBeNull();
  });

  test('renders with different sizes', () => {
    const sizes = ['1rem', '1.5rem', '2rem', '24px'];

    sizes.forEach(size => {
      const { container } = render(<StatIcon icon={STAT_ICONS.GOAL} size={size} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', size);
    });
  });
});
