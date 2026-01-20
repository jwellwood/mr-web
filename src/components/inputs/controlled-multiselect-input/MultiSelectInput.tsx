import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import FormErrorMessage from '../form-error-message/FormErrorMessage';
import { TypedFormError, ISelectOptions } from '../types';

interface Props {
  options: ISelectOptions[];
  value: string;
  label: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  showLabels?: boolean;
  errors: TypedFormError[];
  isDirty?: boolean;
  isValid?: boolean;
}

export default function MultipleSelectInput({
  options,
  onChange,
  value,
  label,
  showLabels,
  errors,
  isDirty,
  isValid,
}: Props) {
  const renderValue = (selected: string) => {
    if (showLabels) {
      const label = options.filter(option => selected.includes(option.value as string));
      return label.map((item, i) => `${item.label}${i !== label.length - 1 ? ', ' : ''}`);
    }
    return `${selected.length} ${label}`;
  };

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel
        id="seasons-played"
        sx={{
          color: isDirty ? (isValid ? 'primary' : 'error') : undefined,
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="seasons-played"
        id="multiple-checkbox"
        multiple
        value={value}
        onChange={onChange}
        renderValue={selected => renderValue(selected)}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
        error={!!errors?.[0]}
      >
        {options?.map((option, i) => (
          <MenuItem key={(option.label, i)} value={option.value as string}>
            <Checkbox checked={value.indexOf(option.value as string) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </FormControl>
  );
}
