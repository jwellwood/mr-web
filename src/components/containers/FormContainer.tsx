import React, { FormEvent } from 'react';
import Container from '@mui/material/Container';
import { CustomButton, SubmitButton } from '../buttons';
import SectionContainer from './SectionContainer';

interface Props {
  onSubmit: (formData: FormEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
  text?: string;
  nonAbsoluteSubmit?: boolean;
}

const FormContainer: React.FC<Props> = ({
  children,
  onSubmit,
  disabled,
  text = 'Submit',
  nonAbsoluteSubmit = false,
}) => {
  return (
    <Container maxWidth="sm" disableGutters style={{ marginBottom: '4px' }}>
      <form onSubmit={onSubmit}>
        <SectionContainer>{children}</SectionContainer>
        {nonAbsoluteSubmit ? (
          <CustomButton type="submit" variant="contained" disabled={disabled} fullWidth>
            {text}
          </CustomButton>
        ) : (
          <SubmitButton disabled={disabled}>{text}</SubmitButton>
        )}
      </form>
    </Container>
  );
};

export default FormContainer;
