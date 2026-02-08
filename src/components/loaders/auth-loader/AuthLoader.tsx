import { Stack } from '@mui/material';

import Spinner from '../Spinner';
import LazyLoader from '../lazy-loader/LazyLoader';
import { CustomTypography } from '../../typography';

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
