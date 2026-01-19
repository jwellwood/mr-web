import { shortenString } from '../shortenString';

describe('shorten string tests', () => {
  test('should return an empty string if fed empty string', () => {
    const string = '';
    expect(shortenString(string, 4)).toBe(string);
  });
  test('should return the same string if length is shorter than the limit', () => {
    const string = '123';
    expect(shortenString(string, 4)).toBe(string);
  });
  test('should cut the original string and add ... if over the limit', () => {
    const string = '123456';
    expect(shortenString(string, 4)).toBe('1234...');
  });
});
