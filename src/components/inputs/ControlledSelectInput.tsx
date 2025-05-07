import React from 'react';
import { Control, Controller } from 'react-hook-form';
import SelectInput, { ISelectOptions } from './SelectInput';

type Props = {
  control: Control<Record<string, string>>;
  options: ISelectOptions[];
  name: string;
  label: string;
  rules?: {
    required?: boolean;
  };
  errors: (string | Error)[];
  disabled?: boolean;
};

const ControlledSelectInput: React.FC<Props> = ({
  control,
  options,
  name,
  label,
  rules,
  errors,
  disabled = false,
}) => {
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
};

export default ControlledSelectInput;
