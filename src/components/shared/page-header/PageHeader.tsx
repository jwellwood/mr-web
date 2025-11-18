import { AppBar, Toolbar, Slide, useScrollTrigger } from '@mui/material';
import React, { ReactElement } from 'react';

import { BackButton } from '../../buttons';
import { CustomTypography } from '../../typography';
import { theme } from '../../../theme';
import EditLinksModal from '../../modals/EditLinksModal';
import { IListItem } from '../../lists/types';
import { SideDrawer } from '../../navigation';

interface Props {
  title: string;
  backButton?: boolean;
  links?: IListItem[];
  children: React.ReactElement;
}

export default function PageHeader({ title, children, backButton = true, links }: Props) {
  function HideOnScroll({ children }: { children: ReactElement }) {
    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <>
      <HideOnScroll>
        <AppBar sx={{ background: theme.palette.dark.main }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {backButton && <BackButton />}
            {title && (
              <CustomTypography bold color="data">
                {title}
              </CustomTypography>
            )}
            {links?.length && <EditLinksModal data={links} />}
            <SideDrawer />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {children}
    </>
  );
}
