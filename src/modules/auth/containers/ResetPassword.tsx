import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, showAlert } from '../../../store';
import { ResetPasswordFormData } from '../forms/reset-password/schema';
import { RESET_PASSWORD } from '../graphql';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import { AUTH_PATHS } from '../router';

export default function ResetPasswordContainer() {
  const { t } = useTranslation('auth');
  const { token } = useParams<{ token: string }>();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onError: () => dispatch(showAlert({ text: t('ALERTS.PASSWORD_RESET_FAIL'), type: 'error' })),
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: ResetPasswordFormData) => {
    resetPassword({ variables: { password: formData.password, token: token! } })
      .then(() => {
        dispatch(
          showAlert({
            text: t('ALERTS.PASSWORD_RESET_SUCCESS'),
            type: 'success',
          })
        );
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.PASSWORD_RESET_FAIL'), type: 'error' }));
      });
  };

  return <ResetPasswordPage loading={loading} onSubmit={onSubmit} />;
}
