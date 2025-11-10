import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISelectOptions } from '../../../../components/inputs/SelectInput.tsx';
import { Spinner } from '../../../../components/loaders';
import ErrorGraphql from '../../../../errors/ErrorGraphql.tsx';
import { useCustomParams } from '../../../../hooks/useCustomParams.tsx';
import AddMatchPlayersForm from '../components/AddMatchPlayersForm.tsx';
import { useMatchPlayersInput } from '../../hooks/useMatchPlayersInput.ts';
import { AppDispatch } from '../../../../store/store.ts';
import { getTempMatch } from '../../../../store/features/matches/matchesSelector.ts';
import { getTempPlayers } from '../../../../store/features/players/playersSelector.ts';
import { IPlayerInMatch } from '../../../../types';
import { setTmpPlayers } from '../../../../store/features/players/playersSlice.ts';
import { initPlayerInMatch } from '../state.ts';

interface Props {
  onNextClick: () => void;
  teamId: string;
}

export default function Step2MatchPlayers({ onNextClick, teamId }: Props) {
  const { matchId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const currentPlayers = useSelector(getTempPlayers);
  const currentMatch = useSelector(getTempMatch);
  const [values, setValues] = useState<{ matchPlayers: string[] } | null>(null);
  const { players, loading, error } = useMatchPlayersInput(teamId, currentMatch.seasonId);
  const onSubmit = (formData: { matchPlayers: string[] }) => {
    const { matchPlayers } = formData;
    const selectedPlayers: IPlayerInMatch[] = [];
    // if id is in current players keep current stats, else remove it
    currentPlayers.forEach(player => {
      const id = typeof player.playerId === 'object' ? player.playerId?._id : player._id;
      if (id && matchPlayers.includes(id)) {
        const mappedPlayer = {
          ...player,
          _id: id,
          name: (typeof player.playerId === 'object' ? player.playerId?.name : player.name) || '-',
        };
        selectedPlayers.push(mappedPlayer);
      }
    });
    // if id is not in current players but in form, add it with init
    const selectedPlayersIds = selectedPlayers.map(player => player._id);
    matchPlayers.forEach((playerId: string) => {
      const selectedPlayer = players.find(pl => pl._id === playerId);
      if (!selectedPlayersIds.includes(playerId)) {
        selectedPlayers.push({
          ...initPlayerInMatch,
          _id: playerId,
          playerId,
          matchId: matchId as string,
          name: selectedPlayer?.name as string,
        });
      }
    });
    dispatch(setTmpPlayers({ players: selectedPlayers }));
    onNextClick();
  };

  const playerOptions: ISelectOptions[] = useMemo(
    () =>
      players.map(player => ({
        label: player.name,
        value: player._id,
      })),
    [players]
  );
  useEffect(() => {
    const mappedValues = () =>
      currentPlayers
        .map(player => (typeof player?.playerId === 'object' ? player.playerId._id : player._id))
        .filter(p => p !== undefined);

    setValues({ matchPlayers: mappedValues() });
  }, [currentPlayers, matchId]);

  if (error) {
    return <ErrorGraphql error={error} />;
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
}
