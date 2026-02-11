import { Stack } from '@mui/material';
import { VERSION } from '../../../constants';
import { CustomTypography } from '../../typography';

const date = new Date().getFullYear();

export default function Footer() {
  return (
    <Stack direction="row" spacing={1} justifyContent="space-between" p={'0px 8px'}>
      <CustomTypography size="xs" color="label">
        {' © '}
        {date}
      </CustomTypography>
      <CustomTypography size="xs" bold color="label">
        v {VERSION}
      </CustomTypography>
    </Stack>
  );
}
