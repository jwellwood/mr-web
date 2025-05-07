import React from 'react';
import { CustomLinkButton } from 'components/buttons';
import { CenteredGrid } from 'components/grids';
import StatIcon from 'components/icons/StatIcon';
import { CustomTypography } from 'components/typography';
import { AUTH } from 'router/paths';

interface Props {
  success: boolean;
  errorMessage: null | string;
}

const ValidatedEmail: React.FC<Props> = ({ success, errorMessage }) => {
  return (
    <CenteredGrid>
      {success ? (
        <StatIcon icon={success ? 'app' : null} size="6rem" />
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
      <CustomLinkButton type="contained" link={AUTH.SIGN_IN}>
        Go to sign in
      </CustomLinkButton>
    </CenteredGrid>
  );
};

export default ValidatedEmail;
