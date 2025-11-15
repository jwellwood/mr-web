import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import ValidationEmailSent from '../components/ValidationEmailSent';
import { pages, SIGN_UP_LINKS } from '../constants';
import SignUpForm from '../forms/SignUp.form';
import { REGISTER_USER } from '../graphql';
import { ISignUpInput } from '../types';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import AuthLayout from '../components/AuthLayout.tsx';
import AuthorizationLinks from '../components/AuthorizationLinks.tsx';
import { signUpFormState } from '../forms/state.ts';
import { PageHeader } from '../../../components';

export default function SignUpContainer() {
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ISignUpInput | null>(null);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  useEffect(() => {
    setDefaultValues({ ...signUpFormState });
  }, []);

  const onAcceptTermsToggle = () => {
    setAcceptTerms(!acceptTerms);
  };

  const onSubmit = (formData: ISignUpInput) =>
    registerUser({ variables: { ...formData } })
      .then(({ data }) => {
        if (data) {
          const { user } = data;
          dispatch(showAlert({ text: `Welcome ${user.username}!`, type: 'success' }));
          setEmail(user.email);
        }
      })
      .catch(err => {
        dispatch(showAlert({ text: err.message, type: 'error' }));
      });
  return (
    <>
      <RouteGuard authorization={AuthRoles.NONE}>
        <PageHeader title={pages.SIGN_UP_PAGE}>
          <AuthLayout>
            <>
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
              <AuthorizationLinks links={SIGN_UP_LINKS} />
            </>
          </AuthLayout>
        </PageHeader>
      </RouteGuard>
    </>
  );
}
