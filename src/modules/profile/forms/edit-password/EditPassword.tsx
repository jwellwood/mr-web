import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../../components';
import { showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { EDIT_PASSWORD, FETCH_USER } from '../../graphql';
import { PROFILE_PATHS } from '../../router';
import EditPasswordForm from './EditPasswordForm';
import { changePasswordFormState } from './state';
import type { ChangePasswordFormData } from './validation';

export default function ChangePasswordContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editPassword, { loading }] = useMutation(EDIT_PASSWORD, {
    refetchQueries: [{ query: FETCH_USER }],
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
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
        dispatch(showAlert({ text: err.message, type: 'error' }));
      });
  };

  return (
    <PageContainer title={PAGES.CHANGE_PASSWORD_PAGE}>
      <EditPasswordForm
        onSubmit={onSubmit}
        defaultValues={changePasswordFormState}
        loading={loading}
      />
    </PageContainer>
  );
}
