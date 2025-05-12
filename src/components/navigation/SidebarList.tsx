import React from 'react';
import { Box } from '@mui/system';
import CustomAvatar from '../avatars/CustomAvatar';
import AppIcon from '../icons/AppIcon';
import LinksList from '../lists/LinksList';
import { useCustomParams } from '../../hooks/useCustomParams';
import Footer from './Footer';
import { HOME, PROFILE } from '../../router/paths.ts';
import { theme } from '../../theme';

interface Props {
  toggleDrawer: () => void;
}

const SidebarList: React.FC<Props> = ({ toggleDrawer }) => {
  const { teamId, orgId } = useCustomParams();
  const links = [
    {
      label: 'Home',
      avatar: (
        <CustomAvatar>
          <AppIcon icon="home" />
        </CustomAvatar>
      ),
      link: HOME.HOME,
    },
    {
      label: 'Profile',
      avatar: (
        <CustomAvatar>
          <AppIcon icon="profile" />
        </CustomAvatar>
      ),
      link: PROFILE.PROFILE,
    },
    {
      label: 'Organization',
      avatar: (
        <CustomAvatar>
          <AppIcon icon="league" />
        </CustomAvatar>
      ),
      link: `/org/${orgId}`,
      disabled: !orgId,
    },
    {
      label: 'Team',
      avatar: (
        <CustomAvatar>
          <AppIcon icon="team" />
        </CustomAvatar>
      ),
      link: `/org/${orgId}/team/${teamId}`,
      disabled: !teamId,
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        width: '75vw',
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        paddingLeft: theme.spacing(2),
        background: theme.palette.dark.main,
      }}
    >
      <LinksList links={links} onClick={toggleDrawer} />
      <Footer toggleDrawer={toggleDrawer} />
    </Box>
  );
};

export default SidebarList;
