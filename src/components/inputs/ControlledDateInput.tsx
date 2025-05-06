import React from 'react';
import { Control, Controller } from 'react-hook-form';
import DateInput from './DateInput';

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  errors: any;
  view?: any;
  openTo?: any;
  disableFuture?: boolean;
};

const ControlledDateInput: React.FC<Props> = ({
  control,
  name,
  label,
  errors,
  view,
  openTo,
  disableFuture = true,
}) => {
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
};

export default ControlledDateInput;
