import { Alert } from '@mui/material';
import { CustomTypography } from '../../typography';

interface Props {
  title?: string;
  type: 'error' | 'success' | 'info' | 'warning';
  text: string;
}

export default function CustomAlert({ type, text }: Props) {
  return (
    <Alert severity={type} variant="outlined" icon={false}>
      <CustomTypography color={type} bold>
        {text}
      </CustomTypography>
    </Alert>
  );
}
