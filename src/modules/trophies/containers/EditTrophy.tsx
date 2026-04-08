import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams, useSeasons } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import type { TrophyFormData } from '../forms/schema';
import { FETCH_TROPHY, EDIT_TROPHY, FETCH_TROPHIES } from '../graphql';
import { mapTrophyToForm, mapFormToEditTrophyVariables } from '../helpers/mapTrophyForm';
import EditTrophyPage from '../pages/EditTrophyPage';

export default function EditTrophy() {
  const { t } = useTranslation('trophies');
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();

  const { loading, error, data, refetch } = useQuery(FETCH_TROPHY, {
    variables: { trophyId: trophyId! },
  });

  const defaultValues: TrophyFormData | null = useMemo(() => {
    const trophy = data?.trophy;
    return trophy && seasonOptions.length > 0 ? mapTrophyToForm(trophy, seasonOptions) : null;
  }, [data, seasonOptions]);

  const [editTrophy, { loading: editLoading }] = useMutation(EDIT_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId: teamId! } }],
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (formData: TrophyFormData) => {
    try {
      const variables = mapFormToEditTrophyVariables(formData);
      return editTrophy({ variables: { teamId: teamId!, trophyId: trophyId!, ...variables } }).then(
        () => {
          refetch();
          dispatch(showAlert({ text: t('ALERTS.EDIT_TROPHY.SUCCESS'), type: 'success' }));
          navigate(-1);
        }
      );
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.EDIT_TROPHY.ERROR'), type: 'error' }));
    }
  };

  return (
    <EditTrophyPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      seasonOptions={seasonOptions}
      loading={loading || editLoading || loadingSeasons}
      error={error}
    />
  );
}
