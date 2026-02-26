import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../../components/modals';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import { FETCH_RESULTS } from '../../results/graphql';
import { FETCH_LEAGUE_TABLES } from '../../tables/graphql';
import { DELETE_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';

export default function DeleteOrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteOrgSeason, { loading, error }] = useMutation(DELETE_ORG_SEASON, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId } },
      { query: FETCH_ORG_SEASONS, variables: { orgId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId } },
    ],
  });

  const onDelete = async () => {
    return deleteOrgSeason({ variables: { orgId: orgId!, orgSeasonId: orgSeasonId! } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: 'Season deleted successfully!', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  return <DeleteModal title="Season" onDelete={onDelete} error={error} loading={loading} />;
}
