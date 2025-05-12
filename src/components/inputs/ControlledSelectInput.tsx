import { Control, Controller, Path } from 'react-hook-form';
import SelectInput, { ISelectOptions } from './SelectInput';
import { FormError } from '../../types/form.ts';

type Props<T extends object> = {
  control: Control<T>;
  options: readonly ISelectOptions[];
  name: Path<T>;
  label: string;
  rules?: {
    required?: boolean;
  };
  errors: FormError[];
  disabled?: boolean;
};

function ControlledSelectInput<T extends object>({
  control,
  options,
  name,
  label,
  rules,
  errors,
  disabled = false,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { name, value, onChange } }) => {
        return (
          <SelectInput
            inputName={name}
            label={label}
            onChange={onChange}
            defaultValue={value}
            options={options}
            errors={errors}
            disabled={disabled}
          />
        );
      }}
    />
  );
}

export default ControlledSelectInput;
