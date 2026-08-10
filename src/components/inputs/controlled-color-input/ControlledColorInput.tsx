import { Control, useController, Path } from 'react-hook-form';
import ColorInput from './ColorInput';

type Props<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  helperText?: string;
  required?: boolean;
};

export default function ControlledColorInput<T extends object>({
  control,
  name,
  label,
  helperText,
  required,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { value, onChange } = field;
  const { error } = fieldState;

  return (
    <ColorInput
      label={label}
      inputName={name}
      value={value}
      onChange={onChange}
      errors={error ? [error] : []}
      helperText={helperText}
      required={required}
    />
  );
}
