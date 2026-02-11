import { Stack } from '@mui/material';
import { CustomTypography } from '../../typography';
import LazyLoader from '../lazy-loader/LazyLoader';
import Spinner from '../spinner/Spinner';

export default function AuthLoader() {
  return (
    <Stack spacing={10} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <LazyLoader />
      <div>
        <Spinner />
        <CustomTypography color="label">Checking authentication...</CustomTypography>
      </div>
    </Stack>
  );
}
