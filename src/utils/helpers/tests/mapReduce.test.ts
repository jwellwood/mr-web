import { mapReduce } from '../mapReduce';
import { MOCK_DATA as mockData } from './MOCK_DATA';
// export const mapReduce: Function = (arr: Array<{}>, stat: string): number =>
//   arr.map((elem) => +elem[stat]).reduce(getSum, 0);
describe('map reduce tests', () => {
  test('should return 0 if array is empty', () => {
    const array: never[] = [];
    expect(mapReduce(array, 'any')).toBe(0);
    expect(mapReduce(array)).toBe(0);
  });
  test('should sum all the numbers of given stat from array', () => {
    const array = mockData.filter((a) => a.number);
    expect(mapReduce(array, 'number')).toBe(3);
  });
  test('should work for strings too', () => {
    const array = mockData.filter((a) => +a.stringId < 4);
    expect(mapReduce(array, 'stringId')).toBe(5);
  });
  test('should return NaN when stat does not exits', () => {
    expect(mapReduce(mockData, 'fake')).toBe(NaN);
  });
});
