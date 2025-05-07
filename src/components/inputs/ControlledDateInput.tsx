import React from 'react';
import { Control, Controller } from 'react-hook-form';
import DateInput from './DateInput';
import {DateView} from "@mui/x-date-pickers";

type Props = {
  control: Control<object>;
  name: never;
  label: string;
  errors: {type: string}[];
  rules?: {
    required?: boolean;
  }
  view?: string;
  openTo?: DateView;
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
