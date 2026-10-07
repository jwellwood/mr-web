import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../buttons';
import { CustomTypography } from '../../typography';
import LazyLoader from '../lazy-loader/LazyLoader';
import Spinner from '../spinner/Spinner';

interface Props {
  onRetry?: () => void;
  onSignOut?: () => void;
}

export default function AuthLoader({ onRetry, onSignOut }: Props) {
  const { t } = useTranslation('components');
  return (
    <Stack spacing={10} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <LazyLoader />
      {onRetry ? (
        <>
          <CustomTypography color="label">{t('LOADERS.AUTH_ERROR')}</CustomTypography>
          <CustomButton onClick={onRetry}>{t('BUTTONS.RETRY')}</CustomButton>
          {onSignOut && (
            <CustomButton variant="text" onClick={onSignOut} color="tertiary">
              {t('MENU.LOGOUT')}
            </CustomButton>
          )}
        </>
      ) : (
        <>
          <div>
            <Spinner />
          </div>
          <CustomTypography color="label">{t('LOADERS.AUTH')}</CustomTypography>
        </>
      )}
    </Stack>
  );
}
