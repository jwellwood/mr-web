import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApolloError } from '@apollo/client';

import { Spinner } from '../../../../components/loaders';
import { FormModal } from '../../../../components';
import { getGoalsOptions } from '../../helpers';
import { AppDispatch, getTempMatch, getTempPlayers, setTmpPlayers } from '../../../../store';
import { initPlayerInMatch } from '../add-match-players/state';
import type { AddMatchPlayerStatsFormValues } from './validation';
import AddMatchPlayerStatsForm from './AddMatchPlayerStatsForm';

interface Props {
  playerId: string;
  title?: string;
  buttonElement: ReactNode;
  error?: ApolloError;
}

export default function AddStats({ playerId, title, buttonElement, error }: Props) {
  const currentMatch = useSelector(getTempMatch);
  const currentPlayers = useSelector(getTempPlayers);
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<AddMatchPlayerStatsFormValues | null>(null);

  useEffect(() => {
    const selectedPlayer = currentPlayers?.find(player => player.playerId === playerId);

    if (selectedPlayer) {
      setDefaultValues({
        ...selectedPlayer,
        matchPosition: selectedPlayer.matchPosition,
      });
    } else {
      setDefaultValues({
        ...initPlayerInMatch,
      });
    }
  }, [currentPlayers, playerId]);

  const closeForm = () => true;

  const onSubmit = async (formData: AddMatchPlayerStatsFormValues) => {
    const playerIndex = currentPlayers?.findIndex(player => player.playerId === playerId);
    const selectedPlayer = currentPlayers?.find(player => player.playerId === playerId);
    const matchPlayersToUpdate = [...currentPlayers];

    if (!matchPlayersToUpdate || playerIndex === undefined || playerIndex < 0) {
      closeForm();
      return;
    }

    const updated = {
      playerId,
      playerName: selectedPlayer?.playerName || '',
      ...formData,
    };

    matchPlayersToUpdate[playerIndex] = updated;

    dispatch(setTmpPlayers({ matchPlayers: matchPlayersToUpdate }));
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
