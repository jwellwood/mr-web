import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useResultEffects } from '../useResultEffects';

type EffectProps = Omit<Parameters<typeof useResultEffects>[0], 'setValue' | 'clearErrors'>;

const renderEffects = (initialProps: EffectProps) => {
  const setValue = vi.fn();
  const clearErrors = vi.fn();
  const hook = renderHook(
    (props: EffectProps) => useResultEffects({ ...props, setValue, clearErrors }),
    { initialProps }
  );

  return { ...hook, setValue, clearErrors };
};

describe('useResultEffects', () => {
  it('does not clear existing form values on initial mount', () => {
    const { setValue, clearErrors } = renderEffects({
      currentCompetitionId: 'cup-1',
      currentSeasonId: 'season-1',
      isBye: false,
      isCup: true,
    });

    expect(setValue).not.toHaveBeenCalled();
    expect(clearErrors).not.toHaveBeenCalled();
  });

  it.each([
    ['competition', { currentCompetitionId: 'cup-2', currentSeasonId: 'season-1' }],
    ['season', { currentCompetitionId: 'cup-1', currentSeasonId: 'season-2' }],
  ] as const)('clears dependent values when the %s changes', (_changedField, updatedValues) => {
    const initialProps: EffectProps = {
      currentCompetitionId: 'cup-1',
      currentSeasonId: 'season-1',
      isBye: false,
      isCup: true,
    };
    const { rerender, setValue, clearErrors } = renderEffects(initialProps);

    rerender({ ...initialProps, ...updatedValues });

    expect(setValue).toHaveBeenCalledTimes(9);
    expect(setValue).toHaveBeenCalledWith('gameWeek', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(setValue).toHaveBeenCalledWith('homeTeam', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(setValue).toHaveBeenCalledWith('homeGoals', '0', {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(setValue).toHaveBeenCalledWith('isForfeit', false, {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(clearErrors).toHaveBeenCalledWith([
      'homeTeam',
      'awayTeam',
      'homeGoals',
      'awayGoals',
      'isBye',
      'isForfeit',
      'gameWeek',
      'decision',
      'winnerSide',
    ]);
  });

  it('clears away-team and score fields when a match becomes a bye', () => {
    const initialProps: EffectProps = {
      currentCompetitionId: 'cup-1',
      currentSeasonId: 'season-1',
      isBye: false,
      isCup: true,
    };
    const { rerender, setValue, clearErrors } = renderEffects(initialProps);

    rerender({ ...initialProps, isBye: true });

    expect(setValue).toHaveBeenCalledWith('awayTeam', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(setValue).toHaveBeenCalledWith('homeGoals', undefined, {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(setValue).toHaveBeenCalledWith('awayGoals', undefined, {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(clearErrors).toHaveBeenCalledWith(['awayTeam', 'homeGoals', 'awayGoals']);
  });

  it('clears tiebreaker values when the competition is not a cup', () => {
    const initialProps: EffectProps = {
      currentCompetitionId: 'cup-1',
      currentSeasonId: 'season-1',
      isBye: false,
      isCup: true,
    };
    const { rerender, setValue, clearErrors } = renderEffects(initialProps);

    rerender({ ...initialProps, isCup: false });

    expect(setValue).toHaveBeenCalledWith('decision', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(setValue).toHaveBeenCalledWith('winnerSide', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    expect(clearErrors).toHaveBeenCalledWith(['decision', 'winnerSide']);
  });
});
