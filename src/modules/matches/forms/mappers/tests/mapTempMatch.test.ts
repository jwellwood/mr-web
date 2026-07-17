import { describe, expect, it } from 'vitest';
import { mapFetchedMatchToTempMatch } from '../mapFetchedMatchToTempMatch';
import { mapTempMatchToFormData } from '../mapTempMatchToFormData';
import { mapTempMatchToMutation } from '../mapTempMatchToMutation';

describe('match mapper helpers', () => {
  const tempMatch = {
    _id: 'match-1',
    date: '2024-08-01T10:00:00.000Z',
    isHome: true,
    teamGoals: 2,
    opponentGoals: 1,
    decision: 'PENALTIES',
    winnerSide: 'HOME',
    isForfeit: false,
    seasonId: 'season-1',
    competitionId: 'comp-1',
    competitionName: 'Cup',
    teamId: 'team-1',
    teamName: 'Team One',
    teamBadgeUrl: null,
    opponentId: 'team-2',
    opponentName: 'Team Two',
    opponentBadgeUrl: null,
  };

  it('maps temp match to form data including cup fields', () => {
    const formData = mapTempMatchToFormData(tempMatch);

    expect(formData.decision).toBe('PENALTIES');
    expect(formData.winnerSide).toBe('HOME');
    expect(formData.competitionId).toBe('comp-1');
    expect(formData.date).toBeInstanceOf(Date);
  });

  it('maps temp match to mutation variables including cup fields', () => {
    const variables = mapTempMatchToMutation('team-1', tempMatch, []);

    expect(variables.decision).toBe('PENALTIES');
    expect(variables.winnerSide).toBe('HOME');
    expect(variables.teamId).toBe('team-1');
    expect(variables.opponentId).toBe('team-2');
  });

  it('maps fetched match to temp match including cup fields', () => {
    const match = mapFetchedMatchToTempMatch({
      _id: 'match-1',
      date: '2024-08-01T10:00:00.000Z',
      isHome: true,
      teamGoals: 2,
      opponentGoals: 1,
      decision: 'EXTRA_TIME',
      winnerSide: 'AWAY',
      isForfeit: false,
      seasonId: { _id: 'season-1' },
      competitionId: { _id: 'comp-1', name: 'Cup' },
      teamId: {
        _id: 'team-1',
        teamName: 'Team One',
        teamBadge: null,
      },
      opponentId: {
        _id: 'team-2',
        teamName: 'Team Two',
        teamBadge: null,
      },
      matchPlayers: [],
    } as never);

    expect(match.decision).toBe('EXTRA_TIME');
    expect(match.winnerSide).toBe('AWAY');
    expect(match.competitionName).toBe('Cup');
  });
});
