import { type Control, type Path, useController } from 'react-hook-form';
import TextInput from './TextInput';

type Props<T extends object> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  multiline?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  helperText?: string;
};

export default function ControlledTextInput<T extends object>({
  control,
  name,
  label,
  required = false,
  multiline = false,
  isPassword = false,
  placeholder,
  helperText,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { value, onChange, onBlur } = field;
  const { error, isDirty, invalid, isTouched } = fieldState;

  return (
    <TextInput
      isPassword={isPassword}
      inputName={name}
      value={value}
      label={label}
      required={required}
      multiline={multiline}
      onChange={onChange}
      onBlur={onBlur}
      errors={isTouched && error ? [error] : []}
      placeholder={placeholder}
      isDirty={isDirty}
      isValid={!invalid}
      helperText={helperText}
    />
  );
}
