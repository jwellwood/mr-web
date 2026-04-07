import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { initialCompetitionState, type CompetitionFormData } from '../forms/schema';
import { ADD_COMPETITION, FETCH_COMPETITIONS } from '../graphql';
import { mapFormToAddCompetition } from '../helpers/mapCompetitionForm';
import AddCompetitionPage from '../pages/AddCompetitionPage';

export default function AddCompetition() {
  const { t } = useTranslation('competitions');
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const defaultValues: CompetitionFormData = useMemo(() => ({ ...initialCompetitionState }), []);

  const [addCompetition, { loading }] = useMutation(ADD_COMPETITION, {
    refetchQueries: [{ query: FETCH_COMPETITIONS, variables: { orgId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD_COMPETITION.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: CompetitionFormData) => {
    try {
      const variables = mapFormToAddCompetition(formData, orgId!);
      return addCompetition({
        variables,
      }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.ADD_COMPETITION.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD_COMPETITION.ERROR'), type: 'error' }));
    }
  };

  return <AddCompetitionPage onSubmit={onSubmit} defaultValues={defaultValues} loading={loading} />;
}
