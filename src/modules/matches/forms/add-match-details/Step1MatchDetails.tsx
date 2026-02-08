import { useDispatch, useSelector } from 'react-redux';
import { ApolloError } from '@apollo/client';

import { AppDispatch, getTempMatch, setTmpMatch } from '../../../../store';
import { AddMatchDetailsFormValues } from './validation';
import AddMatchDetailsForm from './AddMatchDetailsForm';
import { useMatchDetailsInput } from '../../hooks/useMatchDetailsInput';
import { useCustomParams } from '../../../../hooks';
import { ISelectOptions, NoDataText } from '../../../../components';
import { mapTempMatchToFormData } from '../mappers';

interface Props {
  onNextClick: () => void;
  loading: boolean;
  error?: ApolloError;
}

export default function Step1MatchDetails({ onNextClick, loading, error }: Props) {
  const { teamId } = useCustomParams();
  const {
    seasonOptions,
    opponentOptions,
    competitionOptions,
    loading: inputLoading,
    dataFetched,
  } = useMatchDetailsInput();
  const dispatch: AppDispatch = useDispatch();
  const currentTempMatch = useSelector(getTempMatch);

  const onSubmit = (formData: AddMatchDetailsFormValues) => {
    const teamName =
      (opponentOptions.find((opp: ISelectOptions) => opp.value === teamId)?.label as string) || '';
    const opponentName =
      (opponentOptions.find((opp: ISelectOptions) => opp.value === formData.opponentId)
        ?.label as string) || '';
    const competitionName =
      (competitionOptions.find((comp: ISelectOptions) => comp.value === formData.competitionId)
        ?.label as string) || '';

    const payload = {
      ...currentTempMatch,
      ...formData,
      teamId: teamId!,
      teamBadgeUrl: currentTempMatch?.teamBadgeUrl ?? '',
      opponentBadgeUrl: currentTempMatch?.opponentBadgeUrl ?? '',
      teamName,
      opponentName,
      competitionName,
      date: formData.date instanceof Date ? formData.date.toISOString() : formData.date,
    };

    dispatch(setTmpMatch(payload));
    onNextClick();
  };

  const isLoading = loading || inputLoading;

  // Only show no-data messages after data has been fetched
  // Options arrays always have at least the empty option, so length <= 1 means no real data
  if (dataFetched && !isLoading) {
    if (seasonOptions.length <= 1) {
      return <NoDataText>Please add a season before adding a match.</NoDataText>;
    }
    if (competitionOptions.length <= 1) {
      return <NoDataText>Please add a competition before adding a match.</NoDataText>;
    }
  }

  return (
    <AddMatchDetailsForm
      onSubmit={onSubmit}
      defaultValues={mapTempMatchToFormData(currentTempMatch)}
      seasonOptions={seasonOptions}
      opponentOptions={opponentOptions}
      competitionOptions={competitionOptions}
      loading={isLoading}
      error={error}
    />
  );
}
