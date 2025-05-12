import React, { ReactNode } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface Props {
  name: string;
  defaultValue?: boolean;
  onChange: () => void;
  checked: boolean;
  label: string | ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const ToggleSwitch: React.FC<Props> = ({ name, onChange, checked, label, color = 'primary' }) => {
  return (
    <FormControlLabel
      control={<Switch color={color} checked={checked} onChange={onChange} name={name} />}
      label={label}
    />
  );
};

export default ToggleSwitch;
