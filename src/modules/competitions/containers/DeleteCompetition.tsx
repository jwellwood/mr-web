import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { showAlert } from '../../../store';
import { DELETE_COMPETITION, FETCH_COMPETITIONS } from '../graphql';

export default function DeleteCompetition() {
  const { t } = useTranslation('competitions');
  const { orgId, competitionId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteCompetition, { loading, error }] = useMutation(DELETE_COMPETITION, {
    refetchQueries: [{ query: FETCH_COMPETITIONS, variables: { orgId } }],
    onError: () => {
      dispatch(showAlert({ text: t('ALERTS.DELETE_COMPETITION.ERROR'), type: 'error' }));
    },
  });

  const onDelete = async () => {
    return deleteCompetition({ variables: { orgId: orgId!, competitionId: competitionId! } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: t('ALERTS.DELETE_COMPETITION.SUCCESS'), type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.DELETE_COMPETITION.ERROR'), type: 'error' }));
      });
  };

  return (
    <DeleteModal
      title={t('PAGES.COMPETITION')}
      onDelete={onDelete}
      error={error}
      loading={loading}
    />
  );
}
