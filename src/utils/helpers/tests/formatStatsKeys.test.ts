import { formatStatsKeys } from '../formatStatsKeys';

describe('formatStatsKeys test', () => {
  const validKeys = [
    ['goals', 'Goals'],
    ['assists', 'Assists'],
    ['mvp', 'MVP'],
    ['conceded', 'Conceded'],
    ['ownGoals', 'Own Goals'],
    ['pensScored', 'Pens Scored'],
    ['pensMissed', 'Pens Missed'],
    ['pensSaved', 'Pens Saved'],
    ['redCard', 'Red Card'],
    ['yellowCards', 'Yellow Cards'],
    ['cleanSheet', 'Clean Sheet'],
  ];

  test('should convert the stat keys into the correctly formatted string', () => {
    validKeys.forEach(([key, convertedValue]) => {
      expect(formatStatsKeys(key)).toBe(convertedValue);
    });
  });
  test('should do nothing if passed invalid string', () => {
    expect(formatStatsKeys('xx')).toBeUndefined();
  });
});
