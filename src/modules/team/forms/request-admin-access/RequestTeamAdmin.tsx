import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../../components';
import { CustomStack } from '../../../../components/grids';
import { FormModal } from '../../../../components/modals';
import { useCustomParams, useUpdateAuth } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { REQUEST_TEAM_ADMIN_ACCESS } from '../../graphql';
import RequestAccessForm from './RequestAccessForm';
import { RequestAccessData } from './schema';

export default function RequestTeamAdmin() {
  const { t } = useTranslation('team');
  const { teamId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { updateAuth } = useUpdateAuth();

  const [requestAdminAccess, { loading }] = useMutation(REQUEST_TEAM_ADMIN_ACCESS, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (data: RequestAccessData) => {
    try {
      const res = await requestAdminAccess({
        variables: { teamId: teamId!, code: data.accessCode },
      });
      const token = res.data?.REQUEST_TEAM_ADMIN_ACCESS?.token;

      if (token) {
        await updateAuth(token);
      }

      dispatch(
        showAlert({
          text: t('ALERTS.ADMIN_ACCESS.SUCCESS'),
          type: 'success',
        })
      );

      setOpen(false);
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          text: t('ALERTS.ADMIN_ACCESS.ERROR', { error: (error as Error).message }),
          type: 'error',
        })
      );
    }
  };

  return (
    <CustomStack>
      {
        <CustomButton color="tertiary" onClick={() => setOpen(true)}>
          {t('FORM.REQUEST_ACCESS.TITLE')}
        </CustomButton>
      }
      <FormModal open={open} onClose={() => setOpen(false)} title={t('FORM.REQUEST_ACCESS.TITLE')}>
        <RequestAccessForm
          defaultValues={{ accessCode: '' }}
          onSubmit={onSubmit}
          loading={loading}
        />
      </FormModal>
    </CustomStack>
  );
}
