import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useResultEffects } from '../../useResultEffects';

type UseResultEffectsProps = Parameters<typeof useResultEffects>[0];

const buildProps = (overrides: Partial<UseResultEffectsProps> = {}): UseResultEffectsProps => ({
  currentCompetitionId: 'comp-1',
  currentSeasonId: 'season-1',
  currentGameWeek: '2',
  isBye: false,
  isCup: true,
  roundOptions: [
    { label: 'Round 1', value: '1' },
    { label: 'Round 2', value: '2' },
  ],
  showGameWeek: true,
  setValue: vi.fn(),
  clearErrors: vi.fn(),
  ...overrides,
});

describe('useResultEffects', () => {
  it('does not reset prefilled gameWeek, decision, and winnerSide on initial mount', async () => {
    const setValue = vi.fn();
    const clearErrors = vi.fn();

    renderHook((props: UseResultEffectsProps) => useResultEffects(props), {
      initialProps: buildProps({
        setValue,
        clearErrors,
      }),
    });

    await waitFor(() => {
      expect(setValue).not.toHaveBeenCalledWith('gameWeek', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
      expect(setValue).not.toHaveBeenCalledWith('decision', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
      expect(setValue).not.toHaveBeenCalledWith('winnerSide', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
    });
  });

  it('does not reset prefilled values when watched competition and season hydrate after mount', async () => {
    const setValue = vi.fn();
    const clearErrors = vi.fn();

    const { rerender } = renderHook((props: UseResultEffectsProps) => useResultEffects(props), {
      initialProps: buildProps({
        currentCompetitionId: undefined as unknown as string,
        currentSeasonId: undefined as unknown as string,
        setValue,
        clearErrors,
      }),
    });

    setValue.mockClear();
    clearErrors.mockClear();

    rerender(
      buildProps({
        currentCompetitionId: 'comp-1',
        currentSeasonId: 'season-1',
        setValue,
        clearErrors,
      })
    );

    await waitFor(() => {
      expect(setValue).not.toHaveBeenCalledWith('gameWeek', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
      expect(setValue).not.toHaveBeenCalledWith('decision', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
      expect(setValue).not.toHaveBeenCalledWith('winnerSide', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
    });
  });

  it('resets gameWeek, decision, and winnerSide when competition changes', async () => {
    const setValue = vi.fn();
    const clearErrors = vi.fn();

    const { rerender } = renderHook((props: UseResultEffectsProps) => useResultEffects(props), {
      initialProps: buildProps({
        currentCompetitionId: 'comp-1',
        setValue,
        clearErrors,
      }),
    });

    setValue.mockClear();
    clearErrors.mockClear();

    rerender(
      buildProps({
        currentCompetitionId: 'comp-2',
        setValue,
        clearErrors,
      })
    );

    await waitFor(() => {
      expect(setValue).toHaveBeenCalledWith('gameWeek', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
      expect(setValue).toHaveBeenCalledWith('decision', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
      expect(setValue).toHaveBeenCalledWith('winnerSide', '', {
        shouldDirty: false,
        shouldValidate: false,
      });
      expect(clearErrors).toHaveBeenCalledWith('gameWeek');
      expect(clearErrors).toHaveBeenCalledWith(['decision', 'winnerSide']);
    });
  });

  it('clears invalid gameWeek when options change', async () => {
    const setValue = vi.fn();
    const clearErrors = vi.fn();

    const { rerender } = renderHook((props: UseResultEffectsProps) => useResultEffects(props), {
      initialProps: buildProps({
        currentGameWeek: '2',
        roundOptions: [{ label: 'Round 2', value: '2' }],
        setValue,
        clearErrors,
      }),
    });

    setValue.mockClear();
    clearErrors.mockClear();

    rerender(
      buildProps({
        currentGameWeek: '2',
        roundOptions: [{ label: 'Round 3', value: '3' }],
        setValue,
        clearErrors,
      })
    );

    await waitFor(() => {
      expect(setValue).toHaveBeenCalledWith('gameWeek', '', {
        shouldDirty: false,
        shouldValidate: true,
      });
      expect(clearErrors).toHaveBeenCalledWith('gameWeek');
    });
  });

  it('resets away team and goals when isBye switches on', async () => {
    const setValue = vi.fn();
    const clearErrors = vi.fn();

    const { rerender } = renderHook((props: UseResultEffectsProps) => useResultEffects(props), {
      initialProps: buildProps({
        isBye: false,
        setValue,
        clearErrors,
      }),
    });

    setValue.mockClear();
    clearErrors.mockClear();

    rerender(
      buildProps({
        isBye: true,
        setValue,
        clearErrors,
      })
    );

    await waitFor(() => {
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
  });

  it('resets decision and winnerSide when changing from cup to non-cup', async () => {
    const setValue = vi.fn();
    const clearErrors = vi.fn();

    const { rerender } = renderHook((props: UseResultEffectsProps) => useResultEffects(props), {
      initialProps: buildProps({
        isCup: true,
        setValue,
        clearErrors,
      }),
    });

    setValue.mockClear();
    clearErrors.mockClear();

    rerender(
      buildProps({
        isCup: false,
        setValue,
        clearErrors,
      })
    );

    await waitFor(() => {
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

  it('does not clear gameWeek while round options are still loading', async () => {
    const setValue = vi.fn();
    const clearErrors = vi.fn();

    renderHook((props: UseResultEffectsProps) => useResultEffects(props), {
      initialProps: buildProps({
        currentGameWeek: '2',
        roundOptions: [],
        setValue,
        clearErrors,
      }),
    });

    await waitFor(() => {
      expect(setValue).not.toHaveBeenCalledWith('gameWeek', '', {
        shouldDirty: false,
        shouldValidate: true,
      });
    });
  });
});
