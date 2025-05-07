import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteModal } from 'components/modals';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { DELETE_ROLE, GET_TEAM } from '../graphql';

interface Props {
  roleId: string;
  children: ReactElement;
}

const DeleteRole: React.FC<Props> = ({ roleId, children }) => {
  const { teamId } = useCustomParams();
  const dispatch = useDispatch();
  const { loading, refetch } = useQuery(GET_TEAM, {
    variables: { teamId: teamId },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteTeamRole, { error, loading: deleteLoading }] =
    useMutation(DELETE_ROLE);

  const onDeleteRole = () => {
    deleteTeamRole({ variables: { teamId, roleId } })
      .then((res) => {
        refetch({ teamId });
        dispatch(showAlert('Deleted role', 'success'));
      })
      .catch(() => {
        dispatch(showAlert('Error deleting role', 'error'));
      });
  };

  if (error) return <ErrorGraphql error={[error]} />;

  return (
    <DeleteModal
      title="Role"
      loading={loading || deleteLoading}
      onDelete={onDeleteRole}
    />
  );
};

export default DeleteRole;
