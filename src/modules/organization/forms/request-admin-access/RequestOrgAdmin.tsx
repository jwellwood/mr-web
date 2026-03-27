import { useApolloClient, useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../../components';
import { CustomStack } from '../../../../components/grids';
import { FormModal } from '../../../../components/modals';
import { TAuthRoles } from '../../../../constants';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, setAuth, showAlert } from '../../../../store';
import { authStorage } from '../../../../utils';
import { FETCH_USER } from '../../../profile/graphql';
import { REQUEST_ORG_ADMIN_ACCESS } from '../../graphql';
import RequestAccessForm from './RequestAccessForm';
import { RequestAccessData } from './validation';

export default function RequestOrgAdmin() {
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

      dispatch(
        showAlert({
          text: 'Admin access requested successfully',
          type: 'success',
        })
      );

      setOpen(false);
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          text: 'Failed to request admin access',
          type: 'error',
        })
      );
    }
  };

  return (
    <CustomStack>
      {
        <CustomButton color="tertiary" onClick={() => setOpen(true)}>
          Request Admin Access
        </CustomButton>
      }
      <FormModal open={open} onClose={() => setOpen(false)} title="Request Admin Access">
        <RequestAccessForm
          defaultValues={{ accessCode: '' }}
          onSubmit={onSubmit}
          loading={loading}
        />
      </FormModal>
    </CustomStack>
  );
}
