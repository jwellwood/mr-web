import { ApolloError } from '@apollo/client';
import { Alert, Typography } from '@mui/material';

interface Props {
  error: ApolloError;
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
