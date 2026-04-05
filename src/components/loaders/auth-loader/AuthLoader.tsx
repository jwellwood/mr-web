import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '../../typography';
import LazyLoader from '../lazy-loader/LazyLoader';
import Spinner from '../spinner/Spinner';

export default function AuthLoader() {
  const { t } = useTranslation('components');
  return (
    <Stack spacing={10} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <LazyLoader />
      <div>
        <Spinner />
      </div>
      <CustomTypography color="label">{t('LOADERS.AUTH')}</CustomTypography>
    </Stack>
  );
}
