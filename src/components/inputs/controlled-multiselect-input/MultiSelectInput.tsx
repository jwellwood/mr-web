import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { theme } from '../../../theme';
import { CustomTypography } from '../../typography';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import FormLabel from '../form-label/FormLabel';
import { TypedFormError, ISelectOptions } from '../types';

interface Props {
  inputName: string;
  options: ISelectOptions[];
  value: string[];
  label: string;
  onChange: (event: SelectChangeEvent<string[]>) => void;
  showLabels?: boolean;
  errors: TypedFormError[];
  isDirty?: boolean;
  isValid?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function MultipleSelectInput({
  inputName,
  options,
  onChange,
  value,
  label,
  showLabels,
  errors,
  helperText,
  required = false,
}: Props) {
  const arrayValue = value || [];

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    onChange(event);
  };

  const renderValue = (selected: string[]) => {
    if (showLabels) {
      const selectedLabels = options.filter(option => selected.includes(option.value as string));
      return selectedLabels.map(
        (item, i) => `${item.label}${i !== selectedLabels.length - 1 ? ', ' : ''}`
      );
    }
    return `${selected.length} ${label}`;
  };

  return (
    <>
      <FormControl fullWidth variant="filled">
        <FormLabel id={inputName} required={required} label={label} helperText={helperText} />
        <Select
          labelId="seasons-played"
          id="multiple-checkbox"
          multiple
          value={arrayValue}
          onChange={handleChange}
          renderValue={selected => renderValue(selected)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                background: theme.palette.secondary.dark,
                border: `1px solid ${theme.palette.secondary.light}`,
              },
            },
          }}
          inputProps={{ placeholder: label, id: inputName, 'aria-label': label }}
          error={!!errors?.[0]}
          required={required}
          sx={{
            '& .MuiSelect-select': {
              py: 2,
            },
          }}
        >
          {options?.map((option, i) => (
            <MenuItem key={(option.label, i)} value={option.value as string}>
              <Checkbox checked={arrayValue.includes(option.value as string)} />
              <ListItemText
                primary={
                  <CustomTypography bold color="data">
                    {option.label}
                  </CustomTypography>
                }
              />
            </MenuItem>
          ))}
        </Select>

        {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
      </FormControl>
    </>
  );
}
