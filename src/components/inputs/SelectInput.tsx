import React from 'react';
import TextField from '@mui/material/TextField';

import FormErrorMessage from '../alerts/FormErrorMessage';
import {FormError} from "../../types/form.ts";

export interface ISelectOptions {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  inputName: string;
  defaultValue?: string | boolean | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: FormError[]; // TODO
  options: readonly {
    label: string;
    value: string  | number;
    disabled?: boolean;
  }[];
  data_id?: string;
  disabled?: boolean;
  multiple?: boolean;
}

const SelectInput: React.FC<Props> = ({
  inputName,
  defaultValue,
  onChange,
  label,
  errors,
  options,
  data_id,
  disabled,
}) => {
  return (
    <>
      <TextField
        select
        SelectProps={{
          native: true,
        }}
        data-id={data_id}
        color="primary"
        name={inputName}
        defaultValue={defaultValue}
        onChange={onChange}
        label={label}
        variant="filled"
        margin="normal"
        fullWidth
        disabled={disabled}
      >
        {options.map((option, i) => (
          <option key={i} disabled={option?.disabled} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      {errors && errors.length ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
};

export default SelectInput;
