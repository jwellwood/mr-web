import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import { useAuth } from '../../../hooks';
import { useLogout } from '../../../modules/auth/hooks/useLogout.hook';
import { HOME_PATHS } from '../../../modules/home/router';
import { PROFILE_PATHS } from '../../../modules/profile/router';
import { getInitials } from '../../../utils';
import { CustomAvatar } from '../../avatars';
import { LogoutButton } from '../../buttons';
import { SectionContainer } from '../../containers';
import { AppIcon } from '../../icons';
import { LinksList } from '../../lists';
import { CustomTypography } from '../../typography';
import Footer from '../Footer';

interface Props {
  username?: string;
}

export default function NavMenu({ username }: Props) {
  const { onLogout } = useLogout();
  const { isAuth } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const links = [
    {
      label: (
        <CustomTypography bold color="data">
          Home
        </CustomTypography>
      ),
      link: HOME_PATHS.HOME,
    },
    {
      label: (
        <CustomTypography bold color="data">
          Profile
        </CustomTypography>
      ),
      link: PROFILE_PATHS.PROFILE,
    },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <CustomAvatar onClick={handleClick} border={username ? 'secondary' : 'none'}>
          {username ? (
            <CustomTypography bold size="sm" color="data">
              {getInitials(username)}
            </CustomTypography>
          ) : (
            <AppIcon icon="menu" />
          )}
        </CustomAvatar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 200,
              overflow: 'visible',
              mt: 1.5,
            },
          },
        }}
      >
        <SectionContainer>
          <LinksList links={links} />

          {isAuth && (
            <>
              <Divider sx={{ m: '20px' }} />
              <Stack onClick={handleClose}>
                <LogoutButton onClick={onLogout} />
              </Stack>
            </>
          )}
        </SectionContainer>
        <Footer />
      </Menu>
    </>
  );
}
