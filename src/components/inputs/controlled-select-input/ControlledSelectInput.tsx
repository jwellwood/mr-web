import { Control, Path, useController } from 'react-hook-form';
import { ISelectOptions } from '../types';
import SelectInput from './SelectInput';

type Props<T extends object> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: readonly ISelectOptions[];
  disabled?: boolean;
};

export default function ControlledSelectInput<T extends object>({
  name,
  control,
  label,
  options,
  disabled = false,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { value, onChange } = field;
  const { error, isDirty, invalid } = fieldState;

  return (
    <SelectInput
      inputName={name}
      label={label}
      onChange={onChange}
      defaultValue={value}
      options={options}
      errors={error ? [error] : []}
      disabled={disabled}
      isDirty={isDirty}
      isValid={!invalid}
    />
  );
}
