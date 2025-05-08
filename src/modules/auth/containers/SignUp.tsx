import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import ValidationEmailSent from '../components/ValidationEmailSent';
import { signUpFormState } from '../constants';
import SignUpForm from '../forms/SignUp.form';
import { REGISTER_USER } from '../graphql';
import { ISignUpForm } from '../types';
import { AppDispatch } from '../../../store/store';
import {showAlert} from "../../../store/features/alerts/alertsSlice.ts";
import {PageHeader} from "../../../components/typography";
import RouteGuard from '../../../router/RouteGuard.tsx';
import {AuthRoles} from "../../../constants.ts";
import {Spinner} from "../../../components/loaders";

const SignUpContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ISignUpForm | null>(null);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  useEffect(() => {
    setDefaultValues({ ...signUpFormState });
  }, []);

  const onAcceptTermsToggle = () => {
    setAcceptTerms(!acceptTerms);
  };

  const onSubmit = (formData: ISignUpForm) =>
    registerUser({ variables: { ...formData } })
      .then(({ data }) => {
        if (data) {
          const { user } = data;
          dispatch(showAlert({text: `Welcome ${user.username}!`, type: 'success'}))
          setEmail(user.email);
        }
      })
      .catch((err) => {
        dispatch(showAlert({text: err.message, type: 'error'}));
      });
  return (
    <>
      <PageHeader title="Sign Up" />
      <RouteGuard authorization={AuthRoles.NONE}>
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
