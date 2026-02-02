import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_TEAM } from '../../graphql';
import { FETCH_TEAMS_BY_USER } from '../../../profile/graphql';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import { PROFILE_PATHS } from '../../../profile/router';
import { DeleteModal } from '../../../../components/modals';

export default function DeleteTeam() {
  const { teamId } = useCustomParams();
  const { refetch } = useQuery(FETCH_TEAMS_BY_USER);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteTeam, { loading, error }] = useMutation(DELETE_TEAM);

  const onDelete = async () => {
    return deleteTeam({ variables: { teamId: teamId! } })
      .then(() => {
        refetch();
        dispatch(showAlert({ text: 'Team deleted', type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  return <DeleteModal title="Team" onDelete={onDelete} error={error} loading={loading} />;
}
