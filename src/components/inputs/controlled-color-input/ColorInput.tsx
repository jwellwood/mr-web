import { Box, Stack, TextField } from '@mui/material';
import React from 'react';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import FormLabel from '../form-label/FormLabel';
import type { TypedFormError } from '../types';

interface Props {
  inputName: string;
  /** preferred: controlled value */
  value?: string | number;
  /** legacy: uncontrolled default value */
  defaultValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: TypedFormError[];
  isPassword?: boolean;
  isEmail?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function ColorInput({
  inputName,
  value,
  defaultValue,
  onChange,
  label,
  errors,
  required = false,
  disabled = false,
  helperText,
}: Props) {
  return (
    <Box sx={{ background: 'rgba(0, 0, 0, 0.06)' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft={'2px'}
        height="56px"
        borderBottom="2px solid rgba(0, 0, 0, 0.12)"
      >
        <FormLabel id={inputName} label={label} required={required} helperText={helperText} />
        <TextField
          color="secondary"
          type="color"
          name={inputName}
          value={value !== undefined ? value : defaultValue}
          onChange={onChange}
          variant="filled"
          slotProps={{
            htmlInput: {
              style: { height: '42px', width: '100px', padding: 0 },
            },
          }}
          disabled={disabled}
          required={required}
        />
        {errors && errors.length ? <FormErrorMessage error={errors[0]} /> : null}
      </Stack>
    </Box>
  );
}
