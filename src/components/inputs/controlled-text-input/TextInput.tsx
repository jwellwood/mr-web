import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import { TypedFormError } from '../types';

interface Props {
  inputName?: string;
  defaultValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors: TypedFormError[];
  isPassword?: boolean;
  isEmail?: boolean;
  multiline?: boolean;
  role?: string;
  disabled?: boolean;
  placeholder?: string;
  isDirty?: boolean;
  isValid?: boolean;
}

export default function TextInput({
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
  isDirty,
  isValid,
}: Props) {
  return (
    <FormControl fullWidth variant="standard">
      <TextField
        variant="filled"
        size="small"
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
        error={!!errors?.[0]}
        slotProps={{
          inputLabel: {
            sx: {
              color: isDirty ? (isValid ? 'primary.main' : 'error.main') : undefined,
            },
          },
        }}
      />
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </FormControl>
  );
}
