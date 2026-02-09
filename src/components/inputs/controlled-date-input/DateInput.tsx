import { MobileDatePicker, LocalizationProvider, DateView } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { theme } from '../../../theme';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import { TypedFormError } from '../types';

interface Props {
  inputName: string;
  defaultValue: Date | null;
  onChange: (date: PickerValue) => void;
  label: string;
  disableFuture: boolean;
  openTo?: DateView;
  view?: DateView;
  errors?: TypedFormError[];
  isDirty?: boolean;
  isValid?: boolean;
}

export default function DateInput({
  defaultValue,
  onChange,
  label,
  openTo,
  errors,
  isDirty,
  isValid,
  view,
  disableFuture,
}: Props) {
  let views = ['year', 'month', 'day'] as DateView[];
  if (view === 'year') {
    views = ['year'];
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
          slotProps={{
            textField: {
              variant: 'filled',
              fullWidth: true,
              InputLabelProps: {
                sx: { background: isDirty ? (isValid ? 'primary' : 'warning') : 'primary' },
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
