import { Box } from '@mui/material';
import { CustomTypography } from '../../typography';
import FormHelper from '../form-helper/FormHelper';

interface Props {
  id: string;
  label?: string | React.ReactElement;
  required?: boolean;
  helperText?: string;
}

export default function FormLabel({ id, label, required = false, helperText }: Props) {
  return (
    <Box
      component="label"
      role="label"
      htmlFor={id}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        pl: 1,
      }}
    >
      <CustomTypography bold color="label" size="xs">
        {label} {required && '*'}{' '}
      </CustomTypography>

      {helperText && <FormHelper inputName={label?.toString()} helperText={helperText} />}
    </Box>
  );
}
