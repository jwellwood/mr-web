import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TAuthRoles } from '../../../constants';
import { useAuth } from '../../../hooks';
import { AppDispatch, showAlert, setAuth } from '../../../store';
import { authStorage } from '../../../utils';
import { PROFILE_PATHS } from '../../profile/router';
import { SignInFormData } from '../forms/sign-in/schema';
import { SIGN_IN_USER } from '../graphql';
import SignInPage from '../pages/SignInPage';

export default function SignInContainer() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string | null>(null);
  const [signInUser, { loading }] = useMutation(SIGN_IN_USER, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });
  const [showResendLink, setShowResendLink] = useState(false);
  const { isAuth } = useAuth();

  const onSubmit = async (formData: SignInFormData) => {
    setEmail(formData.email);
    return signInUser({ variables: { ...formData } })
      .then(res => {
        if (res.data) {
          const { token, user } = res.data.user;
          dispatch(
            showAlert({ text: t('MESSAGES.WELCOME', { username: user.username }), type: 'success' })
          );
          if (token) {
            authStorage.setToken(token);
          }
          dispatch(
            setAuth({
              roles: user.roles as TAuthRoles[],
              teamIds: user.teamIds,
              orgIds: user.orgIds,
              username: user.username,
            })
          );
          if (isAuth) {
            navigate(PROFILE_PATHS.PROFILE, { replace: false });
          }
        }
      })
      .catch(err => {
        if (err.message === 'Unverified User') {
          setShowResendLink(true);
        }
        dispatch(showAlert({ text: err.message, type: 'error' }));
      });
  };

  return (
    <SignInPage
      loading={loading}
      onSubmit={onSubmit}
      showResendLink={showResendLink}
      email={email}
    />
  );
}
