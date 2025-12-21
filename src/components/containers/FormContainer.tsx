import React, { FormEvent } from 'react';
import Container from '@mui/material/Container';

import { SubmitButton } from '../buttons';
import SectionContainer from './section-container/SectionContainer';

interface Props {
  onSubmit: (formData: FormEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
  text?: string;
  nonAbsoluteSubmit?: boolean;
  loading?: boolean;
}

export default function FormContainer({
  children,
  onSubmit,
  disabled,
  text = 'Submit',
  nonAbsoluteSubmit = false,
  loading,
}: Props) {
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

        <SubmitButton disabled={disabled} nonFixed={nonAbsoluteSubmit} loading={loading}>
          {text}
        </SubmitButton>
      </form>
    </Container>
  );
}
