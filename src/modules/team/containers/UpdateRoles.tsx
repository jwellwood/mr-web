import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { ITeamRoles } from 'types';
import RolesList from '../components/RolesList';
import { PAGES, TeamError, TeamSuccess, initialRoleState } from '../constants';
import UpdateTeamRolesForm from '../forms/UpdateTeamRoles.form';
import { GET_TEAM, UPDATE_ROLES } from '../graphql';

const UpdateRoles: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const [updateTeamRoles, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_ROLES);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (formData: Partial<ITeamRoles>) => {
    updateTeamRoles({ variables: { teamId, ...formData } })
      .then(() => {
        refetch({ teamId });
        dispatch(showAlert(TeamSuccess.edit, 'success'));
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showAlert(TeamError.edit, 'error'));
      });
  };

  if (error || updateError)
    return <ErrorGraphql error={[error, updateError]} />;
  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.EDIT_ROLES} />
      {!loading && !updateLoading ? (
        <>
          <UpdateTeamRolesForm
            defaultValues={initialRoleState}
            onSubmit={onSubmit}
          />
          <RolesList team={data.team} />
        </>
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default UpdateRoles;
