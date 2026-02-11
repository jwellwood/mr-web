import '@testing-library/jest-dom/vitest';
import { describe, test, expect } from 'vitest';
import { theme } from '../../../theme';
import { getIconColor } from '../utils/getIconColor';

describe('getIconColor', () => {
  test('returns label color', () => {
    expect(getIconColor('label')).toBe(theme.palette.label.main);
  });

  test('returns data color', () => {
    expect(getIconColor('data')).toBe(theme.palette.data.main);
  });

  test('returns primary color', () => {
    expect(getIconColor('primary')).toBe(theme.palette.primary.main);
  });

  test('returns primary-light color', () => {
    expect(getIconColor('primary-light')).toBe(theme.palette.primary.light);
  });

  test('returns primary-dark color', () => {
    expect(getIconColor('primary-dark')).toBe(theme.palette.primary.dark);
  });

  test('returns secondary color', () => {
    expect(getIconColor('secondary')).toBe(theme.palette.secondary.main);
  });

  test('returns secondary-light color', () => {
    expect(getIconColor('secondary-light')).toBe(theme.palette.secondary.light);
  });

  test('returns secondary-dark color', () => {
    expect(getIconColor('secondary-dark')).toBe(theme.palette.secondary.dark);
  });

  test('returns success color', () => {
    expect(getIconColor('success')).toBe(theme.palette.success.main);
  });

  test('returns error color', () => {
    expect(getIconColor('error')).toBe(theme.palette.error.main);
  });

  test('returns warning color', () => {
    expect(getIconColor('warning')).toBe(theme.palette.warning.main);
  });

  test('returns white color', () => {
    expect(getIconColor('white')).toBe(theme.palette.common.white);
  });

  test('returns gold color', () => {
    expect(getIconColor('gold')).toBe(theme.palette.gold.main);
  });

  test('returns silver color', () => {
    expect(getIconColor('silver')).toBe(theme.palette.silver.main);
  });

  test('returns bronze color', () => {
    expect(getIconColor('bronze')).toBe(theme.palette.bronze.main);
  });

  test('returns empty string for undefined color', () => {
    expect(getIconColor()).toBe('');
  });

  test('returns empty string for invalid color', () => {
    expect(getIconColor('invalid-color')).toBe('');
  });

  test('returns empty string for random string', () => {
    expect(getIconColor('random')).toBe('');
  });

  test('handles all theme palette colors', () => {
    const colors = [
      'label',
      'data',
      'primary',
      'primary-light',
      'primary-dark',
      'secondary',
      'secondary-light',
      'secondary-dark',
      'success',
      'error',
      'warning',
      'white',
      'gold',
      'silver',
      'bronze',
    ];

    colors.forEach(color => {
      const result = getIconColor(color);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });
});
