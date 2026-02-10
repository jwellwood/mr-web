import { Alert, Typography } from '@mui/material';
import { TApolloError } from '../../../types/apollo';

interface Props {
  error: TApolloError;
}

export default function MutationError({ error }: Props) {
  const defaultErrorMessage = 'Something went wrong. Please try again later.';
  return (
    <Alert severity="warning">
      <Typography
        style={{
          textDecoration: 'none',
        }}
      >
        {error.message || defaultErrorMessage}
      </Typography>
    </Alert>
  );
}
