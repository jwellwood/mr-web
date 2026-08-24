import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { theme } from '../../../theme';
import { CustomStack } from '../../grids';
import { APP_ICONS, AppIcon } from '../../icons';
import { CustomTypography } from '../../typography';

interface Props {
  title?: string | React.ReactNode;
  handleClose?: () => void;
}

export default function DrawerHeader({ title, handleClose }: Props) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        width: '100vw',
        marginLeft: '-16px',
        marginRight: '-16px',
        marginBottom: '-8px',
        background: theme.palette.secondary.main,
      }}
    >
      <Toolbar>
        <CustomStack direction="row" justify="space-between">
          {title ? (
            <CustomTypography bold color="data">
              {title}
            </CustomTypography>
          ) : (
            <span />
          )}
          <AppIcon icon={APP_ICONS.CROSS} color="label" onClick={handleClose} />
        </CustomStack>
      </Toolbar>
    </AppBar>
  );
}
