import React from 'react';
import { VERSION } from '../../app/constants';
import { LogoutButton } from '../buttons';
import { CenteredGrid } from '../grids';
import { CustomTypography } from '../typography';
import { useAuth } from '../../hooks';
import { useLogout } from '../../modules/auth/hooks/useLogout.hook.ts';

const date = new Date().getFullYear();

interface Props {
  toggleDrawer: () => void;
}

const Footer: React.FC<Props> = ({ toggleDrawer }) => {
  const { isAuth } = useAuth('Footer');
  const { onLogout } = useLogout(toggleDrawer);

  return (
    <div style={{ marginTop: '20px' }}>
      <CenteredGrid>
        {isAuth && <LogoutButton onClick={onLogout} />}
        <CustomTypography size="xs" color="label">
          {'Copyright © '}
          {date}
        </CustomTypography>
        <CustomTypography size="xs" bold color="label">
          version {VERSION}
        </CustomTypography>
      </CenteredGrid>
    </div>
  );
};

export default Footer;
