import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApolloError } from '@apollo/client';

import { Spinner } from '../../../../components/loaders';
import FormModal from '../../../../components/modals/FormModal';
import { getGoalsOptions } from '../../helpers';
import { AppDispatch, getTempMatch, setTmpPlayers } from '../../../../store';
import { initPlayerInMatch } from '../add-match-players/state';
import { IPlayer } from '../../../players/types';
import { IPlayerInMatch } from '../../types';
import type { AddMatchPlayerStatsFormValues } from './validation';
import AddMatchPlayerStatsForm from './AddMatchPlayerStatsForm';

interface Props {
  playerId: string;
  title?: string;
  currentPlayers?: IPlayerInMatch[];
  buttonElement: ReactNode;
  error?: ApolloError;
}

export default function AddStats({ playerId, title, currentPlayers, buttonElement, error }: Props) {
  const currentMatch = useSelector(getTempMatch);
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<AddMatchPlayerStatsFormValues | null>(null);

  useEffect(() => {
    const selectedPlayer = currentPlayers?.find(player => player._id === playerId);

    if (selectedPlayer) {
      setDefaultValues({
        ...selectedPlayer,
        matchPosition:
          (selectedPlayer.playerId as IPlayer)?.position || selectedPlayer.matchPosition,
      });
    } else {
      setDefaultValues({
        ...initPlayerInMatch,
      });
    }
  }, [currentPlayers, playerId]);

  const closeForm = () => true;

  const onSubmit = async (formData: AddMatchPlayerStatsFormValues) => {
    const playerIndex = currentPlayers?.findIndex(player => player._id === playerId);
    const selectedPlayer = currentPlayers?.find(player => player._id === playerId);
    const matchPlayersToUpdate = currentPlayers;

    if (!matchPlayersToUpdate || playerIndex === undefined) {
      closeForm();
      return;
    }

    const updated = {
      ...matchPlayersToUpdate[playerIndex],
      _id: playerId,
      name: selectedPlayer?.name || (matchPlayersToUpdate[playerIndex]?.name ?? ''),
      matchPosition: (selectedPlayer?.playerId as IPlayer)?.position || formData.matchPosition,
      isStarter: formData.isStarter,
      goals: formData.goals,
      pensScored: formData.pensScored ?? 0,
      assists: formData.assists,
      ownGoals: formData.ownGoals ?? 0,
      pensMissed: formData.pensMissed ?? 0,
      pensSaved: formData.pensSaved ?? 0,
      conceded: formData.conceded,
      yellowCards: formData.yellowCards ?? 0,
      mvp: formData.mvp,
      redCard: formData.redCard,
      cleanSheet: formData.cleanSheet,
    } as IPlayerInMatch;

    matchPlayersToUpdate[playerIndex] = updated;
    dispatch(setTmpPlayers({ players: matchPlayersToUpdate }));
    closeForm();
  };

  const goalOptions = getGoalsOptions(currentMatch.teamGoals);
  const concededOptions = getGoalsOptions(currentMatch.opponentGoals);

  return (
    <>
      {defaultValues && currentPlayers?.length ? (
        <FormModal buttonElement={buttonElement} title={title} closeForm={closeForm}>
          <AddMatchPlayerStatsForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            goalOptions={goalOptions}
            concededOptions={concededOptions}
            loading={false}
            error={error}
          />
        </FormModal>
      ) : (
        <Spinner />
      )}
    </>
  );
}
