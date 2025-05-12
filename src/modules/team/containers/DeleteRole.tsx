import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_ROLE, GET_TEAM } from '../graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { DeleteModal } from '../../../components/modals';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';

interface Props {
  roleId: string;
  children: ReactElement;
}

const DeleteRole: React.FC<Props> = ({ roleId }) => {
  const { teamId } = useCustomParams();
  const dispatch = useDispatch();
  const { loading, refetch } = useQuery(GET_TEAM, {
    variables: { teamId: teamId },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteTeamRole, { error, loading: deleteLoading }] = useMutation(DELETE_ROLE);

  const onDeleteRole = () => {
    deleteTeamRole({ variables: { teamId, roleId } })
      .then(() => {
        refetch({ teamId });
        dispatch(
          showAlert({
            text: 'Deleted role',
            type: 'success',
          })
        );
      })
      .catch(() => {
        dispatch(
          showAlert({
            text: 'Error deleting role',
            type: 'error',
          })
        );
      });
  };

  if (error) return <ErrorGraphql error={error} />;

  return <DeleteModal title="Role" loading={loading || deleteLoading} onDelete={onDeleteRole} />;
};

export default DeleteRole;
