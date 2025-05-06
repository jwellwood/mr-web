import React from 'react';
import TextField from '@mui/material/TextField';
import FormErrorMessage from '../alerts/FormErrorMessage';

interface Props {
  inputName: string;
  defaultValue?: any; //TODO
  onChange: (e) => void;
  errors?: any; //TODO
}

const FileInput: React.FC<Props> = ({
  inputName,
  defaultValue,
  onChange,
  errors,
}) => {
  return (
    <>
      <TextField
        type="file"
        color="primary"
        name={inputName}
        defaultValue={defaultValue}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      {errors ? <FormErrorMessage error={errors} /> : null}
    </>
  );
};

export default FileInput;
