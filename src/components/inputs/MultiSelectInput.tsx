import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormErrorMessage from '../alerts/FormErrorMessage';
import { ISelectOptions } from './SelectInput';
import { FormError } from '../../types/form.ts';

interface Props {
  options: ISelectOptions[];
  value: string;
  label: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  showLabels?: boolean;
  errors: FormError[];
}

const MultipleSelectInput: React.FC<Props> = ({
  options,
  onChange,
  value,
  label,
  showLabels,
  errors,
}) => {
  const renderValue = (selected: string) => {
    if (showLabels) {
      const label = options.filter(option => selected.includes(option.value as string));
      return label.map((item, i) => `${item.label}${i !== label.length - 1 ? ', ' : ''}`);
    }
    return `${selected.length} ${label}`;
  };
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="seasons-played">{label}</InputLabel>
      <Select
        labelId="seasons-played"
        id="multiple-checkbox"
        multiple
        value={value}
        onChange={onChange}
        renderValue={selected => renderValue(selected)}
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
};

export default MultipleSelectInput;
