import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'components/loaders';
import FormModal from 'components/modals/FormModal';
import { AppDispatch } from 'reduxStore/rootReducer';
import { getTempMatch } from 'selectors';
import { IPlayer, IPlayerInMatch } from 'types';
import { setTempPlayers } from '../actions/players.actions';
import { initPlayerInMatch } from '../constants';
import AddMatchPlayerStatsForm from '../forms/AddMatchPlayerStatsForm';
import { getGoalsOptions } from '../helpers';
import { getMinutesOptions } from '../helpers/getMinutesOptions';

interface Props {
  playerId: string;
  title: string;
  currentPlayers: IPlayerInMatch[];
  buttonElement: ReactNode;
}

const AddStats: React.FC<Props> = ({
  playerId,
  title,
  currentPlayers,
  buttonElement,
}) => {
  const currentMatch = useSelector(getTempMatch);
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<IPlayerInMatch>(null);

  useEffect(() => {
    const selectedPlayer = currentPlayers.find(
      (player) => player._id === playerId
    );
    if (selectedPlayer) {
      setDefaultValues({
        ...selectedPlayer,
        matchPosition: (selectedPlayer.playerId as IPlayer)?.position,
      });
    } else {
      setDefaultValues(initPlayerInMatch as IPlayerInMatch);
    }
  }, [currentPlayers, playerId]);

  const closeForm = () => true;

  const onSubmit = async (formData: IPlayerInMatch) => {
    const playerIndex = currentPlayers.findIndex(
      (player) => player._id === playerId
    );
    const selectedPlayer = currentPlayers.find(
      (player) => player._id === playerId
    );

    const matchPlayersToUpdate = currentPlayers;
    matchPlayersToUpdate[playerIndex] = {
      _id: playerId,
      name: selectedPlayer.name,
      matchPosition: (selectedPlayer.playerId as IPlayer)?.position,
      ...formData,
    };
    closeForm();
    await dispatch(setTempPlayers(matchPlayersToUpdate));
  };

  const goalOptions = getGoalsOptions(currentMatch.teamGoals);
  const concededOptions = getGoalsOptions(currentMatch.opponentGoals);
  const minuteOptions = getMinutesOptions(
    currentMatch.competition?.matchMinutes
  );

  return (
    <>
      {defaultValues && currentPlayers.length ? (
        <FormModal
          buttonElement={buttonElement}
          title={title}
          closeForm={closeForm}
        >
          <AddMatchPlayerStatsForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            goalOptions={goalOptions}
            concededOptions={concededOptions}
            minuteOptions={minuteOptions}
          />
        </FormModal>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AddStats;
