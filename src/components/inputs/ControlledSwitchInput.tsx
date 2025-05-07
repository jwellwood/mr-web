import React, { ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import CustomSwitch from './CustomSwitch';

type Props = {
  control: Control<Record<string, unknown>>;
  name: string;
  label?: string | ReactElement;
  placement?: "top" | "end" | "start" | "bottom";
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
            checked={value as boolean}
            onCheck={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
        );
      }}
    />
  );
};

export default ControlledSwitchInput;
