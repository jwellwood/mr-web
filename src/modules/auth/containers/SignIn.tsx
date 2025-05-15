import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { signInFormState } from '../constants';
import SignInForm from '../forms/SignIn.form';
import { SIGN_IN } from '../graphql';
import { ISignInForm } from '../types';
import ResendVerification from './ResendVerification';
import PageHeader from '../../../components/typography/PageHeader';
import { AppDispatch } from '../../../store/store';
import { useAuth } from '../../../hooks';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { PROFILE } from '../../../router/paths.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../app/constants.ts';
import { Spinner } from '../../../components/loaders';
import { setAuth } from '../../../store/features/auth/authSlice.ts';

const SignInContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ISignInForm | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [signInUser, { loading }] = useMutation(SIGN_IN);
  const [showResendLink, setShowResendLink] = useState(false);
  const { isAuth } = useAuth('Sign in');

  useEffect(() => {
    setDefaultValues({ ...signInFormState });
  }, []);

  const onSubmit = async (formData: { email: string }) => {
    setEmail(formData.email);
    return signInUser({ variables: { ...formData } })
      .then(resp => {
        const { data } = resp;
        if (data) {
          const { user } = data;
          dispatch(showAlert({ text: `Welcome ${user.username}!`, type: 'success' }));
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
      <PageHeader title="Sign In" />
      <RouteGuard authorization={AUTH_ROLES.NONE}>
        {!loading && defaultValues ? (
          <SignInForm defaultValues={defaultValues} onSubmit={onSubmit} />
        ) : (
          <Spinner />
        )}
        {showResendLink && <ResendVerification email={email} />}
      </RouteGuard>
    </>
  );
};

export default SignInContainer;
