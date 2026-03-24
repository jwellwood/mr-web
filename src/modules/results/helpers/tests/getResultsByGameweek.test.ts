import { describe, it, expect } from 'vitest';
import { T_FETCH_RESULTS } from '../../graphql';
import { getResultsByGameWeek } from '../getResultsByGameweek';

describe('getResultsByGameWeek', () => {
  it('groups results by gameWeek key', () => {
    const data = [
      { _id: 'a', gameWeek: 1 },
      { _id: 'b', gameWeek: 2 },
      { _id: 'c', gameWeek: 1 },
    ];
    const grouped = getResultsByGameWeek(data as T_FETCH_RESULTS['results']);
    const keys = Object.keys(grouped).sort();
    expect(keys).toEqual(['1', '2']);
    expect(grouped['1'].map(r => r._id)).toEqual(['a', 'c']);
    expect(grouped['2'].map(r => r._id)).toEqual(['b']);
  });
});
