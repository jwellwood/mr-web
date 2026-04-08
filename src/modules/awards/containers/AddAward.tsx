import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { ISelectOptions } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useMatchPlayersInput } from '../../matches/hooks/useMatchPlayersInput';
import { initialAwardState, type AwardFormData } from '../forms/schema';
import { ADD_AWARD, FETCH_AWARDS } from '../graphql';
import AddAwardPage from '../pages/AddAwardPage';

export default function AddAward() {
  const { t } = useTranslation('awards');
  const { teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const defaultValues: AwardFormData = initialAwardState;
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

  const [addAward, { loading }] = useMutation(ADD_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD_AWARD.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: AwardFormData) => {
    try {
      return addAward({
        variables: {
          ...formData,
          teamId: teamId!,
          seasonId: seasonId!,
          awardValue: +(formData.awardValue || 0),
        },
      }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.ADD_AWARD.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD_AWARD.ERROR'), type: 'error' }));
    }
  };

  return (
    <AddAwardPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      playerOptions={playerOptions}
      loading={loading || playersLoading}
      error={playersError}
    />
  );
}
