import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISelectOptions } from '../../../../components/inputs/SelectInput.tsx';
import { AppDispatch } from '../../../../store/store.ts';
import { getTempMatch } from '../../../../store/features/matches/matchesSelector.ts';
import { setTmpMatch } from '../../../../store/features/matches/matchesSlice.ts';
import { ICompetition } from '../../../organization/types.ts';
import { ITeam } from '../../../team/types.ts';
import AddMatchDetailsForm from '../components/AddMatchDetailsForm.tsx';
import { ITempMatch } from '../../types.ts';
import { emptySelectOption } from '../../../../constants/rounds.ts';

interface Props {
  onNextClick: () => void;
  defaultValues: ITempMatch;
  teamId: string;
  seasonOptions: ISelectOptions[];
  competitions: ICompetition[];
  opponents: ITeam[];
}

export default function Step1MatchDetails({
  onNextClick,
  teamId,
  seasonOptions,
  competitions,
  opponents,
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

  const onSubmit = (formData: Partial<ITempMatch>) => {
    const team = opponents.find((opp: ITeam) => opp._id === teamId);
    const opponent = opponents.find((opp: ITeam) => opp._id === formData.opponentId);
    const competition = competitions.find(
      (comp: ICompetition) => comp._id === formData.competitionId
    );

    dispatch(
      setTmpMatch({
        ...formData,
        teamName: team?.teamName,
        opponentName: opponent?.teamName,
        competition,
      })
    );
    onNextClick();
  };

  return (
    <AddMatchDetailsForm
      onSubmit={onSubmit}
      defaultValues={currentTempMatch}
      seasonOptions={formattedSeasonOptions}
      opponentOptions={opponentOptions}
      competitions={competitions}
      competitionOptions={competitionOptions}
    />
  );
}
