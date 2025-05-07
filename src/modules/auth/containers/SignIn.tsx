import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import { useAuth } from 'hooks';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import { PROFILE } from 'router/paths';
import RouteGuard from 'router/RouteGuard';
import { setAuth } from '../actions/auth.actions';
import { signInFormState } from '../constants';
import SignInForm from '../forms/SignIn.form';
import { SIGN_IN } from '../graphql';
import { ISignInForm } from '../types';
import ResendVerification from './ResendVerification';

const SignInContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ISignInForm>(null);
  const [email, setEmail] = useState(null);
  const [signInUser, { loading }] = useMutation(SIGN_IN);
  const [showResendLink, setShowResendLink] = useState(false);
  const { isAuth } = useAuth();

  useEffect(() => {
    setDefaultValues({ ...signInFormState });
  }, []);

  const onSubmit = async (formData) => {
    setEmail(formData.email);
    return signInUser({ variables: { ...formData } })
      .then(({ data }) => {
        if (data) {
          const { user } = data;
          dispatch(showAlert(`Welcome ${user.username}!`, 'success'));
          dispatch(setAuth(user.roles, user.teamIds, user.orgIds));
          if (isAuth) {
            navigate(PROFILE.PROFILE, { replace: false });
          }
        }
      })
      .catch((err) => {
        if (err.message === 'Unverified User') {
          setShowResendLink(true);
        }
        dispatch(showAlert(err.message, 'error'));
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
