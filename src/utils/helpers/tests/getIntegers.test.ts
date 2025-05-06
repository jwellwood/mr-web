import { getIntegers } from '../getIntegers';

const mockArray = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
];

describe('getIntegers tests', () => {
  test('should return an object with integers as values', () => {
    expect(getIntegers(3, 1)).toEqual(mockArray);
  });
  test('should return correct object if passed strings', () => {
    expect(getIntegers('3', '1')).toEqual(mockArray);
  });
});
