import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import FormLabel from '../form-label/FormLabel';
import { TypedFormError } from '../types';

interface Props {
  inputName: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  errors: TypedFormError[];
  helperText?: string;
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
  value,
  onChange,
  label,
  required = false,
  errors,
  helperText,
  isPassword,
  multiline,
  role = 'textbox',
  disabled = false,
  placeholder,
  onBlur,
}: Props) {
  return (
    <FormControl fullWidth variant="standard">
      <FormLabel id={inputName || ''} required={required} label={label} helperText={helperText} />

      <TextField
        id={inputName}
        variant="filled"
        size="small"
        role={role}
        type={isPassword ? 'password' : 'text'}
        multiline={multiline}
        rows={3}
        name={inputName}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          '& .MuiFilledInput-input': {
            py: 1,
          },
        }}
        // label={''}
        required={required}
        fullWidth
        disabled={disabled}
        placeholder={placeholder || ''}
        error={!!errors?.[0]}
      />
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </FormControl>
  );
}
