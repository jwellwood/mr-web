import { blueGrey } from '@mui/material/colors';

export const MuiInputLabel = {
  styleOverrides: {
    root: {
      fontWeight: 'bold',
      color: blueGrey[300],
      backgroundColor: 'transparent',
      '&.Mui-focused': {
        color: blueGrey[300],
        backgroundColor: 'transparent',
      },
    },
  },
};
