import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledMultiSelectInput,
  type ISelectOptions,
  SectionContainer,
} from '../../../../components';
import { IListItem, TextList } from '../../../../components/lists';
import { CustomTypography, PositionText } from '../../../../components/typography';
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
    formState: { isValid },
    reset,
  } = useForm<AddMatchPlayersFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchPlayersSchema),
  });

  const matchPlayers = useWatch({ control, name: 'matchPlayers' });

  const playerList = useMemo(() => {
    const list: IListItem[] = [];

    (matchPlayers || []).forEach(playerId => {
      const selectedPlayer = players.find(p => p._id === playerId);

      list.push({
        avatar: <PositionText>{selectedPlayer?.position || ''}</PositionText>,
        label: (
          <CustomTypography bold color="data">
            {selectedPlayer?.name || ''}
          </CustomTypography>
        ),
      });
    });
    return list;
  }, [matchPlayers, players]);

  return (
    <>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset(defaultValues)}
        submitBtn={{
          text: t('FORM.BUTTONS.NEXT'),
          disabled: !isValid,
          confirm: { show: false },
        }}
        loading={loading}
        error={error}
      >
        <ControlledMultiSelectInput
          control={control}
          name="matchPlayers"
          label={t('FORM.LABELS.PLAYERS')}
          options={playersOptions}
        />
      </FormContainer>
      <SectionContainer>
        {playerList.length ? (
          <TextList data={playerList} />
        ) : (
          <CustomTypography color="label">{t('MESSAGES.ADD_PLAYERS')}</CustomTypography>
        )}
      </SectionContainer>
    </>
  );
}
