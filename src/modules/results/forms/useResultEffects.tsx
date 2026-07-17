import { useEffect, useRef } from 'react';
import { ISelectOptions } from '../../../components';
import { ResultFormData } from './result/schema';

export const useResultEffects = ({
  currentCompetitionId,
  currentSeasonId,
  currentGameWeek,
  isBye,
  isCup,
  roundOptions,
  showGameWeek,
  setValue,
  clearErrors,
}: {
  currentCompetitionId: string;
  currentSeasonId: string;
  currentGameWeek: string | number;
  isBye?: boolean;
  isCup: boolean;
  roundOptions: ISelectOptions[];
  showGameWeek: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (name: keyof ResultFormData, value: any, options?: any) => void;
  clearErrors: (name?: keyof ResultFormData | (keyof ResultFormData)[]) => void;
}) => {
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
    clearErrors('gameWeek');
    clearErrors(['decision', 'winnerSide']);
  }, [currentCompetitionId, currentSeasonId, clearErrors, setValue]);

  useEffect(() => {
    if (!showGameWeek) {
      clearErrors('gameWeek');
      return;
    }
    // Avoid clearing prefilled values before async round options are loaded.
    if (roundOptions.length === 0) return;
    if (currentGameWeek === '' || currentGameWeek === undefined || currentGameWeek === null) return;

    const isValidOption = roundOptions.some(
      option => String(option.value) === String(currentGameWeek)
    );
    if (!isValidOption) {
      setValue('gameWeek', '' as ResultFormData['gameWeek'], {
        shouldDirty: false,
        shouldValidate: true,
      });
      clearErrors('gameWeek');
    }
  }, [clearErrors, currentGameWeek, roundOptions, setValue, showGameWeek]);

  useEffect(() => {
    if (isBye) {
      setValue('awayTeam', '', { shouldDirty: false, shouldValidate: false });
      setValue('homeGoals', undefined, { shouldDirty: false, shouldValidate: false });
      setValue('awayGoals', undefined, { shouldDirty: false, shouldValidate: false });
      clearErrors(['awayTeam', 'homeGoals', 'awayGoals']);
    }
  }, [isBye, clearErrors, setValue]);

  useEffect(() => {
    if (isCup) return;
    setValue('decision', '', { shouldDirty: false, shouldValidate: false });
    setValue('winnerSide', '', { shouldDirty: false, shouldValidate: false });
    clearErrors(['decision', 'winnerSide']);
  }, [clearErrors, isCup, setValue]);
};
