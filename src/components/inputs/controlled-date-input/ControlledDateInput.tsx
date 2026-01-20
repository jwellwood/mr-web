import { Control, Path, useController } from 'react-hook-form';
import { DateView } from '@mui/x-date-pickers';

import DateInput from './DateInput';

type Props<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  view?: DateView;
  openTo?: DateView;
  disableFuture?: boolean;
};

export default function ControlledDateInput<T extends object>({
  control,
  name,
  label,
  view,
  openTo,
  disableFuture = true,
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { value, onChange } = field;
  const { error, isDirty, invalid } = fieldState;

  const valueAsDate = value ? new Date(value) : null;
  return (
    <DateInput
      inputName={name}
      label={label}
      defaultValue={valueAsDate}
      onChange={onChange}
      errors={error ? [error] : []}
      isDirty={isDirty}
      isValid={!invalid}
      openTo={openTo}
      view={view}
      disableFuture={disableFuture}
    />
  );
}
