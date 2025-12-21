import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { REGISTER_USER } from '../graphql';
import { PAGES } from '../constants';
import { ISignUpInput } from '../types';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AUTH_ROLES } from '../../../constants';
import { PageContainer } from '../../../components';
import SignUpView from '../views/SignUpView.tsx';

export default function SignUpContainer() {
  const dispatch: AppDispatch = useDispatch();
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

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
    <PageContainer auth={AUTH_ROLES.NONE} title={PAGES.SIGN_UP_PAGE}>
      <SignUpView
        loading={loading}
        onSubmit={onSubmit}
        onAcceptTermsToggle={onAcceptTermsToggle}
        acceptTerms={acceptTerms}
        email={email}
        error={error}
      />
    </PageContainer>
  );
}
