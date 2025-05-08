import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TEAM, UPDATE_ROLES } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import { ITeamRoles } from '../../../types';
import {initialRoleState, PAGES, TeamError, TeamSuccess} from '../constants';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from "../../../router/RouteGuard.tsx";
import PageHeader from '../../../components/typography/PageHeader.tsx';
import {AuthRoles} from "../../../constants.ts";
import UpdateTeamRolesForm from '../forms/UpdateTeamRoles.form.tsx';
import RolesList from "../components/RolesList.tsx";
import {Spinner} from "../../../components/loaders";

function UpdateRoles() {
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
        dispatch(showAlert({text: TeamSuccess.edit, type: 'success'}));
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showAlert({text: TeamError.edit, type: 'error'}));
      });
  };

  if (error || updateError)
    return <ErrorGraphql error={[error, updateError]} />;
  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN} >
      <PageHeader title={PAGES.EDIT_ROLES} />
      {!loading && !updateLoading ? (
        <>
          <UpdateTeamRolesForm
            defaultValues={initialRoleState}
            onSubmit={onSubmit}
          />
          <RolesList team={data?.team} />
        </>
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default UpdateRoles;
