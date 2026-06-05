import { ISelectOptions } from '../../../components';

export const isCupMatch = (
  competitionOptions: ISelectOptions[],
  currentCompetitionId: string | number
) => {
  const selectedCompetitionType = competitionOptions.find(
    option => String(option.value) === String(currentCompetitionId)
  )?.meta?.competitionType;

  const isCup =
    typeof selectedCompetitionType === 'string' && selectedCompetitionType.toLowerCase() === 'cup';

  return isCup;
};
