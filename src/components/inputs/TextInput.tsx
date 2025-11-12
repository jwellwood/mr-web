import React from 'react';
import TextField from '@mui/material/TextField';
import FormErrorMessage from './FormErrorMessage';
import { FormControl } from '@mui/material';
import { FormError } from './types';

interface Props {
  inputName?: string;
  defaultValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: FormError[]; // TODO
  isPassword?: boolean;
  isEmail?: boolean;
  multiline?: boolean;
  role?: string;
  disabled?: boolean;
  placeholder?: string;
}

const TextInput: React.FC<Props> = ({
  inputName,
  defaultValue,
  onChange,
  label,
  errors,
  isPassword,
  multiline,
  role = 'textbox',
  disabled = false,
  placeholder,
}) => {
  return (
    <FormControl fullWidth variant="standard">
      <TextField
        variant="standard"
        role={role}
        type={isPassword ? 'password' : 'text'}
        multiline={multiline}
        rows={3}
        name={inputName}
        defaultValue={defaultValue}
        onChange={onChange}
        label={label}
        fullWidth
        disabled={disabled}
        placeholder={placeholder}
      />
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </FormControl>
  );
};

export default TextInput;
