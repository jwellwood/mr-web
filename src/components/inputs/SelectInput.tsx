import React from 'react';
import FormErrorMessage from '../alerts/FormErrorMessage';
import { FormError } from '../../types/form.ts';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export interface ISelectOptions {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  inputName: string;
  defaultValue?: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  label?: string;
  errors: FormError[];
  options: readonly {
    label: string;
    value: string | number;
    disabled?: boolean;
  }[];
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
  disabled,
}) => {
  return (
    <>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={inputName}
          value={defaultValue}
          label={label}
          onChange={onChange}
          disabled={disabled}
        >
          {options.map(opt => (
            <MenuItem disabled={opt.disabled} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
};

export default SelectInput;
