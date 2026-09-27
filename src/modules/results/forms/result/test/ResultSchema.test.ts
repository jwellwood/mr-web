import { describe, expect, it } from 'vitest';
import { ResultSchema } from '../schema';

const validResult = {
  date: new Date('2026-01-01T12:00:00.000Z'),
  gameWeek: '1',
  competitionId: 'competition-1',
  orgSeasonId: 'season-1',
  homeTeam: 'home-1',
  awayTeam: 'away-1',
  isForfeit: false,
};

describe('ResultSchema', () => {
  it('requires an away team for a regular match', () => {
    const result = ResultSchema.safeParse({ ...validResult, awayTeam: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path.join('.') === 'awayTeam')).toBe(true);
    }
  });

  it('allows a bye without an away team', () => {
    const result = ResultSchema.safeParse({ ...validResult, awayTeam: '', isBye: true });

    expect(result.success).toBe(true);
  });
});
