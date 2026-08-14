import { blueGrey } from '@mui/material/colors';

export const MuiInputLabel = {
  styleOverrides: {
    root: {
      fontWeight: 'bold',
      color: blueGrey[600],
      backgroundColor: 'transparent',
      '&.Mui-focused': {
        color: blueGrey[600],
        backgroundColor: 'transparent',
      },
    },
  },
};
