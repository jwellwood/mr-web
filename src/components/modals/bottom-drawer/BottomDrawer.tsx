import Drawer from '@mui/material/Drawer';
import React, { ReactNode } from 'react';
import { theme } from '../../../theme';
import DrawerHeader from './DrawerHeader';

interface Props {
  children: ReactNode;
  title?: string | ReactNode;
  buttonElement: React.ReactElement;
}

export default function BottomDrawer({ children, title, buttonElement }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span
        role="button"
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
        }}
        onClick={handleClickOpen}
      >
        {buttonElement}
      </span>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 1300 }}
        slotProps={{
          paper: {
            sx: {
              borderTop: `1px solid ${theme.palette.secondary.light}`,
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '0px 16px 16px 16px',
              maxHeight: '80vh',
              backgroundColor: theme.palette.secondary.main,
            },
          },
        }}
      >
        <DrawerHeader title={title} handleClose={handleClose} />
        {children}
      </Drawer>
    </div>
  );
}
