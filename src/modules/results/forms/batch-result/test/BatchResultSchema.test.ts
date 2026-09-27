import { describe, expect, it } from 'vitest';
import { BatchResultSchema } from '../schema';

const validBatch = {
  date: new Date('2026-01-01T12:00:00.000Z'),
  gameWeek: '2',
  competitionId: 'competition-1',
  orgSeasonId: 'season-1',
  matches: [{ homeTeam: 'home-1', awayTeam: 'away-1', isBye: false }],
};

describe('BatchResultSchema', () => {
  it('coerces the gameweek to a number and accepts a valid match', () => {
    const result = BatchResultSchema.safeParse(validBatch);

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.gameWeek).toBe(2);
  });

  it('allows a bye without an away team', () => {
    const result = BatchResultSchema.safeParse({
      ...validBatch,
      matches: [{ homeTeam: 'home-1', awayTeam: '', isBye: true }],
    });

    expect(result.success).toBe(true);
  });

  it('rejects a regular match without an away team', () => {
    const result = BatchResultSchema.safeParse({
      ...validBatch,
      matches: [{ homeTeam: 'home-1', awayTeam: '', isBye: false }],
    });

    expect(result.success).toBe(false);
  });

  it('rejects a team used in more than one match', () => {
    const result = BatchResultSchema.safeParse({
      ...validBatch,
      matches: [
        { homeTeam: 'home-1', awayTeam: 'away-1' },
        { homeTeam: 'home-2', awayTeam: 'away-1' },
      ],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(issue => issue.message === 'Team already used in another match')
      ).toBe(true);
    }
  });

  it('rejects a match against the same team', () => {
    const result = BatchResultSchema.safeParse({
      ...validBatch,
      matches: [{ homeTeam: 'team-1', awayTeam: 'team-1' }],
    });

    expect(result.success).toBe(false);
  });
});
