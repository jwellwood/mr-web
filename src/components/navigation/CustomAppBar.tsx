import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { BackButton } from '../buttons';
import { CustomTypography } from '../typography';
import HideOnScroll from './HideOnScroll';
import SideDrawer from './SideDrawer';
import { theme } from '../../theme';
import { ReactNode } from 'react';

interface Props {
  children: React.ReactElement;
  title?: string;
  actionButton?: ReactNode;
}

const CustomAppBar: React.FC<Props> = ({ title, children, actionButton }) => {
  return (
    <>
      <HideOnScroll>
        <AppBar sx={{ background: theme.palette.dark.main }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <BackButton />
            {title && (
              <CustomTypography bold color="data">
                {title}
              </CustomTypography>
            )}
            {actionButton}
            <SideDrawer />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {children}
    </>
  );
};

export default CustomAppBar;
