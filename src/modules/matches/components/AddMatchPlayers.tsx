import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISelectOptions } from 'components/inputs/SelectInput';
import { Spinner } from 'components/loaders';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { AppDispatch } from 'reduxStore/rootReducer';
import { getTempMatch, getTempPlayers } from 'selectors';
import { setTempPlayers } from '../actions/players.actions';
import { initPlayerInMatch } from '../constants';
import AddMatchPlayersForm from '../forms/AddMatchPlayersForm';
import { useMatchPlayersInput } from '../hooks/useMatchPlayersInput';

type Props = {
  onNextClick: () => void;
  teamId: string;
};

const AddMatchPlayers: React.FC<Props> = ({ onNextClick, teamId }) => {
  const { matchId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const currentPlayers = useSelector(getTempPlayers);
  const currentMatch = useSelector(getTempMatch);
  const [values, setValues] = useState<{ matchPlayers: string[] }>(null);
  const { players, loading, error } = useMatchPlayersInput(
    teamId,
    currentMatch.seasonId
  );

  const onSubmit = (formData: { matchPlayers: string[] }) => {
    const { matchPlayers } = formData;
    const selectedPlayers = [];
    // if id is in current players keep current stats, else remove it
    currentPlayers.forEach((player) => {
      const id = player.playerId?._id || player._id;
      if (matchPlayers.includes(id)) {
        const mappedPlayer = {
          _id: id,
          name: player.playerId?.name,
          ...player,
        };
        selectedPlayers.push(mappedPlayer);
      }
    });
    // is id is not in current players but in form, add it with init
    const selectedPlayersIds = selectedPlayers.map((player) => player._id);
    matchPlayers.forEach((playerId: string) => {
      const selectedPlayer = players.find((pl) => pl._id === playerId);
      if (!selectedPlayersIds.includes(playerId)) {
        selectedPlayers.push({
          _id: playerId,
          name: selectedPlayer.name,
          ...initPlayerInMatch,
        });
      }
    });
    dispatch(setTempPlayers(selectedPlayers));
    onNextClick();
  };

  const playerOptions: ISelectOptions[] = useMemo(
    () =>
      players.map((player) => ({
        label: player.name,
        value: player._id,
      })),
    [players]
  );
  useEffect(() => {
    const mappedValues = () =>
      currentPlayers.map((player) => player?.playerId?._id || player._id);

    setValues({ matchPlayers: mappedValues() });
  }, [currentPlayers, matchId]);

  if (error) {
    return <ErrorGraphql error={[error]} />;
  }

  return !loading && values ? (
    <AddMatchPlayersForm
      onSubmit={onSubmit}
      defaultValues={values}
      playersOptions={playerOptions}
      players={players}
    />
  ) : (
    <Spinner />
  );
};

export default AddMatchPlayers;
