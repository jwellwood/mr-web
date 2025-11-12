import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { NAV_ICONS } from '../icons/icons';
import CustomIconButton from '../buttons/CustomIconButton';
import SidebarList from './SidebarList';

const SideDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CustomIconButton onClick={toggleDrawer} icon={NAV_ICONS.MENU} size="20px" />
      <Drawer
        open={open}
        onClose={toggleDrawer}
        anchor="right"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1300,
        }}
      >
        <SidebarList toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default SideDrawer;
