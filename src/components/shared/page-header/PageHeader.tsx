import { AppBar, Toolbar } from '@mui/material';

import { BackButton } from '../../buttons';
import { CustomTypography } from '../../typography';
import { HideOnScroll, SideDrawer } from '../../navigation';
import { theme } from '../../../theme';
import EditLinksModal from '../../modals/EditLinksModal';
import { IListItem } from '../../lists/types';

interface Props {
  title: string;
  backButton?: boolean;
  links?: IListItem[];
  children: React.ReactElement;
}

export default function PageHeader({ title, children, backButton = true, links }: Props) {
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
