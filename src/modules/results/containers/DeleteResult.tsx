import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { showAlert } from '../../../store';
import { FETCH_ORG_SEASONS } from '../../seasons/graphql';
import { DELETE_RESULT, FETCH_LEAGUE_TABLES, FETCH_RESULTS } from '../graphql';

export default function DeleteResult() {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId, resultId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteResult, { loading, error }] = useMutation(DELETE_RESULT, {
    refetchQueries: [
      { query: FETCH_ORG_SEASONS, variables: { orgId } },
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId } },
    ],
    awaitRefetchQueries: true,
  });

  const onDelete = async () => {
    return deleteResult({ variables: { orgId: orgId!, resultId: resultId! } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: t('ALERTS.DELETE.SUCCESS'), type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.DELETE.ERROR'), type: 'error' }));
      });
  };

  return (
    <DeleteModal title={t('PAGES.RESULT')} onDelete={onDelete} error={error} loading={loading} />
  );
}
