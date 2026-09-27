import { describe, expect, it } from 'vitest';
import { SubmitResultSchema } from '../schema';

describe('SubmitResultSchema', () => {
  it('coerces score strings and accepts scores from zero through 99', () => {
    const result = SubmitResultSchema.safeParse({
      homeGoals: '99',
      awayGoals: '0',
      isForfeit: true,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.homeGoals).toBe(99);
      expect(result.data.awayGoals).toBe(0);
    }
  });

  it.each([-1, 100, 'not-a-score'])('rejects invalid score %s', score => {
    const result = SubmitResultSchema.safeParse({
      homeGoals: score,
      awayGoals: 0,
      isForfeit: false,
    });

    expect(result.success).toBe(false);
  });
});
