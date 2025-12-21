import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { EDIT_PASSWORD, FETCH_USER } from '../graphql';

import { PAGES } from '../constants.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AUTH_ROLES } from '../../../constants';
import { IChangePasswordInput } from '../types.ts';
import { changePasswordFormState } from '../forms/state.ts';
import { PROFILE_PATHS } from '../router/paths.ts';
import { PageContainer } from '../../../components';
import EditPasswordView from '../views/EditPasswordView.tsx';

export default function ChangePasswordContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editPassword, { loading }] = useMutation(EDIT_PASSWORD, {
    refetchQueries: [{ query: FETCH_USER }],
  });

  const onSubmit = async (data: IChangePasswordInput) => {
    return editPassword({
      variables: { password: data.password, newPassword: data.newPassword },
    })
      .then(() => {
        dispatch(showAlert({ text: 'Password changed successfully!', type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch(err => {
        console.error(err);
        dispatch(showAlert({ text: 'Something went wrong, please try again', type: 'error' }));
      });
  };

  return (
    <PageContainer auth={AUTH_ROLES.USER} title={PAGES.CHANGE_PASSWORD_PAGE}>
      <EditPasswordView
        onSubmit={onSubmit}
        defaultValues={changePasswordFormState}
        loading={loading}
      />
    </PageContainer>
  );
}
