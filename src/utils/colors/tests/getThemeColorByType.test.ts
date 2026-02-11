import { describe, test, expect } from 'vitest';
import { getThemeColorByType } from '..';
import { theme } from '../../../theme';

describe('get theme color by type tests', () => {
  const { success, warning, error, secondary } = theme.palette;
  test('should return transparent as default', () => {
    const background = '';
    const random = 'random';
    const number = 99;

    expect(getThemeColorByType()).toBe('transparent');
    expect(getThemeColorByType(background)).toBe('transparent');
    expect(getThemeColorByType(random)).toBe('transparent');
    // @ts-expect-error testing bad data
    expect(getThemeColorByType(number)).toBe('transparent');
  });

  test('should return secondary as secondary', () => {
    expect(getThemeColorByType('secondary')).toBe(secondary.main);
  });
  test('should return primary as primary', () => {
    expect(getThemeColorByType('primary')).toBe(theme.palette.primary.main);
  });
  test('should return tertiary as tertiary', () => {
    expect(getThemeColorByType('tertiary')).toBe(theme.palette.tertiary.main);
  });
  test('should return success as success', () => {
    expect(getThemeColorByType('success')).toBe(success.main);
  });
  test('should return warning as warning', () => {
    expect(getThemeColorByType('warning')).toBe(warning.main);
  });
  test('should return error as error', () => {
    expect(getThemeColorByType('error')).toBe(error.main);
  });
  test('should return gold/silver/bronze correctly', () => {
    expect(getThemeColorByType('gold')).toBe(theme.palette.gold.main);
    expect(getThemeColorByType('silver')).toBe(theme.palette.silver.main);
    expect(getThemeColorByType('bronze')).toBe(theme.palette.bronze.main);
  });
});
