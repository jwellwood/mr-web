import { Control, Path, useController } from 'react-hook-form';

import MultiSelectInput from './MultiSelectInput';
import { ISelectOptions } from '../types';

type Props<T extends object> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: ISelectOptions[];
  showLabels?: boolean;
};

export default function ControlledMultiSelectInput<T extends object>({
  name,
  control,
  options,
  label,
  showLabels,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { value, onChange } = field;
  const { error, isDirty, invalid } = fieldState;

  return (
    <MultiSelectInput
      value={value}
      onChange={onChange}
      options={options}
      label={label}
      errors={error ? [error] : []}
      showLabels={showLabels}
      isDirty={isDirty}
      isValid={!invalid}
    />
  );
}
