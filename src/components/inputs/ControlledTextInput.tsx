import { type Control, type Path, useController } from 'react-hook-form';
import TextInput from './TextInput';

type Props<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors?: ({ type: string } | Error)[];
  rules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
  multiline?: boolean;
  isPassword?: boolean;
  placeholder?: string;
};

function ControlledTextInput<T extends object>({
  control,
  name,
  label,
  rules,
  errors,
  multiline = false,
  isPassword = false,
  placeholder,
}: Props<T>) {
  const {
    field,
    // fieldState: { invalid, isTouched, isDirty },
    // formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <TextInput
      isPassword={isPassword}
      inputName={name}
      defaultValue={field.value}
      label={label}
      multiline={multiline}
      onChange={field.onChange}
      errors={errors}
      placeholder={placeholder}
    />
  );
}

export default ControlledTextInput;
