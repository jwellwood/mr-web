import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApolloError } from '@apollo/client';

import type { ISelectOptions } from '../../../../components';
import { AppDispatch, getTempMatch, setTmpMatch } from '../../../../store';
import { ICompetition } from '../../../organization/types';
import { ITeam } from '../../../team/types';
import { ITempMatch } from '../../types';
import { emptySelectOption } from '../../../../constants/rounds';
import { AddMatchDetailsFormValues } from './validation';
import AddMatchDetailsForm from './AddMatchDetailsForm';

interface Props {
  onNextClick: () => void;
  defaultValues: ITempMatch;
  teamId: string;
  seasonOptions: ISelectOptions[];
  competitions: ICompetition[];
  opponents: ITeam[];
  loading: boolean;
  error?: ApolloError;
}

export default function Step1MatchDetails({
  onNextClick,
  teamId,
  seasonOptions,
  competitions,
  opponents,
  loading,
  error,
}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const currentTempMatch = useSelector(getTempMatch);

  const opponentOptions: ISelectOptions[] = useMemo(
    () => [
      emptySelectOption,
      ...opponents.map(opponent => ({
        label: opponent.teamName,
        value: opponent._id as string,
        disabled: opponent._id === teamId,
      })),
    ],
    [opponents, teamId]
  );

  const competitionOptions: ISelectOptions[] = useMemo(
    () => [
      emptySelectOption,
      ...competitions.map(competition => ({
        label: competition.name,
        value: competition._id as string,
      })),
    ],
    [competitions]
  );

  const formattedSeasonOptions: ISelectOptions[] = [emptySelectOption, ...seasonOptions];

  const onSubmit = (formData: AddMatchDetailsFormValues) => {
    const team = opponents.find((opp: ITeam) => opp._id === teamId);
    const opponent = opponents.find((opp: ITeam) => opp._id === formData.opponentId);
    const competition = competitions.find(
      (comp: ICompetition) => comp._id === formData.competitionId
    );

    // convert Date -> ISO string for serializable redux state
    const payload = {
      ...currentTempMatch,
      ...formData,
      date: formData.date instanceof Date ? formData.date.toISOString() : formData.date,
      teamName: team?.teamName,
      opponentName: opponent?.teamName,
      competition,
    };

    dispatch(setTmpMatch(payload));
    onNextClick();
  };

  return (
    <AddMatchDetailsForm
      onSubmit={onSubmit}
      defaultValues={{
        ...currentTempMatch,
        date: currentTempMatch.date ? new Date(currentTempMatch.date) : new Date(),
      }}
      seasonOptions={formattedSeasonOptions}
      opponentOptions={opponentOptions}
      competitions={competitions}
      competitionOptions={competitionOptions}
      loading={loading}
      error={error}
    />
  );
}
