import { ReactElement } from 'react';
import {Control, Controller, Path} from 'react-hook-form';
import CustomSwitch from './CustomSwitch';

type Props<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label?: string | ReactElement;
  placement?: "top" | "end" | "start" | "bottom";
  disabled?: boolean;
};

function ControlledSwitchInput<T extends object>({
  control,
  name,
  label,
  placement,
  disabled = false,
}: Props<T>) {
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
