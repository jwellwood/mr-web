import React, { FormEvent } from 'react';
import Container from '@mui/material/Container';
import { CustomButton, SubmitButton } from '../buttons';
import SectionContainer from './SectionContainer';
import { CustomTypography } from '../typography';

interface Props {
  onSubmit: (formData: FormEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
  background?: string;
  text?: string;
  nonAbsoluteSubmit?: boolean;
}

const FormContainer: React.FC<Props> = ({
  children,
  onSubmit,
  disabled,
  background = 'transparent',
  text = 'Submit',
  nonAbsoluteSubmit = false,
}) => {
  return (
    <Container maxWidth="sm" disableGutters style={{ marginBottom: '4px' }}>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          ev.stopPropagation();
          onSubmit(ev);
        }}
      >
        <SectionContainer background={background}>{children}</SectionContainer>
        {nonAbsoluteSubmit ? (
          <CustomButton type="submit" variant="contained" disabled={disabled} fullWidth>
            <CustomTypography color="secondary" bold>
              {text}
            </CustomTypography>
          </CustomButton>
        ) : (
          <SubmitButton disabled={disabled}>{text}</SubmitButton>
        )}
      </form>
    </Container>
  );
};

export default FormContainer;
