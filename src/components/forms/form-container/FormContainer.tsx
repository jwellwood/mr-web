import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import React, { ReactElement } from 'react';
import { TApolloError } from '../../../types/apollo';
import { SubmitButton } from '../../buttons';
import { SectionContainer } from '../../containers';
import { MutationError } from '../../errors';
import { Spinner } from '../../loaders';

interface ISubmitButton {
  text?: string;
  disabled?: boolean;
}

interface Props {
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  submitBtn?: ISubmitButton;
  resetBtn?: ReactElement;
  loading: boolean;
  error?: TApolloError;
  minWidth?: number;
}

export default function FormContainer({
  children,
  onSubmit,
  resetBtn,
  submitBtn = {
    text: 'Submit',
    disabled: false,
  },
  loading,
  error,
  minWidth,
}: Props) {
  const submitButton = () => (
    <SubmitButton disabled={submitBtn?.disabled} loading={loading}>
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
            <Stack direction="column" spacing={1} width={'100%'} minWidth={minWidth || 300}>
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
