import React, { FormEvent, ReactElement } from 'react';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';

import { SectionContainer } from '../../containers';
import SubmitButton from '../submit-button/SubmitButton';
import { ApolloError } from '@apollo/client';
import { MutationError } from '../../errors';
import { Spinner } from '../../loaders';

interface ISubmitButton {
  text?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

interface Props {
  onSubmit: (formData: FormEvent) => void;
  children: React.ReactNode;
  submitBtn?: ISubmitButton;
  resetBtn?: ReactElement;
  loading: boolean;
  error?: ApolloError;
}

export default function FormContainer({
  children,
  onSubmit,
  resetBtn,
  submitBtn = {
    text: 'Submit',
    disabled: false,
    fullWidth: true,
  },
  loading,
  error,
}: Props) {
  const submitButton = () => (
    <SubmitButton
      disabled={submitBtn?.disabled}
      loading={loading}
      fullWidth={submitBtn?.fullWidth || true}
    >
      {submitBtn?.text}
    </SubmitButton>
  );

  return (
    <Container maxWidth="sm" disableGutters style={{ marginBottom: '4px' }}>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          ev.stopPropagation();
          onSubmit(ev);
        }}
      >
        <SectionContainer>
          {loading ? (
            <Spinner />
          ) : (
            <Stack direction="column" spacing={1} width={'100%'}>
              {children}
            </Stack>
          )}
          {error && <MutationError error={error} />}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px',
            }}
          >
            {resetBtn && <>{resetBtn}</>}
            <>{submitButton()}</>
          </Stack>
        </SectionContainer>
      </form>
    </Container>
  );
}
