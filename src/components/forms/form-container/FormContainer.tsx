import React, { FormEvent, ReactElement } from 'react';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';

import { SectionContainer } from '../../containers';
import SubmitButton from '../submit-button/SubmitButton';
import FormLoading from './FormLoading';
import { ApolloError } from '@apollo/client';
import { MutationError } from '../../errors';

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
  height?: string;
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
  height = 'calc(100vh - 200px)',
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
            <FormLoading height={height} />
          ) : (
            <Stack direction="column" spacing={1} minWidth={300}>
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
