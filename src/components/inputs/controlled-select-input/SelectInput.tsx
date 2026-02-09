import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import type { ISelectOptions, TypedFormError } from '../types';

interface Props {
  inputName: string;
  defaultValue?: string | number;
  label: string;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  options: readonly ISelectOptions[];
  errors: TypedFormError[];
  disabled?: boolean;
  isDirty?: boolean;
  isValid?: boolean;
}

export default function SelectInput({
  inputName,
  defaultValue,
  onChange,
  label,
  options,
  disabled,
  errors,
  isDirty,
  isValid,
}: Props) {
  return (
    <>
      <FormControl fullWidth variant="filled">
        <InputLabel
          id="single-select-label"
          sx={{
            color: isDirty ? (isValid ? 'primary' : 'error') : undefined,
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="single-select-label"
          id="single-select-input"
          name={inputName}
          value={defaultValue || ''}
          label={label}
          onChange={onChange}
          disabled={disabled}
          MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          variant="filled"
          error={!!errors[0]}
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
}
