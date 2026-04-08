import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams, useSeasons } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { initialTrophyFormState, type TrophyFormData } from '../forms/schema';
import { ADD_TROPHY, FETCH_TROPHIES } from '../graphql';
import AddTrophyPage from '../pages/AddTrophyPage';

export default function AddTrophy() {
  const { t } = useTranslation('trophies');
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons, error: seasonError } = useSeasons();
  const defaultValues: TrophyFormData = useMemo(() => ({ ...initialTrophyFormState }), []);

  const [addTrophy, { loading }] = useMutation(ADD_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId: teamId! } }],
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (formData: TrophyFormData) => {
    const mappedFormData = { ...formData, year: String(formData.year) };
    try {
      return addTrophy({ variables: { teamId: teamId!, ...mappedFormData } }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.ADD_TROPHY.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD_TROPHY.ERROR'), type: 'error' }));
    }
  };

  return (
    <AddTrophyPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      seasonOptions={seasonOptions}
      loading={loading || loadingSeasons}
      error={seasonError}
    />
  );
}
