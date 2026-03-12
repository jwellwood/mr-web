import { AppBar, Toolbar, Slide, useScrollTrigger } from '@mui/material';
import React, { ReactElement, Suspense } from 'react';
import { useAuth } from '../../../hooks';
import { theme } from '../../../theme';
import { BackButton } from '../../buttons';
import { type IListItem } from '../../lists';
import { LazyLoader } from '../../loaders';
import { EditLinksModal, HelpModal, type HelpContent } from '../../modals';
import { NavMenu } from '../../navigation';
import { CustomTypography } from '../../typography';

interface Props {
  title: string;
  backButton?: boolean;
  links?: IListItem[];
  children: React.ReactElement;
  help?: HelpContent;
}

export default function PageHeader({ title, children, backButton = true, links, help }: Props) {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {backButton && <BackButton />}
              {title && (
                <CustomTypography bold color="data">
                  {title}
                </CustomTypography>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {links?.length && <EditLinksModal data={links} />}
              {help && <HelpModal help={help} />}
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
