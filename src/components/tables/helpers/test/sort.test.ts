import { describe, it, expect } from 'vitest';
import { getComparator, stableSort } from '../sort';

describe('sort helpers', () => {
  it('sorts numbers descending', () => {
    const arr = [{ val: 1 }, { val: 3 }, { val: 2 }];
    const sorted = stableSort(arr, getComparator('desc', 'val'));
    expect(sorted.map(x => x.val)).toEqual([3, 2, 1]);
  });

  it('orders positions using POSITION_ORDER', () => {
    const arr = [{ position: 'FW' }, { position: 'GK' }, { position: 'MF' }];
    const sorted = stableSort(arr, getComparator('desc', 'position'));
    expect(sorted.map(x => x.position)).toEqual(['GK', 'MF', 'FW']);
  });
});
