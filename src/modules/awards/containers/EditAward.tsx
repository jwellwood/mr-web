import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { ISelectOptions } from '../../../components';
import { useCustomParams, useSeasons } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useMatchPlayersInput } from '../../matches/hooks/useMatchPlayersInput';
import type { AwardFormData } from '../forms/schema';
import { EDIT_AWARD, FETCH_AWARD, FETCH_AWARDS } from '../graphql';
import { mapAwardToForm, mapFormToEditAwardVariables } from '../helpers/mapAwardForm';
import EditAwardPage from '../pages/EditAwardPage';

export default function EditAward() {
  const { t } = useTranslation('awards');
  const { awardId, teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingSeasons } = useSeasons();

  const { loading, error, data, refetch } = useQuery(FETCH_AWARD, {
    variables: { awardId: awardId! },
  });

  const [editAward, { loading: editLoading }] = useMutation(EDIT_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId: seasonId! } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.EDIT_AWARD.ERROR'), type: 'error' })),
  });

  const {
    players,
    loading: playersLoading,
    error: playersError,
  } = useMatchPlayersInput(teamId, seasonId);

  const playerOptions: ISelectOptions[] = useMemo(
    () =>
      players?.map(player => ({
        label: player.name,
        value: player._id,
      })),
    [players]
  );

  const defaultValues: AwardFormData | null = data?.award ? mapAwardToForm(data.award) : null;

  const onSubmit = async (formData: Partial<AwardFormData>) => {
    try {
      const variables = mapFormToEditAwardVariables(formData);
      return editAward({
        variables: {
          teamId: teamId!,
          awardId: awardId!,
          ...variables,
        },
      }).then(() => {
        refetch();
        dispatch(showAlert({ text: t('ALERTS.EDIT_AWARD.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.EDIT_AWARD.ERROR'), type: 'error' }));
    }
  };

  return (
    <EditAwardPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      playerOptions={playerOptions}
      loading={loading || editLoading || loadingSeasons || playersLoading}
      error={error || playersError}
    />
  );
}
