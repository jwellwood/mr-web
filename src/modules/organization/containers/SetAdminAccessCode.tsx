import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { SetAdminAccessCodeData } from '../forms/set-admin-access/schema';
import SetAdminAccessCodeForm from '../forms/set-admin-access/SetAdminAccessCodeForm';
import { SET_TEAM_ADMIN_ACCESS_CODE } from '../graphql';

export default function SetAdminAccessCode() {
  const { t } = useTranslation('organization');
  const { teamId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [setAdminAccessCode, { loading }] = useMutation(SET_TEAM_ADMIN_ACCESS_CODE, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (data: SetAdminAccessCodeData) => {
    try {
      await setAdminAccessCode({ variables: { teamId: teamId!, code: data.accessCode } });
      dispatch(showAlert({ text: t('ALERTS.SET_ADMIN_ACCESS_CODE.SUCCESS'), type: 'success' }));
      setOpen(false);
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.SET_ADMIN_ACCESS_CODE.ERROR'), type: 'error' }));
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
