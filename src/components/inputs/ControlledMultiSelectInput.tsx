import {Control, Controller, Path} from 'react-hook-form';
import MultiSelectInput from './MultiSelectInput';
import { ISelectOptions } from './SelectInput';

type Props<T extends object> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: {
    required?: boolean;
  };
  options: ISelectOptions[];
  showLabels?: boolean;
  errors: (string | Error)[];
};

function ControlledMultiSelectInput<T extends object>({
  name,
  control,
  options,
  label,
  rules,
  errors,
  showLabels,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => {
        return (
          <MultiSelectInput
            value={value}
            onChange={onChange}
            options={options}
            label={label}
            errors={errors}
            showLabels={showLabels}
          />
        );
      }}
    />
  );
};

export default ControlledMultiSelectInput;
