import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApolloError } from '@apollo/client';

import type { ISelectOptions } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { useMatchPlayersInput } from '../../hooks/useMatchPlayersInput';
import { AppDispatch, getTempMatch, getTempPlayers, setTmpPlayers } from '../../../../store';
import { initPlayerInMatch } from './state';
import { AddMatchPlayersFormValues } from './validation';
import AddMatchPlayersForm from './AddMatchPlayersForm';
import { ITempMatchPlayers } from '../../types';

interface Props {
  onNextClick: () => void;
  loading: boolean;
  error?: ApolloError;
}

export default function Step2MatchPlayers({ onNextClick, loading, error }: Props) {
  const { matchId, teamId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const currentPlayers = useSelector(getTempPlayers);
  const currentMatch = useSelector(getTempMatch);

  const [values, setValues] = useState<{ matchPlayers: string[] } | null>(null);

  const {
    players,
    loading: playersLoading,
    error: inputError,
  } = useMatchPlayersInput(teamId, currentMatch.seasonId);

  const onSubmit = (formData: AddMatchPlayersFormValues) => {
    const { matchPlayers } = formData;
    const selectedPlayers: ITempMatchPlayers[] = [];
    // if id is in current players keep current stats, else remove it
    currentPlayers.forEach(player => {
      const id = typeof player.playerId === 'object' ? player.playerId : player.playerId;
      if (id && matchPlayers.includes(id)) {
        const mappedPlayer = {
          ...player,
          playerId: id,
          playerName:
            (typeof player.playerId === 'object' ? player.playerId : player.playerName) || '-',
        };
        selectedPlayers.push(mappedPlayer);
      }
    });
    // if id is not in current players but in form, add it with init
    const selectedPlayersIds = selectedPlayers.map(player => player.playerId);
    matchPlayers.forEach((playerId: string) => {
      const selectedPlayer = players.find(pl => pl._id === playerId);
      if (!selectedPlayersIds.includes(playerId)) {
        selectedPlayers.push({
          ...initPlayerInMatch,
          matchPosition: selectedPlayer?.position || '',
          playerId,
          playerName: selectedPlayer?.name as string,
        });
      }
    });
    dispatch(setTmpPlayers({ matchPlayers: selectedPlayers }));
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
        .map(player => (typeof player?.playerId === 'object' ? player.playerId : player.playerId))
        .filter(p => p !== undefined);

    setValues({ matchPlayers: mappedValues() });
  }, [currentPlayers, matchId]);

  return values ? (
    <AddMatchPlayersForm
      onSubmit={onSubmit}
      defaultValues={values}
      playersOptions={playerOptions}
      players={players}
      loading={playersLoading || loading}
      error={inputError || error}
    />
  ) : (
    <Spinner />
  );
}
