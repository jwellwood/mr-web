import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import FormErrorMessage from './FormErrorMessage';
import { FormError } from './types';

interface Props {
  inputName: string;
  defaultValue?: string; //TODO
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: FormError[]; //TODO
}

const FileInput: React.FC<Props> = ({ inputName, defaultValue, onChange, errors }) => {
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
};

export default FileInput;
