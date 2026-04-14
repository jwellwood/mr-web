import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { FormModal } from '../../../components/modals';
import { useCustomParams, useUpdateAuth } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import RequestAccessForm from '../forms/request-admin-access/RequestAccessForm';
import { RequestAccessData } from '../forms/request-admin-access/schema';
import { REQUEST_ORG_ADMIN_ACCESS } from '../graphql';

export default function RequestOrgAdmin() {
  const { t } = useTranslation('organization');
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { updateAuth } = useUpdateAuth();

  const [requestAdminAccess, { loading }] = useMutation(REQUEST_ORG_ADMIN_ACCESS, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (data: RequestAccessData) => {
    try {
      const res = await requestAdminAccess({
        variables: { orgId: orgId!, code: data.accessCode },
      });
      const token = res.data?.REQUEST_ORG_ADMIN_ACCESS?.token;

      if (token) {
        await updateAuth(token);
      }

      dispatch(showAlert({ text: t('ALERTS.REQUEST_ADMIN.SUCCESS'), type: 'success' }));

      setOpen(false);
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.REQUEST_ADMIN.ERROR'), type: 'error' }));
    }
  };

  return (
    <CustomStack>
      {
        <CustomButton color="tertiary" onClick={() => setOpen(true)}>
          {t('BUTTONS.REQUEST_ADMIN_ACCESS')}
        </CustomButton>
      }
      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title={t('MODALS.REQUEST_ADMIN_ACCESS')}
      >
        <RequestAccessForm
          defaultValues={{ accessCode: '' }}
          onSubmit={onSubmit}
          loading={loading}
        />
      </FormModal>
    </CustomStack>
  );
}
