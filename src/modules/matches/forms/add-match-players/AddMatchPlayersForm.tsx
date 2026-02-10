import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledMultiSelectInput,
  type ISelectOptions,
} from '../../../../components';
import TextList from '../../../../components/lists/TextList';
import { CustomTypography } from '../../../../components/typography';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYERS_FOR_MATCH_INPUT } from '../../types';
import AddMatchPlayersSchema, { AddMatchPlayersFormValues } from './validation';

interface Props {
  onSubmit: (data: AddMatchPlayersFormValues) => void;
  defaultValues: { matchPlayers: string[] };
  playersOptions: ISelectOptions[];
  players: T_FETCH_PLAYERS_FOR_MATCH_INPUT['players'];
  loading: boolean;
  error?: TApolloError;
}
export default function AddMatchPlayersForm({
  onSubmit,
  defaultValues,
  playersOptions,
  players,
  loading,
  error,
}: Props) {
  const { handleSubmit, control, watch } = useForm<AddMatchPlayersFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchPlayersSchema),
  });

  const matchPlayers = watch('matchPlayers');

  const playerList = useMemo(() => {
    const list: { label: string }[] = [];

    (matchPlayers || []).forEach(player => {
      const selectedPlayer = players.find(p => p._id === (player as unknown as string));
      list.push({ label: selectedPlayer?.name || '' });
    });
    return list;
  }, [matchPlayers, players]);

  return (
    <>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        submitBtn={{ text: 'Next' }}
        loading={loading}
        error={error}
      >
        <ControlledMultiSelectInput
          control={control}
          name="matchPlayers"
          label="Players"
          options={playersOptions}
        />
      </FormContainer>

      {playerList.length ? (
        <TextList data={playerList} />
      ) : (
        <CustomTypography color="label">Add some players</CustomTypography>
      )}
    </>
  );
}
