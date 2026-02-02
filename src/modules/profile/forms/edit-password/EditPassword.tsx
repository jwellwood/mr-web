import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { EDIT_PASSWORD, FETCH_USER } from '../../graphql';
import { PAGES } from '../../constants';
import { showAlert } from '../../../../store';
import { AUTH_ROLES } from '../../../../constants';
import { changePasswordFormState } from './state';
import { PROFILE_PATHS } from '../../router';
import { PageContainer } from '../../../../components';
import type { ChangePasswordFormData } from './validation';
import EditPasswordForm from './EditPasswordForm';

export default function ChangePasswordContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editPassword, { loading, error }] = useMutation(EDIT_PASSWORD, {
    refetchQueries: [{ query: FETCH_USER }],
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
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
      <EditPasswordForm
        onSubmit={onSubmit}
        defaultValues={changePasswordFormState}
        loading={loading}
        error={error}
      />
    </PageContainer>
  );
}
