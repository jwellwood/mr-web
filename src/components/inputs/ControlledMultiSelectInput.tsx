import React from 'react';
import { Control, Controller } from 'react-hook-form';
import MultiSelectInput from './MultiSelectInput';
import { ISelectOptions } from './SelectInput';

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  rules?: any;
  options: ISelectOptions[];
  showLabels?: boolean;
  errors: any;
};

const ControlledMultiSelectInput: React.FC<Props> = ({
  name,
  control,
  options,
  label,
  rules,
  errors,
  showLabels,
}) => {
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
