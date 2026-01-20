import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_TEAM, FETCH_TEAM } from '../../graphql';
import { FETCH_TEAMS_BY_USER } from '../../../profile/graphql';
import { AUTH_ROLES } from '../../../../constants';
import { useCustomParams } from '../../../../hooks';
import { PAGES } from '../../constants';
import { showAlert } from '../../../../store';
import { PageContainer } from '../../../../components';
import { PROFILE_PATHS } from '../../../profile/router';
import DeleteTeamView from './DeleteTeamView';

export default function DeleteTeam() {
  const { teamId } = useCustomParams();
  const { refetch } = useQuery(FETCH_TEAMS_BY_USER);
  const { loading, error, data } = useQuery(FETCH_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteTeam, { loading: deleteLoading }] = useMutation(DELETE_TEAM);

  const onDelete = async () => {
    return deleteTeam({ variables: { teamId } })
      .then(() => {
        refetch();
        dispatch(showAlert({ text: 'Team deleted', type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  return (
    <PageContainer auth={AUTH_ROLES.TEAM_ADMIN} title={PAGES.DELETE_TEAM}>
      <DeleteTeamView
        data={data}
        loading={loading || deleteLoading}
        onDelete={onDelete}
        error={error}
      />
    </PageContainer>
  );
}
