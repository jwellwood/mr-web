import React from 'react';
import { Box } from '@mui/system';
import AppIcon from '../icons/AppIcon';
import LinksList from '../lists/LinksList';
import { useCustomParams } from '../../hooks/useCustomParams';
import Footer from './Footer';
import { HOME, PROFILE } from '../../router/routes/paths.ts';
import { theme } from '../../theme';

interface Props {
  toggleDrawer: () => void;
}

const SidebarList: React.FC<Props> = ({ toggleDrawer }) => {
  const { teamId, orgId } = useCustomParams();
  const links = [
    {
      label: 'Home',
      icon: <AppIcon icon="home" color="white" />,
      link: HOME.HOME,
    },
    {
      label: 'Profile',
      icon: <AppIcon icon="profile" color="white" />,
      link: PROFILE.PROFILE,
    },
    {
      label: 'Organization',
      icon: <AppIcon icon="league" color="white" />,
      link: `/org/${orgId}`,
      disabled: !orgId,
    },
    {
      label: 'Team',
      icon: <AppIcon icon="team" color="white" />,
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
