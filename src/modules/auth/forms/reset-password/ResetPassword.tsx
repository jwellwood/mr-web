import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../../components';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { RESET_PASSWORD } from '../../graphql';
import { AUTH_PATHS } from '../../router';
import ResetPasswordView from './ResetPasswordView';
import { ResetPasswordFormData } from './validation';

export default function ResetPasswordContainer() {
  const { token } = useParams<{ token: string }>();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: ResetPasswordFormData) => {
    resetPassword({ variables: { password: formData.password, token: token! } })
      .then(() => {
        dispatch(
          showAlert({
            text: 'Password has been reset! Use your new password to sign in',
            type: 'success',
          })
        );
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(err => {
        dispatch(showAlert({ text: err.message, type: 'error' }));
      });
  };

  return (
    <PageContainer title={PAGES.RESET_PASSWORD_PAGE}>
      <ResetPasswordView loading={loading} onSubmit={onSubmit} />
    </PageContainer>
  );
}
