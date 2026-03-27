import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import { TApolloError } from '../../../types/apollo';
import { CustomButton } from '../../buttons';
import { SectionContainer } from '../../containers';
import { MutationError } from '../../errors';
import { Spinner } from '../../loaders';
import SubmitButton from '../submit-button/SubmitButton';

interface ISubmitButton {
  text?: string;
  disabled?: boolean;
  confirm?: {
    show?: boolean;
    title?: string;
    content?: React.ReactNode;
    confirmText?: string;
  };
}

interface Props {
  onSubmit: (ev?: React.SubmitEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  submitBtn?: ISubmitButton;
  onReset?: () => void;
  loading: boolean;
  error?: TApolloError;
  minWidth?: number;
}

export default function FormContainer({
  children,
  onSubmit,
  onReset,
  submitBtn = {
    text: 'Submit',
    disabled: false,
  },
  loading,
  error,
  minWidth,
}: Props) {
  const handleSubmit = (ev?: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    if (ev && 'preventDefault' in ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    onSubmit();
  };

  const handleReset = (ev?: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    if (ev && 'preventDefault' in ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    onReset?.();
  };

  return (
    <Container maxWidth="sm" disableGutters style={{ marginBottom: '4px' }}>
      <form
        onSubmit={ev => {
          handleSubmit(ev);
        }}
        onReset={handleReset}
      >
        <SectionContainer type="form">
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
            {onReset && (
              <CustomButton onClick={handleReset} color="warning" variant="text">
                Reset
              </CustomButton>
            )}
            <SubmitButton
              disabled={submitBtn?.disabled}
              loading={loading}
              onClick={handleSubmit}
              confirm={submitBtn?.confirm}
            >
              {submitBtn?.text}
            </SubmitButton>
          </Stack>
        </SectionContainer>
      </form>
    </Container>
  );
}
