import React, { ReactElement } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CustomTypography from '../typography/CustomTypography';

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
}

const CustomSwitch: React.FC<Props> = ({
  name,
  onCheck,
  label,
  placement,
  checked,
  defaultChecked,
  disabled,
  isList,
  color = 'primary',
}) => {
  const customSwitch = (
    <Switch
      color={color}
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onCheck}
      disabled={disabled}
    />
  );

  return isList ? (
    customSwitch
  ) : (
    <FormControlLabel
      control={customSwitch}
      label={
        <CustomTypography size="xs" color="label">
          {label}
        </CustomTypography>
      }
      labelPlacement={placement || 'top'}
    />
  );
};

export default CustomSwitch;
