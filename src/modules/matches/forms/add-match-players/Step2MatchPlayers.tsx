import { ApolloError } from '@apollo/client';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ISelectOptions } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, getTempMatch, getTempPlayers, setTmpPlayers } from '../../../../store';
import { useMatchPlayersInput } from '../../hooks/useMatchPlayersInput';
import { ITempMatchPlayers } from '../../types';
import AddMatchPlayersForm from './AddMatchPlayersForm';
import { initPlayerInMatch } from './state';
import { AddMatchPlayersFormValues } from './validation';

interface Props {
  onNextClick: () => void;
  loading: boolean;
  error?: ApolloError;
}

export default function Step2MatchPlayers({ onNextClick, loading, error }: Props) {
  const { teamId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const currentPlayers = useSelector(getTempPlayers);
  const currentMatch = useSelector(getTempMatch);

  const values = useMemo<{ matchPlayers: string[] } | null>(() => {
    if (!currentPlayers) return null;
    const mappedValues = () =>
      currentPlayers
        .map(player => (typeof player?.playerId === 'object' ? player.playerId : player.playerId))
        .filter(p => p !== undefined);
    return { matchPlayers: mappedValues() };
  }, [currentPlayers]);

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
