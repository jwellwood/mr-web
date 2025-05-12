import { Control, Controller, Path } from 'react-hook-form';
import DateInput from './DateInput';
import { DateView } from '@mui/x-date-pickers';

type Props<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors: { type: string }[];
  rules?: {
    required?: boolean;
  };
  view?: string;
  openTo?: DateView;
  disableFuture?: boolean;
};

function ControlledDateInput<T extends object>({
  control,
  name,
  label,
  errors,
  view,
  openTo,
  disableFuture = true,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange } }) => {
        const date = new Date(value);
        return (
          <DateInput
            inputName={name}
            label={label}
            view={view}
            openTo={openTo}
            defaultValue={date}
            onChange={onChange}
            errors={errors}
            disableFuture={disableFuture}
          />
        );
      }}
    />
  );
}

export default ControlledDateInput;
