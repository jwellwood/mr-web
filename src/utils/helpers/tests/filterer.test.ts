import { filterer } from '../filterer';
import { MOCK_DATA as mockData } from './MOCK_DATA';

describe('filterer tests', () => {
  test('should return length 0 when passed empty array', () => {
    expect(filterer([], 'any')).toBe(0);
  });
  test('should return length 2 when filter by number', () => {
    expect(filterer(mockData, 'number')).toBe(2);
  });
  test('should return length 3 when filter by name', () => {
    expect(filterer(mockData, 'name')).toBe(3);
  });
  test('should return length 1 when filter by other', () => {
    expect(filterer(mockData, 'other')).toBe(1);
  });
  test('should return length 0 when filter by an elem that does not exist or is omitted', () => {
    expect(filterer(mockData, 'fake')).toBe(0);
    expect(filterer(mockData, 1)).toBe(0);
    expect(filterer(mockData)).toBe(0);
  });
});
