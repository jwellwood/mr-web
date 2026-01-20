import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import { TypedFormError } from '../types';

interface Props {
  inputName: string;
  defaultValue?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: TypedFormError[];
}

export default function FileInput({ inputName, defaultValue, onChange, errors }: Props) {
  return (
    <>
      <TextField
        type="file"
        color="primary"
        name={inputName}
        defaultValue={defaultValue}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      {errors && errors.length ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
}
