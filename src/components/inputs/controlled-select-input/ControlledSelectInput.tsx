import { Control, Path, useController } from 'react-hook-form';
import { ISelectOptions } from '../types';
import SelectInput from './SelectInput';

type Props<T extends object> = {
  name: Path<T> | string;
  control: Control<T>;
  label: string;
  required?: boolean;
  options: readonly ISelectOptions[];
  disabled?: boolean;
  helperText?: string;
};

export default function ControlledSelectInput<T extends object>({
  name,
  control,
  label,
  required = false,
  options,
  disabled = false,
  helperText,
}: Props<T>) {
  const { field, fieldState } = useController({
    name: name as Path<T>,
    control,
  });
  const { value, onChange } = field;
  const { error, isDirty, invalid } = fieldState;

  return (
    <SelectInput
      inputName={name}
      label={label}
      required={required}
      onChange={onChange}
      value={value}
      options={options}
      errors={error ? [error] : []}
      disabled={disabled}
      helperText={helperText}
      isDirty={isDirty}
      isValid={!invalid}
    />
  );
}
