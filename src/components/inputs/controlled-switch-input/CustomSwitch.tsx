import { Box, Stack } from '@mui/material';
import Switch from '@mui/material/Switch';
import React, { ReactElement } from 'react';
import CustomTypography from '../../typography/CustomTypography';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import { TypedFormError } from '../types';

interface Props {
  name?: string;
  onCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | ReactElement;
  placement?: 'top' | 'end' | 'start' | 'bottom';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  isList?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  errors: TypedFormError[];
}

export default function CustomSwitch({
  name,
  onCheck,
  label,
  checked,
  defaultChecked,
  disabled,
  color = 'primary',
  errors,
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
        <Switch
          color={color}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onCheck}
          disabled={disabled}
        />
      </Stack>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </Box>
  );
}
