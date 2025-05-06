import { generateOrdinals } from '../generateOrdinals';

describe('ordinals tests', () => {
  test('should return empty string for negatives', () => {
    const number = -1;
    const zero = 0;
    expect(generateOrdinals(number)).toBe('');
    expect(generateOrdinals(zero)).toBe('');
  });

  test('should return st for 1, 21, but th for 11', () => {
    const number = 1;
    const eleven = 11;
    const twenty_one = 21;
    expect(generateOrdinals(number)).toBe('st');
    expect(generateOrdinals(twenty_one)).toBe('st');
    expect(generateOrdinals(eleven)).toBe('th');
  });
  test('should return nd for 2, 22, but th for 12', () => {
    const number = 2;
    const twelve = 12;
    const twenty_two = 22;
    expect(generateOrdinals(number)).toBe('nd');
    expect(generateOrdinals(twenty_two)).toBe('nd');
    expect(generateOrdinals(twelve)).toBe('th');
  });
  test('should return rd for 3, 23, but th for 13', () => {
    const number = 3;
    const thirteen = 13;
    const twenty_three = 23;
    expect(generateOrdinals(number)).toBe('rd');
    expect(generateOrdinals(twenty_three)).toBe('rd');
    expect(generateOrdinals(thirteen)).toBe('th');
  });
  test('should work for strings', () => {
    const one = '1';
    const two = '2';
    const three = '3';
    expect(generateOrdinals(one)).toBe('st');
    expect(generateOrdinals(two)).toBe('nd');
    expect(generateOrdinals(three)).toBe('rd');
  });
});
