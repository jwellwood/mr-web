import React from 'react';
import TextField from '@mui/material/TextField';
import { MobileDatePicker, LocalizationProvider, DateView } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormErrorMessage from '../alerts/FormErrorMessage';
import { PickerValue } from '@mui/x-date-pickers/internals';

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

const DateInput: React.FC<Props> = ({
  inputName,
  defaultValue,
  onChange,
  label,
  openTo,
  errors,
  view,
  disableFuture,
}) => {
  let views = ['year', 'month', 'day'] as DateView[];
  let inputFormat = 'dd/MM/yy';
  if (view === 'year') {
    views = ['year'];
    inputFormat = 'yyyy';
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label={label}
          value={defaultValue}
          onChange={onChange}
          openTo={openTo || views[views.length - 1]}
          disableFuture={disableFuture}
          views={views}
          slotProps={{ calendarHeader: { format: inputFormat } }}
          slots={{
            textField: params => (
              <TextField name={inputName} variant="filled" margin="normal" fullWidth {...params} />
            ),
          }}
        />
      </LocalizationProvider>
      {errors ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
};

export default DateInput;
