import { CustomTypography, MutationError } from '../../../components';
import { CustomButton } from '../../../components/buttons';
import { CustomStack } from '../../../components/grids';
import { AppIcon } from '../../../components/icons';
import { TApolloError } from '../../../types/apollo';
import { AUTH_PATHS } from '../router';
import { T_VERIFY_EMAIL } from '../types';
import AuthLayout from './AuthLayout';

interface Props {
  data?: T_VERIFY_EMAIL | null;
  error?: TApolloError;
}

export default function ValidatedEmail({ data, error }: Props) {
  const success = data?.VERIFY_EMAIL?.email;

  return (
    <AuthLayout>
      <CustomStack>
        <CustomTypography color={success ? 'primary' : 'error'}>
          {success ? 'Email verified successfully' : 'Email verification failed'}
        </CustomTypography>
        <AppIcon
          icon={success ? 'check' : 'cross'}
          size="6rem"
          color={success ? 'primary' : 'error'}
        />
        <div style={{ marginBottom: '10px' }}></div>
        <CustomButton variant="contained" link={AUTH_PATHS.SIGN_IN}>
          Go to sign in
        </CustomButton>
        {error ? <MutationError error={error} /> : null}
      </CustomStack>
    </AuthLayout>
  );
}
