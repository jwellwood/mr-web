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
  // Convert comma-separated string to array for MUI
  const arrayValue = value ? value.split(',') : [];

  // Convert array back to comma-separated string for onChange
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValue = event.target.value;
    const stringValue = Array.isArray(newValue) ? newValue.join(',') : newValue;

    // Create a new event with string value to match expected signature
    const stringEvent = {
      ...event,
      target: { ...event.target, value: stringValue },
    } as SelectChangeEvent<string>;

    onChange(stringEvent);
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
    <FormControl fullWidth variant="filled">
      <InputLabel
        id="seasons-played"
        sx={{
          color: isDirty ? (isValid ? 'primary' : 'error') : undefined,
        }}
      >
        {label}
      </InputLabel>
      <Select<string[]>
        labelId="seasons-played"
        id="multiple-checkbox"
        multiple
        value={arrayValue}
        onChange={handleChange}
        renderValue={selected => renderValue(selected)}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
        error={!!errors?.[0]}
      >
        {options?.map((option, i) => (
          <MenuItem key={(option.label, i)} value={option.value as string}>
            <Checkbox checked={arrayValue.includes(option.value as string)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </FormControl>
  );
}
