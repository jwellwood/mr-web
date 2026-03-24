import { describe, it, expect } from 'vitest';
import { T_FETCH_RESULTS } from '../../graphql';
import { getResultStatusInGameweek } from '../getResultStatusInGameweek';

describe('getResultStatusInGameweek', () => {
  it('counts confirmed, disputed, submitted and pending correctly', () => {
    const results = [
      { resultStatus: null },
      { resultStatus: 'CONFIRMED' },
      { resultStatus: 'DISPUTED' },
      { resultStatus: 'SUBMITTED' },
      { resultStatus: 'PENDING' },
      { resultStatus: 'CONFIRMED' },
    ];

    const counts = getResultStatusInGameweek(results as T_FETCH_RESULTS['results']);
    expect(counts.pending).toBe(2); // one null + one explicit 'PENDING'
    expect(counts.confirmed).toBe(2);
    expect(counts.disputed).toBe(1);
    expect(counts.submitted).toBe(1);
  });
});
