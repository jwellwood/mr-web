import { LinkButton } from '../../../components/buttons';
import { CenteredGrid } from '../../../components/grids';
import StatIcon from '../../../components/icons/StatIcon';
import { CustomTypography } from '../../../components/typography';
import { AUTH } from '../../../router/routes/paths';

interface Props {
  success: boolean;
  errorMessage: null | string;
}

export default function ValidatedEmail({ success, errorMessage }: Props) {
  return (
    <CenteredGrid>
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
      <LinkButton type="contained" link={AUTH.SIGN_IN}>
        Go to sign in
      </LinkButton>
    </CenteredGrid>
  );
}
