import { LinkButton } from '../../../components/buttons';
import { StatIcon } from '../../../components/icons';
import { CustomTypography } from '../../../components/typography';
import { AUTH_PATHS } from '../router';

interface Props {
  success: boolean;
  errorMessage: null | string;
}

export default function ValidatedEmail({ success, errorMessage }: Props) {
  return (
    <div>
      {success ? (
        <StatIcon icon={success ? 'app' : undefined} size="6rem" />
      ) : (
        <>
          <CustomTypography color="error" size="lg" bold>
            Oops!
          </CustomTypography>
          <CustomTypography color="warning">
            There was a problem with your verification.
            {errorMessage}
            Contact your team admin
          </CustomTypography>
          <div style={{ marginBottom: '10px' }}></div>
        </>
      )}
      <LinkButton type="contained" link={AUTH_PATHS.SIGN_IN}>
        Go to sign in
      </LinkButton>
    </div>
  );
}
