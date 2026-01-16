import React, { FormEvent, ReactElement } from 'react';
import Container from '@mui/material/Container';

import { SubmitButton } from '../buttons';
import SectionContainer from './section-container/SectionContainer';
import { Stack } from '@mui/material';

interface Props {
  onSubmit: (formData: FormEvent) => void;
  resetBtn?: ReactElement;
  children: React.ReactNode;
  disabled?: boolean;
  submitText?: string;
  nonAbsoluteSubmit?: boolean;
  loading?: boolean;
}

export default function FormContainer({
  children,
  onSubmit,
  resetBtn,
  disabled,
  submitText = 'Submit',
  nonAbsoluteSubmit = false,
  loading,
}: Props) {
  const submitBtn = () => (
    <SubmitButton disabled={disabled} nonFixed={nonAbsoluteSubmit} loading={loading}>
      {submitText}
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
        <SectionContainer>{children}</SectionContainer>

        {resetBtn ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>{resetBtn}</div>
            <div>{submitBtn()}</div>
          </Stack>
        ) : (
          submitBtn()
        )}
      </form>
    </Container>
  );
}
