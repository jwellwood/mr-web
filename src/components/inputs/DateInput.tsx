import { MobileDatePicker, LocalizationProvider, DateView } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormErrorMessage from './FormErrorMessage';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { FormControl } from '@mui/material';

interface Props {
  inputName: string;
  defaultValue?: Date;
  onChange: (date: PickerValue) => void; // TODO
  label: string;
  disableFuture: boolean;
  openTo?: DateView;
  view?: string;
  errors?: { type: string }[];
}

function DateInput({ defaultValue, onChange, label, openTo, errors, view, disableFuture }: Props) {
  let views = ['year', 'month', 'day'] as DateView[];
  if (view === 'year') {
    views = ['year'];
  }

  return (
    <FormControl fullWidth variant="standard">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label={label}
          value={defaultValue}
          onChange={onChange}
          openTo={openTo || views[views.length - 1]}
          disableFuture={disableFuture}
          views={views}
          slotProps={{
            textField: { variant: 'standard' },
          }}
        />
      </LocalizationProvider>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </FormControl>
  );
}

export default DateInput;
