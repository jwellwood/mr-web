import Button from '@mui/material/Button';
import { ChangeEvent, useRef } from 'react';
import { CustomTypography } from '../../typography';
import FormErrorMessage from '../form-error-message/FormErrorMessage';
import { TypedFormError } from '../types';

interface Props {
  inputName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: TypedFormError[];
  accept?: string;
  fileName?: string;
}

export default function FileInput({ inputName, onChange, errors, accept, fileName }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        name={inputName}
        accept={accept}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <Button variant="outlined" color="primary" onClick={() => inputRef.current?.click()}>
        Choose file
      </Button>
      {fileName && (
        <CustomTypography bold color="label">
          {fileName}
        </CustomTypography>
      )}

      {errors && errors.length ? <FormErrorMessage error={errors[0]} /> : null}
    </>
  );
}
