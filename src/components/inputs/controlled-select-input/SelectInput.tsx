import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { CustomTypography } from '../..';
import { theme } from '../../../theme';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import FormLabel from '../form-label/FormLabel';
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
  helperText,
}: Props) {
  const effective = value !== undefined ? value : defaultValue;
  const defaultValueString = effective !== undefined ? String(effective) : '';

  return (
    <>
      <FormControl fullWidth variant="filled">
        <FormLabel id={inputName} required={required} label={label} helperText={helperText} />
        <Select
          id={inputName}
          name={inputName}
          value={defaultValueString}
          onChange={onChange}
          required={required}
          disabled={disabled}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                background: theme.palette.secondary.dark,
                border: `1px solid ${theme.palette.secondary.light}`,
              },
            },
          }}
          renderValue={selected => {
            const selectedOption = options.find(opt => String(opt.value) === String(selected));
            return selectedOption?.label ?? '';
          }}
          variant="filled"
          inputProps={{ placeholder: label, id: inputName, 'aria-label': label }}
          error={!!errors[0]}
          sx={{
            '& .MuiSelect-select': {
              py: 1,
            },
            '& .MuiSelect-icon': {
              color: theme.palette.secondary.light,
            },
          }}
        >
          {options.map(opt => (
            <MenuItem
              key={`${inputName}-${String(opt.value)}`}
              disabled={opt.disabled}
              value={String(opt.value)}
            >
              <CustomTypography bold color="data">
                {opt.label}
              </CustomTypography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
}
