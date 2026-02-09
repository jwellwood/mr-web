import { ReactElement } from 'react';
import { Control, Path, useController } from 'react-hook-form';
import CustomSwitch from './CustomSwitch';

type Props<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label?: string | ReactElement;
  placement?: 'top' | 'end' | 'start' | 'bottom';
  disabled?: boolean;
};

export default function ControlledSwitchInput<T extends object>({
  control,
  name,
  label,
  placement,
  disabled = false,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { value, onChange } = field;
  const { error } = fieldState;

  return (
    <CustomSwitch
      name={name}
      label={label}
      placement={placement}
      checked={value as boolean}
      onCheck={e => onChange(e.target.checked)}
      disabled={disabled}
      errors={error ? [error] : []}
    />
  );
}
