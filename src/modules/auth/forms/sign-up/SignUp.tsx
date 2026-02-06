import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { REGISTER_USER } from '../../graphql';
import { PAGES } from '../../constants';
import { AppDispatch, showAlert } from '../../../../store';
import { PageContainer } from '../../../../components';
import type { SignUpFormData } from './validation';
import SignUpView from './SignUpView';

export default function SignUpContainer() {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string | null>(null);
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const onSubmit = (formData: SignUpFormData) =>
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
    <PageContainer title={PAGES.SIGN_UP_PAGE}>
      <SignUpView loading={loading} onSubmit={onSubmit} email={email} error={error} />
    </PageContainer>
  );
}
