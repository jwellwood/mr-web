import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { showAlert } from '../../../store';
import { FETCH_LEAGUE_TABLES, FETCH_RESULTS } from '../../results/graphql';
import { DELETE_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';

export default function DeleteOrgSeason() {
  const { t } = useTranslation('seasons');
  const { orgId, orgSeasonId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteOrgSeason, { loading, error }] = useMutation(DELETE_ORG_SEASON, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId } },
      { query: FETCH_ORG_SEASONS, variables: { orgId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId } },
    ],
    onError: () => dispatch(showAlert({ text: t('ALERTS.DELETE_SEASON.ERROR'), type: 'error' })),
  });

  const onDelete = async () => {
    return deleteOrgSeason({ variables: { orgId: orgId!, orgSeasonId: orgSeasonId! } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: t('ALERTS.DELETE_SEASON.SUCCESS'), type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.DELETE_SEASON.ERROR'), type: 'error' }));
      });
  };

  return (
    <DeleteModal title={t('PAGES.SEASON')} onDelete={onDelete} error={error} loading={loading} />
  );
}
