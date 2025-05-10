import { getThemeColorByType } from '..';
import {theme} from "../../../theme";

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
    expect(getThemeColorByType('secondary')).toBe(secondary.light);
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
});
