import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../components/loaders';
import FormModal from '../../../components/modals/FormModal';
import { IPlayer, IPlayerInMatch } from '../../../types';
import { initPlayerInMatch } from '../constants';
import AddMatchPlayerStatsForm from '../forms/AddMatchPlayerStatsForm';
import { getGoalsOptions } from '../helpers';
import { getMinutesOptions } from '../helpers';
import { getTempMatch } from '../../../store/features/matches/matchesSelector.ts';
import { AppDispatch } from '../../../store/store.ts';
import { setTmpPlayers } from '../../../store/features/players/playersSlice.ts';

interface Props {
  playerId: string;
  title?: string;
  currentPlayers?: IPlayerInMatch[];
  buttonElement: ReactNode;
}

function AddStats({ playerId, title, currentPlayers, buttonElement }: Props) {
  const currentMatch = useSelector(getTempMatch);
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<IPlayerInMatch | null>(null);

  useEffect(() => {
    const selectedPlayer = currentPlayers?.find(player => player._id === playerId);
    if (selectedPlayer) {
      setDefaultValues({
        ...selectedPlayer,
        matchPosition:
          (selectedPlayer.playerId as IPlayer)?.position || selectedPlayer.matchPosition,
      });
    } else {
      setDefaultValues(initPlayerInMatch as IPlayerInMatch);
    }
  }, [currentPlayers, playerId]);

  const closeForm = () => true;

  const onSubmit = async (formData: IPlayerInMatch) => {
    const playerIndex = currentPlayers?.findIndex(player => player._id === playerId);
    const selectedPlayer = currentPlayers?.find(player => player._id === playerId);
    const matchPlayersToUpdate = currentPlayers;

    if (!matchPlayersToUpdate || playerIndex === undefined) {
      closeForm();
      return;
    }

    matchPlayersToUpdate[playerIndex] = {
      ...formData,
      _id: playerId,
      name: selectedPlayer?.name || formData.name,
      matchPosition: (selectedPlayer?.playerId as IPlayer)?.position || formData.matchPosition,
    };
    dispatch(setTmpPlayers({ players: matchPlayersToUpdate }));
    closeForm();
  };

  const goalOptions = getGoalsOptions(currentMatch.teamGoals);
  const concededOptions = getGoalsOptions(currentMatch.opponentGoals);
  const minuteOptions = getMinutesOptions(currentMatch.competition?.matchMinutes);

  return (
    <>
      {defaultValues && currentPlayers?.length ? (
        <FormModal buttonElement={buttonElement} title={title} closeForm={closeForm}>
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
}

export default AddStats;
