import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { showAlert } from '../../../store';
import { FETCH_ORG_SEASONS } from '../../seasons/graphql';
import { FETCH_LEAGUE_TABLES } from '../../tables/graphql';
import { DELETE_RESULT, FETCH_RESULTS } from '../graphql';

interface Props {
  competitionId?: string;
}

export default function DeleteResult({ competitionId }: Props) {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId, resultId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteResult, { loading, error }] = useMutation(DELETE_RESULT, {
    refetchQueries: [
      { query: FETCH_ORG_SEASONS, variables: { orgId } },
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId, competitionId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId, compId: competitionId } },
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
