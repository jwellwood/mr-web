import { mapper } from '../mapper';
import { MOCK_DATA as mockData } from './MOCK_DATA';
// export const mapper: Function = (arr: Array<{}>, stat: string) =>
//   arr.map((elem) => elem[stat]);

const length = mockData.length;
describe('mapper tests', () => {
  test('it returns an empty array when arr is empty', () => {
    const array: {
      id: number;
      stringId: string;
      name: string;
      number: number;
    }[] = [];
    expect(mapper(array, 'id')).toEqual([]);
  });
  test('it returns an array with all the items', () => {
    expect(mapper(mockData, 'id')).toHaveLength(length);
    expect(mapper(mockData, 'number')).toHaveLength(length);
    expect(mapper(mockData, 'stringId')).toHaveLength(length);
    expect(mapper(mockData, 'other')).toHaveLength(length);
    // @ts-expect-error test
    expect(mapper(mockData, 'fake')).toHaveLength(length);
  });
  test('it returns an array containing the items', () => {
    expect(mapper(mockData, 'stringId')).toContain('1');
    expect(mapper(mockData, 'number')).toContain(2);
    expect(mapper(mockData, 'id')).toContain(-1);
  });
});
