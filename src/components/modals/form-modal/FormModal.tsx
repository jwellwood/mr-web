import Drawer from '@mui/material/Drawer';
import { ReactNode } from 'react';
import { theme } from '../../../theme';
import DrawerHeader from '../bottom-drawer/DrawerHeader';

interface Props {
  children: ReactNode;
  title?: string | ReactNode;
  open?: boolean;
  onClose?: () => void;
}

export default function FormModal({ children, title, open, onClose }: Props) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
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
            padding: '16px',
            paddingTop: '0px',
            maxHeight: '80vh',
            backgroundColor: theme.palette.secondary.main,
          },
        },
      }}
    >
      <DrawerHeader title={title} handleClose={handleClose} />
      {children}
    </Drawer>
  );
}
