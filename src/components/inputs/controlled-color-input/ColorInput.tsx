import { Box, Stack, TextField } from '@mui/material';
import React from 'react';
import { CustomTypography } from '../../typography';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import type { TypedFormError } from '../types';

interface Props {
  inputName: string;
  defaultValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: TypedFormError[];
  isPassword?: boolean;
  isEmail?: boolean;
  multiline?: boolean;
  disabled?: boolean;
}

export default function ColorInput({
  inputName,
  defaultValue,
  onChange,
  label,
  errors,
  disabled = false,
}: Props) {
  return (
    <Box sx={{ background: 'rgba(0, 0, 0, 0.06)' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft={'12px'}
        height="56px"
        borderBottom="2px solid rgba(0, 0, 0, 0.12)"
      >
        <CustomTypography bold color="label" size="md">
          {label}
        </CustomTypography>
        <TextField
          color="secondary"
          type="color"
          name={inputName}
          defaultValue={defaultValue}
          onChange={onChange}
          variant="filled"
          slotProps={{
            htmlInput: {
              style: { height: '36px', width: '72px', padding: 0 },
            },
          }}
          disabled={disabled}
        />
        {errors && errors.length ? <FormErrorMessage error={errors[0]} /> : null}
      </Stack>
    </Box>
  );
}
