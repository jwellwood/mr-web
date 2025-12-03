import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import DeleteModal from '../../../components/modals/DeleteModal.tsx';

export default function DeleteOrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteOrgSeason, { loading, error }] = useMutation(DELETE_ORG_SEASON, {
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  });

  const onDelete = async () => {
    return deleteOrgSeason({ variables: { orgId, orgSeasonId } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: 'Season deleted', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  const renderContent = () => {
    return !loading ? <DeleteModal title="Season" onDelete={onDelete} /> : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
