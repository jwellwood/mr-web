import React from 'react';
import TextField from '@mui/material/TextField';
import FormErrorMessage from '../alerts/FormErrorMessage';

interface Props {
  inputName?: string;
  defaultValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: object; // TODO
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
    <>
      <TextField
        role={role}
        type={isPassword ? 'password' : 'text'}
        multiline={multiline}
        rows={3}
        name={inputName}
        defaultValue={defaultValue}
        onChange={onChange}
        label={label}
        variant="filled"
        margin="normal"
        fullWidth
        disabled={disabled}
        placeholder={placeholder}
      />
      {errors ? <FormErrorMessage error={errors} /> : null}
    </>
  );
};

export default TextInput;
