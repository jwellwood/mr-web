import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../../../hooks';
import { AppDispatch, showAlert } from '../../../../../store';
import { SET_TEAM_ADMIN_ACCESS_CODE } from '../graphql';
import SetAdminAccessCodeForm from './SetAdminAccessCodeForm';
import { SetAdminAccessCodeData } from './validation';

export default function SetAdminAccessCode() {
  const { teamId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [setAdminAccessCode, { loading }] = useMutation(SET_TEAM_ADMIN_ACCESS_CODE, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (data: SetAdminAccessCodeData) => {
    try {
      await setAdminAccessCode({ variables: { teamId: teamId!, code: data.accessCode } });
      dispatch(
        showAlert({
          text: 'Admin access code set successfully',
          type: 'success',
        })
      );

      setOpen(false);
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          text: 'Failed to set admin access code',
          type: 'error',
        })
      );
    }
  };

  return (
    <SetAdminAccessCodeForm
      open={open}
      setOpen={setOpen}
      defaultValues={{ accessCode: '' }}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}
