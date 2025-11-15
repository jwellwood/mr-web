import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SIGN_IN_LINKS, pages } from '../constants';
import SignInForm from '../forms/SignIn.form';
import { SIGN_IN_USER } from '../graphql';
import { ISignInInput } from '../types';
import ResendVerification from './ResendVerification';
import { AppDispatch } from '../../../store/store';
import { useAuth } from '../../../hooks';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { PROFILE } from '../../../router/routes/paths.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../app/constants.ts';
import { Spinner } from '../../../components/loaders';
import { setAuth } from '../../../store/features/auth/authSlice.ts';
import AuthLayout from '../components/AuthLayout.tsx';
import AuthorizationLinks from '../components/AuthorizationLinks.tsx';
import { signInFormState } from '../forms/state.ts';
import { PageHeader } from '../../../components';

export default function SignInContainer() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ISignInInput | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [signInUser, { loading }] = useMutation(SIGN_IN_USER);
  const [showResendLink, setShowResendLink] = useState(false);
  const { isAuth } = useAuth();

  useEffect(() => {
    setDefaultValues({ ...signInFormState });
  }, []);

  const onSubmit = async (formData: { email: string }) => {
    setEmail(formData.email);
    return signInUser({ variables: { ...formData } })
      .then(res => {
        if (res.data) {
          const { user } = res.data;
          dispatch(showAlert({ text: `Welcome ${user.username}!`, type: 'success' }));
          if (user?.token) {
            localStorage.setItem('token', user.token);
          }
          dispatch(
            setAuth({
              roles: user.roles,
              teamIds: user.teamIds,
              orgIds: user.orgIds,
            })
          );
          if (isAuth) {
            navigate(PROFILE.PROFILE, { replace: false });
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
    <>
      <RouteGuard authorization={AUTH_ROLES.NONE}>
        <PageHeader title={pages.SIGN_IN_PAGE}>
          <AuthLayout>
            <>
              {!loading && defaultValues ? (
                <SignInForm defaultValues={defaultValues} onSubmit={onSubmit} />
              ) : (
                <Spinner />
              )}
              {showResendLink && <ResendVerification email={email} />}
              <AuthorizationLinks links={SIGN_IN_LINKS} />
            </>
          </AuthLayout>
        </PageHeader>
      </RouteGuard>
    </>
  );
}
