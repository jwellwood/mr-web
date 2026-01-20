import { Control, useController, Path } from 'react-hook-form';

import ColorInput from './ColorInput';

type Props<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export default function ControlledColorInput<T extends object>({ control, name, label }: Props<T>) {
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
      defaultValue={value}
      onChange={onChange}
      errors={error ? [error] : []}
    />
  );
}
