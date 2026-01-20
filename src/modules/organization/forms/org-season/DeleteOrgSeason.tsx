import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_ORG_SEASON, FETCH_ORG_SEASONS } from '../../graphql';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import DeleteModal from '../../../../components/modals/DeleteModal';

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

  return !loading ? <DeleteModal title="Season" onDelete={onDelete} error={error} /> : <Spinner />;
}
