import { styled, Tab } from '@mui/material';

interface StyledTabProps extends React.ComponentProps<typeof Tab> {
  level: 'primary' | 'secondary' | 'buttons';
}

const StyledTab = styled(Tab, {
  shouldForwardProp: prop => prop !== 'level',
})<StyledTabProps>(({ theme, level }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '12px',
  marginRight: level === 'buttons' ? 0 : theme.spacing(1),
  color: level === 'buttons' ? theme.palette.label.main : 'rgba(255, 255, 255, 0.7)',
  minHeight: level === 'buttons' ? 36 : 'auto',
  borderRadius: level === 'buttons' ? theme.spacing(4) : 0,
  borderBottom: level === 'buttons' ? `1px solid ${theme.palette.secondary.main}` : 'none',
  backgroundColor: 'transparent',
  '&.Mui-selected': {
    color: level === 'buttons' ? theme.palette.primary.main : '#fff',
    fontSize: level === 'buttons' ? '12px' : '14px',
    backgroundColor: level === 'buttons' ? theme.palette.secondary.main : 'transparent',
    borderBottom: level === 'buttons' ? `1px solid ${theme.palette.primary.dark}` : 'none',
  },
  '&.MuiTab-fullWidth': {
    padding: '0px',
    marginRight: '0px',
  },
  '&.MuiTab-root': {
    padding: level === 'buttons' ? theme.spacing(0.75, 1.5) : '0px',
    marginRight: '0px',
  },
}));

export default StyledTab;
