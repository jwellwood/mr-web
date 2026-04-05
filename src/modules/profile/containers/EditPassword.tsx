import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../../store';
import {
  changePasswordFormState,
  type ChangePasswordFormData,
} from '../forms/edit-password/schema';
import { EDIT_PASSWORD, FETCH_USER } from '../graphql';
import EditPasswordPage from '../pages/EditPasswordPage';
import { PROFILE_PATHS } from '../router';

export default function ChangePasswordContainer() {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editPassword, { loading }] = useMutation(EDIT_PASSWORD, {
    refetchQueries: [{ query: FETCH_USER }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.PASSWORD_CHANGED.ERROR'), type: 'error' })),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    return editPassword({
      variables: { password: data.password, newPassword: data.newPassword },
    })
      .then(() => {
        dispatch(showAlert({ text: t('ALERTS.PASSWORD_CHANGED.SUCCESS'), type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.PASSWORD_CHANGED.ERROR'), type: 'error' }));
      });
  };

  return (
    <EditPasswordPage
      onSubmit={onSubmit}
      loading={loading}
      defaultValues={changePasswordFormState}
    />
  );
}
