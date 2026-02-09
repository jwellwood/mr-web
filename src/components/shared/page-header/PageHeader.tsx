import { AppBar, Toolbar, Slide, useScrollTrigger } from '@mui/material';
import React, { ReactElement, Suspense } from 'react';
import { useAuth } from '../../../hooks';
import { theme } from '../../../theme';
import { BackButton } from '../../buttons';
import { IListItem } from '../../lists/types';
import { LazyLoader } from '../../loaders';
import { EditLinksModal } from '../../modals';
import NavMenu from '../../navigation/nav-menu/NavMenu';
import { CustomTypography } from '../../typography';

interface Props {
  title: string;
  backButton?: boolean;
  links?: IListItem[];
  children: React.ReactElement;
}

export default function PageHeader({ title, children, backButton = true, links }: Props) {
  const { username } = useAuth();
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
            <div>
              <NavMenu username={username} />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Suspense fallback={<LazyLoader />}>{children}</Suspense>
    </>
  );
}
