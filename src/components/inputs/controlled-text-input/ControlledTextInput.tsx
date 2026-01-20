import { type Control, type Path, useController } from 'react-hook-form';

import TextInput from './TextInput';

type Props<T extends object> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  multiline?: boolean;
  isPassword?: boolean;
  placeholder?: string;
};

export default function ControlledTextInput<T extends object>({
  control,
  name,
  label,
  multiline = false,
  isPassword = false,
  placeholder,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { value, onChange } = field;
  const { error, isDirty, invalid } = fieldState;

  return (
    <TextInput
      isPassword={isPassword}
      inputName={name}
      defaultValue={value}
      label={label}
      multiline={multiline}
      onChange={onChange}
      errors={error ? [error] : []}
      placeholder={placeholder}
      isDirty={isDirty}
      isValid={!invalid}
    />
  );
}
