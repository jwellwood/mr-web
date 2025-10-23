import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_TEAM, FETCH_TEAM } from '../graphql/index.ts';
import { AUTH_ROLES } from '../../../app/constants.ts';
import { Spinner } from '../../../components/loaders/index.ts';
import { PageHeader } from '../../../components/typography/index.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { FETCH_TEAMS_BY_USER } from '../../profile/graphql/index.ts';
import { PROFILE } from '../../../router/paths.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { PAGES } from '../constants.ts';
import DeleteTeamForm from './components/DeleteTeamForm.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';

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
        navigate(PROFILE.PROFILE);
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  const renderContent = () => {
    return !loading && !deleteLoading && data ? (
      <DeleteTeamForm onSubmit={onDelete} defaultValues={undefined} teamName={data.team.teamName} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.DELETE_TEAM} />
      {error ? <ErrorGraphql error={error} /> : renderContent()}
    </RouteGuard>
  );
}
