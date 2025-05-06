import React from 'react';
import TextField from '@mui/material/TextField';
import FormErrorMessage from '../alerts/FormErrorMessage';

interface Props {
  inputName: string;
  defaultValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: object; // TODO
  isPassword?: boolean;
  isEmail?: boolean;
  multiline?: boolean;
  disabled?: boolean;
}

const ColorInput: React.FC<Props> = ({
  inputName,
  defaultValue,
  onChange,
  label,
  errors,
  disabled = false,
}) => {
  return (
    <>
      <TextField
        color="secondary"
        type="color"
        name={inputName}
        defaultValue={defaultValue}
        onChange={onChange}
        label={label}
        variant="filled"
        margin="normal"
        fullWidth
        inputProps={{ style: { height: '75px' } }}
        disabled={disabled}
      />
      {errors ? <FormErrorMessage error={errors} /> : null}
    </>
  );
};

export default ColorInput;
