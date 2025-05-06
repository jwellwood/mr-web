import { getStringColorByNumber } from '..';

describe('get string color by number tests', () => {
  test('should return secondary as default case', () => {
    const num = null;
    const randomNum = 99;
    const randomString = '99';
    expect(getStringColorByNumber(num)).toBe('secondary');
    expect(getStringColorByNumber(randomNum)).toBe('secondary');
    expect(getStringColorByNumber(randomString)).toBe('secondary');
  });
  test('should return error as 0 points case', () => {
    const num = 0;
    expect(getStringColorByNumber(num)).toBe('error');
  });
  test('should return success as 3 points case', () => {
    const num = 3;
    expect(getStringColorByNumber(num)).toBe('success');
  });
  test('should return warning as 1 point case', () => {
    const num = 1;
    expect(getStringColorByNumber(num)).toBe('warning');
  });
  test('should work for strings', () => {
    const num = '1';
    expect(getStringColorByNumber(num)).toBe('warning');
  });
});
