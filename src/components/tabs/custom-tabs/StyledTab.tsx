import { styled, Tab } from '@mui/material';
import { ReactElement } from 'react';

interface StyledTabProps {
  label: string | ReactElement;
  icon?: string | ReactElement;
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
      fontSize: '14px',
    },
    '&.MuiTab-fullWidth': {
      padding: '0px',
      marginRight: '0px',
    },
    '&.MuiTab-root': {
      padding: '0px',
      marginRight: '0px',
    },
  })
);

export default StyledTab;
