import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SIGN_IN_USER } from '../../graphql';
import { PAGES } from '../../constants';
import { AppDispatch, showAlert, setAuth } from '../../../../store';
import { useAuth } from '../../../../hooks';
import { TAuthRoles } from '../../../../constants';
import { PageContainer } from '../../../../components';
import { PROFILE_PATHS } from '../../../profile/router';
import { authStorage } from '../../../../utils';
import type { SignInFormData } from './validation';
import SignInView from './SignInView';

export default function SignInContainer() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string | null>(null);
  const [signInUser, { loading, error }] = useMutation(SIGN_IN_USER);
  const [showResendLink, setShowResendLink] = useState(false);
  const { isAuth } = useAuth();

  const onSubmit = async (formData: SignInFormData) => {
    setEmail(formData.email);
    return signInUser({ variables: { ...formData } })
      .then(res => {
        if (res.data) {
          const { user } = res.data;
          dispatch(showAlert({ text: `Welcome ${user.username}!`, type: 'success' }));
          if (user?.token) {
            authStorage.setToken(user.token);
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
    <PageContainer title={PAGES.SIGN_IN_PAGE}>
      <SignInView
        loading={loading}
        email={email}
        onSubmit={onSubmit}
        showResendLink={showResendLink}
        error={error}
      />
    </PageContainer>
  );
}
