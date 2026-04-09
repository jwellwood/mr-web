import { renderHook } from '@testing-library/react';
import { type ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { useCustomParams } from '../useCustomParams';

const makeWrapper =
  (path: string, route: string) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={route} element={<>{children}</>} />
      </Routes>
    </MemoryRouter>
  );

describe('useCustomParams', () => {
  it('extracts teamId from URL', () => {
    const { result } = renderHook(() => useCustomParams(), {
      wrapper: makeWrapper('/team/abc123', '/team/:teamId'),
    });
    expect(result.current.teamId).toBe('abc123');
  });

  it('extracts multiple params simultaneously', () => {
    const { result } = renderHook(() => useCustomParams(), {
      wrapper: makeWrapper('/org/org1/season/s42', '/org/:orgId/season/:seasonId'),
    });
    expect(result.current.orgId).toBe('org1');
    expect(result.current.seasonId).toBe('s42');
  });

  it('returns undefined for params absent from the current URL', () => {
    const { result } = renderHook(() => useCustomParams(), {
      wrapper: makeWrapper('/team/abc123', '/team/:teamId'),
    });
    expect(result.current.matchId).toBeUndefined();
    expect(result.current.playerId).toBeUndefined();
    expect(result.current.orgId).toBeUndefined();
  });

  it('extracts all supported param names when all are present', () => {
    const { result } = renderHook(() => useCustomParams(), {
      wrapper: makeWrapper(
        '/org/o1/season/s1/match/m1/player/p1/award/a1/trophy/t1/comp/c1/result/r1/orgseason/os1',
        '/org/:orgId/season/:seasonId/match/:matchId/player/:playerId/award/:awardId/trophy/:trophyId/comp/:competitionId/result/:resultId/orgseason/:orgSeasonId'
      ),
    });
    expect(result.current.orgId).toBe('o1');
    expect(result.current.seasonId).toBe('s1');
    expect(result.current.matchId).toBe('m1');
    expect(result.current.playerId).toBe('p1');
    expect(result.current.awardId).toBe('a1');
    expect(result.current.trophyId).toBe('t1');
    expect(result.current.competitionId).toBe('c1');
    expect(result.current.resultId).toBe('r1');
    expect(result.current.orgSeasonId).toBe('os1');
  });
});
