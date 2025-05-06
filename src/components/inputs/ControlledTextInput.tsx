import React from 'react';
import { Control, Controller } from 'react-hook-form';
import TextInput from './TextInput';

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  errors: any;
  rules?: any;
  multiline?: boolean;
  isPassword?: boolean;
  placeholder?: string;
};

const ControlledTextInput: React.FC<Props> = ({
  control,
  name,
  label,
  rules,
  errors,
  multiline = false,
  isPassword = false,
  placeholder,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { name, value, onChange } }) => {
        return (
          <TextInput
            isPassword={isPassword}
            inputName={name}
            defaultValue={value}
            label={label}
            multiline={multiline}
            onChange={onChange}
            errors={errors}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
};

export default ControlledTextInput;
