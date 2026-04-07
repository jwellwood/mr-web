import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledMultiSelectInput,
  type ISelectOptions,
} from '../../../../components';
import { TextList } from '../../../../components/lists';
import { CustomTypography } from '../../../../components/typography';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYERS_FOR_MATCH_INPUT } from '../../graphql';
import AddMatchPlayersSchema, { AddMatchPlayersFormValues } from './schema';

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
  const { t } = useTranslation('matches');
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<AddMatchPlayersFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchPlayersSchema),
  });

  const matchPlayers = useWatch({ control, name: 'matchPlayers' });

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
        onReset={() => reset(defaultValues)}
        submitBtn={{
          text: t('FORM.NEXT'),
          disabled: !isValid || !isDirty,
          confirm: { show: false },
        }}
        loading={loading}
        error={error}
      >
        <ControlledMultiSelectInput
          control={control}
          name="matchPlayers"
          label={t('FORM.PLAYERS')}
          options={playersOptions}
        />
      </FormContainer>

      {playerList.length ? (
        <TextList data={playerList} />
      ) : (
        <CustomTypography color="label">{t('MESSAGES.ADD_PLAYERS')}</CustomTypography>
      )}
    </>
  );
}
