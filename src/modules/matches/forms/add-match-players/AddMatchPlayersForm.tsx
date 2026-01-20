import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import AddMatchPlayersSchema, { AddMatchPlayersFormValues } from './validation';
import {
  FormContainer,
  ControlledMultiSelectInput,
  type ISelectOptions,
} from '../../../../components';
import TextList from '../../../../components/lists/TextList';
import { CustomTypography } from '../../../../components/typography';
import { IPlayer } from '../../../players/types';

interface Props {
  onSubmit: (data: AddMatchPlayersFormValues) => void;
  defaultValues: AddMatchPlayersFormValues;
  playersOptions: ISelectOptions[];
  players: IPlayer[];
  loading: boolean;
  error?: ApolloError;
}
export default function AddMatchPlayersForm({
  onSubmit,
  defaultValues,
  playersOptions,
  players,
  loading,
  error,
}: Props) {
  const [playerList, setPlayerList] = useState<{ label: string }[]>([]);
  const { handleSubmit, control, watch } = useForm<AddMatchPlayersFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchPlayersSchema),
  });

  const matchPlayers = watch('matchPlayers');

  useEffect(() => {
    const list: { label: string }[] = [];
    matchPlayers?.forEach(player => {
      const selectedPlayer = players.find(p => p._id === (player as unknown as string));
      list.push({ label: selectedPlayer?.name || '' });
    });
    setPlayerList(list);
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
