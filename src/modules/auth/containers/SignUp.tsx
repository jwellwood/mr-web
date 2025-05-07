import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import ValidationEmailSent from '../components/ValidationEmailSent';
import { signUpFormState } from '../constants';
import SignUpForm from '../forms/SignUp.form';
import { REGISTER_USER } from '../graphql';
import { ISignUpForm } from '../types';

const SignUpContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ISignUpForm>(null);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  useEffect(() => {
    setDefaultValues({ ...signUpFormState });
  }, []);

  const onAcceptTermsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(!acceptTerms);
  };

  const onSubmit = (formData: ISignUpForm) =>
    registerUser({ variables: { ...formData } })
      .then(({ data }) => {
        if (data) {
          const { user } = data;
          dispatch(showAlert(`Welcome ${user.username}!`, 'success'));
          setEmail(user.email);
        }
      })
      .catch((err) => {
        dispatch(showAlert(err.message, 'error'));
      });
  return (
    <>
      <PageHeader title="Sign Up" />
      <RouteGuard authorization={AUTH_ROLES.NONE}>
        {!loading && defaultValues ? (
          <SignUpForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            onAcceptTermsToggle={onAcceptTermsToggle}
            acceptTerms={acceptTerms}
          />
        ) : (
          <Spinner />
        )}
        {email ? <ValidationEmailSent email={email} /> : null}
      </RouteGuard>
    </>
  );
};

export default SignUpContainer;
