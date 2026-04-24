import React from 'react';
import { describe, it, expect } from 'vitest';
import { T_FETCH_RESULTS } from '../../../graphql';
import { rows } from '../result-table/rows';

const makeResult = (overrides: Partial<T_FETCH_RESULTS['results'][number]> = {}) =>
  ({
    _id: 'r-1',
    date: '2020-06-01T10:00:00.000Z',
    kickoffTime: '15:30',
    gameWeek: 1,
    homeGoals: 2,
    awayGoals: 1,
    isForfeit: false,
    isComplete: true,
    resultStatus: null,
    homeTeam: { _id: 'h-1', teamName: 'Home FC' },
    awayTeam: { _id: 'a-1', teamName: 'Away FC' },
    competitionId: { _id: 'c-1', name: 'League' },
    orgSeasonId: { _id: 'os-1' },
    homeGoalscorers: [],
    awayGoalscorers: [],
    submittedByTeam: null,
    confirmedByTeam: null,
    ...overrides,
  }) as T_FETCH_RESULTS['results'][number];

describe('rows()', () => {
  it('returns one row per result', () => {
    const result = rows([makeResult(), makeResult({ _id: 'r-2' })], 'org-1');
    expect(result).toHaveLength(2);
  });

  it('maps homeTeam and awayTeam names', () => {
    const [row] = rows([makeResult()], 'org-1');
    expect(row.homeTeam).toBe('Home FC');
    expect(row.awayTeam).toBe('Away FC');
  });

  it('uses the result kickoffTime when present', () => {
    const [row] = rows([makeResult({ kickoffTime: '20:45' })], 'org-1');
    expect(row.kickoffTime).toBe('20:45');
  });

  it('defaults kickoffTime to "09:00" when null', () => {
    const [row] = rows([makeResult({ kickoffTime: null })], 'org-1');
    expect(row.kickoffTime).toBe('09:00');
  });

  it('builds the correct homeScore and awayScore link', () => {
    const [row] = rows([makeResult()], 'org-1');
    const expectedLink = '/org/org-1/org_season/os-1/result/r-1';
    expect(row.homeScore.link).toBe(expectedLink);
    expect(row.awayScore.link).toBe(expectedLink);
  });

  it('provides React elements for homeScore and awayScore values', () => {
    const [row] = rows([makeResult()], 'org-1');
    expect(React.isValidElement(row.homeScore.value)).toBe(true);
    expect(React.isValidElement(row.awayScore.value)).toBe(true);
  });

  it('provides a React element for the divider', () => {
    const [row] = rows([makeResult()], 'org-1');
    expect(React.isValidElement(row.divider)).toBe(true);
  });

  it('returns an empty array when given no results', () => {
    expect(rows([], 'org-1')).toHaveLength(0);
  });
});
