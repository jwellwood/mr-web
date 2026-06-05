import { useEffect } from 'react';
import { ISelectOptions } from '../../../components';
import { ResultFormData } from './result/schema';

export const useResultEffects = ({
  currentCompetitionId,
  currentSeasonId,
  currentGameWeek,
  isBye,
  roundOptions,
  showGameWeek,
  setValue,
  clearErrors,
}: {
  currentCompetitionId: string;
  currentSeasonId: string;
  currentGameWeek: string | number;
  isBye: boolean;
  roundOptions: ISelectOptions[];
  showGameWeek: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (name: keyof ResultFormData, value: any, options?: any) => void;
  clearErrors: (name?: keyof ResultFormData | (keyof ResultFormData)[]) => void;
}) => {
  useEffect(() => {
    setValue('gameWeek', '', {
      shouldDirty: false,
      shouldValidate: false,
    });
    clearErrors('gameWeek');
  }, [currentCompetitionId, currentSeasonId, clearErrors, setValue]);

  useEffect(() => {
    if (!showGameWeek) {
      clearErrors('gameWeek');
      return;
    }
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
};
