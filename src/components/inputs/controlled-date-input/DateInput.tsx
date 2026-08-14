import { MobileDatePicker, LocalizationProvider, DateView } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { theme } from '../../../theme';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import FormLabel from '../form-label/FormLabel';
import { TypedFormError } from '../types';

interface Props {
  inputName: string;
  /** preferred: controlled value */
  value?: Date | null;
  /** legacy: uncontrolled default value */
  defaultValue?: Date | null;
  onChange: (date: PickerValue) => void;
  label: string;
  disableFuture: boolean;
  openTo?: DateView;
  view?: DateView;
  errors?: TypedFormError[];
  isDirty?: boolean;
  isValid?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function DateInput({
  inputName,
  value,
  defaultValue,
  onChange,
  label,
  openTo,
  errors,
  view,
  disableFuture,
  helperText,
  required = false,
}: Props) {
  let views = ['year', 'month', 'day'] as DateView[];
  if (view === 'year') {
    views = ['year'];
  }

  return (
    <>
      <FormLabel id={inputName} required={required} label={label} helperText={helperText} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          value={value !== undefined ? value : defaultValue}
          onChange={onChange}
          openTo={openTo || views[views.length - 1]}
          disableFuture={disableFuture}
          views={views}
          slotProps={{
            textField: {
              id: inputName,
              variant: 'filled',
              required: required,
              fullWidth: true,
              sx: {
                '& .MuiPickersInputBase-sectionsContainer': {
                  py: 1,
                },
                '& .MuiPickersInputBase-root.MuiPickersFilledInput-root': {
                  mt: '-8px',
                },
              },
            },
            openPickerButton: {
              style: { color: theme.palette.label.main },
            },
          }}
        />
      </LocalizationProvider>
      {errors?.[0] ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
}
