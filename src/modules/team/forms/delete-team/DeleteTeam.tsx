import { useMutation, useQuery } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../../components/modals';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import { FETCH_TEAMS_BY_USER } from '../../../profile/graphql';
import { PROFILE_PATHS } from '../../../profile/router';
import { DELETE_TEAM } from '../../graphql';

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
