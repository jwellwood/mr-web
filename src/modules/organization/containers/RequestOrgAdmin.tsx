import { useApolloClient, useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { FormModal } from '../../../components/modals';
import { TAuthRoles } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, setAuth, showAlert } from '../../../store';
import { authStorage } from '../../../utils';
import { FETCH_USER } from '../../profile/graphql';
import RequestAccessForm from '../forms/request-admin-access/RequestAccessForm';
import { RequestAccessData } from '../forms/request-admin-access/schema';
import { REQUEST_ORG_ADMIN_ACCESS } from '../graphql';

export default function RequestOrgAdmin() {
  const { t } = useTranslation('organization');
  const client = useApolloClient();
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

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
        authStorage.setToken(token);
        await client.clearStore();
        const userRes = await client.query({
          query: FETCH_USER,
          fetchPolicy: 'network-only',
        });
        const user = userRes.data?.user;

        if (user) {
          dispatch(
            setAuth({
              roles: user.roles as TAuthRoles[],
              teamIds: user.teamIds,
              orgIds: user.orgIds,
              username: user.username,
            })
          );
        }
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
