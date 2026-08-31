import { useEffect, useRef } from 'react';
import { ResultFormData } from '../forms/result/schema';

export const useResultEffects = ({
  currentCompetitionId,
  currentSeasonId,
  isBye,
  isCup,
  setValue,
  clearErrors,
}: {
  currentCompetitionId: string;
  currentSeasonId: string;
  isBye?: boolean;
  isCup: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (name: keyof ResultFormData, value: any, options?: any) => void;
  clearErrors: (name?: keyof ResultFormData | (keyof ResultFormData)[]) => void;
}) => {
  // Conditions:
  // 1. If the competition or season changes, reset all fields except for the changed field
  const hasInitializedCompetitionSeason = useRef(false);
  const previousCompetitionIdRef = useRef(currentCompetitionId);
  const previousSeasonIdRef = useRef(currentSeasonId);

  useEffect(() => {
    const previousCompetitionId = previousCompetitionIdRef.current;
    const previousSeasonId = previousSeasonIdRef.current;

    previousCompetitionIdRef.current = currentCompetitionId;
    previousSeasonIdRef.current = currentSeasonId;

    if (!hasInitializedCompetitionSeason.current) {
      hasInitializedCompetitionSeason.current = true;
      return;
    }

    const hasCompetitionChanged = previousCompetitionId !== currentCompetitionId;
    const hasSeasonChanged = previousSeasonId !== currentSeasonId;
    const hadPreviousSelection = Boolean(previousCompetitionId) || Boolean(previousSeasonId);

    if (!hadPreviousSelection || (!hasCompetitionChanged && !hasSeasonChanged)) {
      return;
    }

    setValue('gameWeek', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('decision', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('winnerSide', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('homeTeam', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('awayTeam', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('homeGoals', '0', {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('awayGoals', '0', {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('isComplete', false, {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('isBye', false, {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue('isForfeit', false, {
      shouldDirty: false,
      shouldValidate: false,
    });

    clearErrors([
      'homeTeam',
      'awayTeam',
      'homeGoals',
      'awayGoals',
      'isBye',
      'isForfeit',
      'gameWeek',
      'decision',
      'winnerSide',
      'isComplete',
    ]);
  }, [currentCompetitionId, currentSeasonId, clearErrors, setValue]);

  useEffect(() => {}, [currentCompetitionId, currentSeasonId, clearErrors, setValue]);
  // 2. If the match is a bye, reset away team and home/away goals fields
  useEffect(() => {
    if (isBye) {
      setValue('awayTeam', '', { shouldDirty: false, shouldValidate: false });
      setValue('homeGoals', undefined, { shouldDirty: false, shouldValidate: false });
      setValue('awayGoals', undefined, { shouldDirty: false, shouldValidate: false });
      clearErrors(['awayTeam', 'homeGoals', 'awayGoals']);
    }
  }, [isBye, clearErrors, setValue]);
  // 3. If the match is not a cup match, reset decision and winner side fields
  useEffect(() => {
    if (isCup) return;
    setValue('decision', '', { shouldDirty: false, shouldValidate: false });
    setValue('winnerSide', '', { shouldDirty: false, shouldValidate: false });
    clearErrors(['decision', 'winnerSide']);
  }, [clearErrors, isCup, setValue]);
};
