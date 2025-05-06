import React, { ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import CustomSwitch from './CustomSwitch';

type Props = {
  control: Control<any>;
  name: string;
  label?: string | ReactElement;
  placement?: string;
  disabled?: boolean;
};

const ControlledSwitchInput: React.FC<Props> = ({
  control,
  name,
  label,
  placement,
  disabled = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange } }) => {
        return (
          <CustomSwitch
            name={name}
            label={label}
            placement={placement}
            checked={value}
            onCheck={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
        );
      }}
    />
  );
};

export default ControlledSwitchInput;
