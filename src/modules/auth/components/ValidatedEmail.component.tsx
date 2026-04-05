import { useTranslation } from 'react-i18next';
import { CustomTypography } from '../../../components';
import { CustomButton } from '../../../components/buttons';
import { CustomStack } from '../../../components/grids';
import { AppIcon } from '../../../components/icons';
import { T_VERIFY_EMAIL } from '../graphql';
import { AUTH_PATHS } from '../router';

interface Props {
  data?: T_VERIFY_EMAIL | null;
}

export default function ValidatedEmail({ data }: Props) {
  const { t } = useTranslation('auth');
  const success = data?.VERIFY_EMAIL?.email;

  return (
    <CustomStack spacing={3}>
      <CustomTypography color={success ? 'primary' : 'error'}>
        {success ? t('EMAIL_VALIDATION.SUCCESS') : t('EMAIL_VALIDATION.ERROR')}
      </CustomTypography>
      <AppIcon
        icon={success ? 'check' : 'cross'}
        size="6rem"
        color={success ? 'primary' : 'error'}
      />
      <CustomButton variant="contained" link={AUTH_PATHS.SIGN_IN}>
        {t('BUTTONS.GO_TO_SIGN_IN')}
      </CustomButton>
    </CustomStack>
  );
}
