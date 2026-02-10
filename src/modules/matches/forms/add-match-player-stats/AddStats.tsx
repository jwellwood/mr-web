import { ReactNode, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormModal } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { AppDispatch, getTempMatch, getTempPlayers, setTmpPlayers } from '../../../../store';
import { TApolloError } from '../../../../types/apollo';
import { getGoalsOptions } from '../../helpers';
import { initPlayerInMatch } from '../add-match-players/state';
import AddMatchPlayerStatsForm from './AddMatchPlayerStatsForm';
import type { AddMatchPlayerStatsFormValues } from './validation';

interface Props {
  playerId: string;
  title?: string;
  buttonElement: ReactNode;
  error?: TApolloError;
}

export default function AddStats({ playerId, title, buttonElement, error }: Props) {
  const currentMatch = useSelector(getTempMatch);
  const currentPlayers = useSelector(getTempPlayers);
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const defaultValues: AddMatchPlayerStatsFormValues | null = useMemo(() => {
    const selectedPlayer = currentPlayers?.find(player => player.playerId === playerId);
    if (selectedPlayer) {
      return {
        ...selectedPlayer,
        matchPosition: selectedPlayer.matchPosition,
      } as AddMatchPlayerStatsFormValues;
    }
    return initPlayerInMatch as AddMatchPlayerStatsFormValues;
  }, [currentPlayers, playerId]);

  const onSubmit = async (formData: AddMatchPlayerStatsFormValues) => {
    const playerIndex = currentPlayers?.findIndex(player => player.playerId === playerId);
    const selectedPlayer = currentPlayers?.find(player => player.playerId === playerId);
    const matchPlayersToUpdate = [...currentPlayers];

    if (!matchPlayersToUpdate || playerIndex === undefined || playerIndex < 0) {
      return;
    }

    const updated = {
      playerId,
      playerName: selectedPlayer?.playerName || '',
      ...formData,
    };

    matchPlayersToUpdate[playerIndex] = updated;

    dispatch(setTmpPlayers({ matchPlayers: matchPlayersToUpdate }));
    setOpen(false);
  };

  const goalOptions = getGoalsOptions(currentMatch.teamGoals);
  const concededOptions = getGoalsOptions(currentMatch.opponentGoals);

  return (
    <>
      {defaultValues && currentPlayers?.length ? (
        <>
          <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
            {buttonElement}
          </span>
          <FormModal title={title} open={open} onClose={() => setOpen(false)}>
            <AddMatchPlayerStatsForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              goalOptions={goalOptions}
              concededOptions={concededOptions}
              loading={false}
              error={error}
            />
          </FormModal>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}
