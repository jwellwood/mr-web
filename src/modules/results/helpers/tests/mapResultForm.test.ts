import { describe, it, expect } from 'vitest';
import { T_FETCH_RESULT } from '../../graphql';
import { mapFormToAddResult, mapResultToForm, mapFormToEditResult } from '../mapResultForm';

describe('mapResultForm helpers', () => {
  it('mapFormToAddResult maps form to mutation variables', () => {
    const form = {
      date: new Date('2023-01-02T12:00:00Z'),
      gameWeek: '3',
      competitionId: 'comp1',
      homeTeam: 'home',
      awayTeam: 'away',
      homeGoals: '2',
      awayGoals: '1',
      kickoffTime: '15:30',
      isForfeit: true,
      isComplete: false,
    };
    const variables = mapFormToAddResult(form, 'org1', 'season1');
    expect(variables.orgId).toBe('org1');
    expect(variables.orgSeasonId).toBe('season1');
    expect(variables.date).toBe(form.date.toISOString());
    expect(variables.gameWeek).toBe(3);
    expect(variables.homeGoals).toBe(2);
    expect(variables.awayGoals).toBe(1);
    expect(variables.kickoffTime).toBe('15:30');
    expect(variables.isForfeit).toBe(true);
  });

  it('mapResultToForm maps result to form data', () => {
    const result = {
      date: '2024-05-06T09:00:00Z',
      kickoffTime: '09:00',
      gameWeek: 5,
      competitionId: { _id: 'c1' },
      orgSeasonId: { _id: 's1' },
      homeTeam: { _id: 'h1' },
      awayTeam: { _id: 'a1' },
      homeGoals: 3,
      awayGoals: 0,
      isForfeit: false,
      isComplete: true,
    };
    const form = mapResultToForm(result as T_FETCH_RESULT['result']);
    expect(form.date).toBeInstanceOf(Date);
    expect(form.kickoffTime).toBe('09:00');
    expect(form.gameWeek).toBe(5);
    expect(form.homeGoals).toBe(3);
    expect(form.awayGoals).toBe(0);
    expect(form.isComplete).toBe(true);
  });

  it('mapFormToEditResult includes resultId and maps kickoffTime null correctly', () => {
    const form = {
      date: new Date('2024-07-01T10:00:00Z'),
      gameWeek: 7,
      competitionId: 'compX',
      orgSeasonId: 'seasonX',
      homeTeam: 'homeX',
      awayTeam: 'awayX',
      homeGoals: '0',
      awayGoals: '0',
      kickoffTime: null,
      isForfeit: false,
      isComplete: false,
    };
    const variables = mapFormToEditResult(form, 'orgX', 'resultX');
    expect(variables.orgId).toBe('orgX');
    expect(variables.resultId).toBe('resultX');
    expect(variables.kickoffTime).toBeNull();
    expect(variables.gameWeek).toBe(7);
  });
});
