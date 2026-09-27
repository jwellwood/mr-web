import { describe, it, expect } from 'vitest';
import { T_FETCH_RESULT, T_FETCH_RESULTS } from '../../graphql';
import {
  getGameweekChanges,
  mapFormToAddResult,
  mapResultToForm,
  mapFormToEditResult,
  mapResultsToBatchForm,
} from '../mapResultForm';

describe('mapResultForm helpers', () => {
  it('mapFormToAddResult maps form to mutation variables', () => {
    const form = {
      date: new Date('2023-01-02T12:00:00Z'),
      gameWeek: '3',
      competitionId: 'comp1',
      orgSeasonId: 'season1',
      homeTeam: 'home',
      awayTeam: 'away',
      homeGoals: '2',
      awayGoals: '1',
      kickoffTime: '15:30',
      decision: 'NORMAL_TIME',
      winnerSide: 'HOME',
      isForfeit: true,
    };
    const variables = mapFormToAddResult(form, 'org1', 'season1');
    expect(variables.orgId).toBe('org1');
    expect(variables.orgSeasonId).toBe('season1');
    expect(variables.date).toBe(form.date.toISOString());
    expect(variables.gameWeek).toBe(3);
    expect(variables.homeGoals).toBe(2);
    expect(variables.awayGoals).toBe(1);
    expect(variables.kickoffTime).toBe('15:30');
    expect(variables.decision).toBe('NORMAL_TIME');
    expect(variables.winnerSide).toBe('HOME');
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
      decision: 'PENALTIES',
      winnerSide: 'AWAY',
      isForfeit: false,
    };
    const form = mapResultToForm(result as T_FETCH_RESULT['result']);
    expect(form.date).toBeInstanceOf(Date);
    expect(form.kickoffTime).toBe('09:00');
    expect(form.gameWeek).toBe(5);
    expect(form.homeGoals).toBe(3);
    expect(form.awayGoals).toBe(0);
    expect(form.decision).toBe('PENALTIES');
    expect(form.winnerSide).toBe('AWAY');
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
      decision: 'EXTRA_TIME',
      winnerSide: 'HOME',
      isForfeit: false,
    };
    const variables = mapFormToEditResult(form, 'orgX', 'resultX');
    expect(variables.orgId).toBe('orgX');
    expect(variables.resultId).toBe('resultX');
    expect(variables.kickoffTime).toBeNull();
    expect(variables.gameWeek).toBe(7);
    expect(variables.decision).toBe('EXTRA_TIME');
    expect(variables.winnerSide).toBe('HOME');
  });

  it('classifies added, updated, deleted, and incomplete gameweek rows', () => {
    const originalResults = [
      { _id: 'existing-1' },
      { _id: 'existing-2' },
    ] as T_FETCH_RESULTS['results'];
    const formData = {
      matches: [
        { _id: 'existing-1', homeTeam: 'home-1', awayTeam: 'away-1' },
        { homeTeam: 'home-2', awayTeam: 'away-2' },
        { _id: 'existing-2', homeTeam: '', awayTeam: 'away-3' },
        { homeTeam: 'bye-team', awayTeam: '', isBye: true },
      ],
    } as Parameters<typeof getGameweekChanges>[1];

    const changes = getGameweekChanges(originalResults, formData);

    expect(changes.toAdd).toEqual([
      { homeTeam: 'home-2', awayTeam: 'away-2' },
      { homeTeam: 'bye-team', awayTeam: '', isBye: true },
    ]);
    expect(changes.toUpdate).toEqual([
      { _id: 'existing-1', match: { _id: 'existing-1', homeTeam: 'home-1', awayTeam: 'away-1' } },
    ]);
    expect(changes.toDelete).toEqual(['existing-2']);
  });

  it('preserves bye fields when mapping results into the gameweek form', () => {
    const results = [
      {
        _id: 'bye-result',
        date: '2026-01-01T12:00:00.000Z',
        gameWeek: 2,
        competitionId: { _id: 'competition-1' },
        orgSeasonId: { _id: 'season-1' },
        homeTeam: { _id: 'home-1' },
        awayTeam: null,
        homeGoals: null,
        awayGoals: null,
        kickoffTime: null,
        isForfeit: false,
        isBye: true,
      },
    ] as T_FETCH_RESULTS['results'];

    const formData = mapResultsToBatchForm(results);

    expect(formData.matches[0]).toMatchObject({
      _id: 'bye-result',
      homeTeam: 'home-1',
      awayTeam: '',
      homeGoals: 0,
      awayGoals: 0,
      isBye: true,
    });
  });
});
