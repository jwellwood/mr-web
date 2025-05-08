import { Control, Controller } from 'react-hook-form';
import TextInput from './TextInput';

type Props<T extends object> = {
  control: Control<T>;
  name: string;
  label: string;
  errors: ({ type: string } | Error)[];
  rules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
  multiline?: boolean;
  isPassword?: boolean;
  placeholder?: string;
};

function ControlledTextInput<T extends object> ({
  control,
  name,
  label,
  rules,
  errors,
  multiline = false,
  isPassword = false,
  placeholder,
}: Props<T>)  {
  return (
    <Controller
      control={control}
      name={name as never}
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
