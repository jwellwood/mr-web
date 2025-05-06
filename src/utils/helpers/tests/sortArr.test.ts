import { sortArr } from '../sortArr';
import { MOCK_DATA as mockData } from './MOCK_DATA';

describe('sort array tests', () => {
  test('should return an empty arr if array is empty', () => {
    const array: any = [];
    expect(sortArr(array, 'any')).toStrictEqual([]);
  });
  test('should return an array sorted by id', () => {
    expect(sortArr(mockData, 'id')[0]).toStrictEqual({
      id: 10,
      stringId: '10',
      other: true,
    });
    expect(sortArr(mockData, 'id')[10]).toStrictEqual({
      id: -1,
      stringId: '-1',
    });
  });
  test('should work for strings', () => {
    expect(sortArr(mockData, 'stringId')[0]).toStrictEqual({
      id: 10,
      stringId: '10',
      other: true,
    });
    expect(sortArr(mockData, 'stringId')[10]).toStrictEqual({
      id: -1,
      stringId: '-1',
    });
  });
});
