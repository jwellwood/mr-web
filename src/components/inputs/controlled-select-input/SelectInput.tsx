import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import FormHelperText from '../form-helper-text/FormHelperText';
import type { ISelectOptions, TypedFormError } from '../types';

interface Props {
  inputName: string;
  /** preferred: controlled value */
  value?: string | number;
  /** legacy: uncontrolled default value */
  defaultValue?: string | number;
  label: string;
  required?: boolean;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  options: readonly ISelectOptions[];
  errors: TypedFormError[];
  disabled?: boolean;
  isDirty?: boolean;
  isValid?: boolean;
  helperText?: string;
}

export default function SelectInput({
  inputName,
  value,
  defaultValue,
  onChange,
  label,
  required = false,
  options,
  disabled,
  errors,
  isDirty,
  isValid,
  helperText,
}: Props) {
  const effective = value !== undefined ? value : defaultValue;
  const defaultValueString = effective !== undefined ? String(effective) : '';

  return (
    <>
      {helperText ? <FormHelperText helperText={helperText} /> : null}
      <FormControl fullWidth variant="filled">
        <InputLabel
          id="single-select-label"
          sx={{
            color: isDirty ? (isValid ? 'primary' : 'error') : undefined,
          }}
          required={required}
        >
          {label}
        </InputLabel>
        <Select
          labelId="single-select-label"
          id="single-select-input"
          name={inputName}
          value={defaultValueString}
          label={label}
          onChange={onChange}
          required={required}
          disabled={disabled}
          MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          variant="filled"
          error={!!errors[0]}
        >
          {options.map(opt => (
            <MenuItem
              key={`${inputName}-${String(opt.value)}`}
              disabled={opt.disabled}
              value={String(opt.value)}
            >
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
}
