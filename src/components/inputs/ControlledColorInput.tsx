import React from 'react';
import { Control, Controller } from 'react-hook-form';
import ColorInput from './ColorInput';

type Props = {
  control: Control;
  name: string;
  label: string;
  errors: { type: string }[];
};

const ControlledColorInput: React.FC<Props> = ({
  control,
  name,
  label,
  errors,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange } }) => {
        return (
          <ColorInput
            label={label}
            inputName={name}
            defaultValue={value}
            onChange={onChange}
            errors={errors}
          />
        );
      }}
    />
  );
};

export default ControlledColorInput;
