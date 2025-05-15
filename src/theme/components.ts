import { Components } from '@mui/material';
import { blueGrey, teal } from '@mui/material/colors';

export const components = {
  MuiFormControl: {
    styleOverrides: {
      root: {
        marginTop: '4px',
      },
      marginNormal: {
        marginTop: '4px',
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontWeight: 'bold',
        color: teal[50],
        backgroundColor: 'transparent',
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        // border: `${blueGrey[200]} 1px solid`,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        '&.Mui-focused': {
          backgroundColor: 'transparent',
        },
      },

      input: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #fff inset',
          WebkitTextFillColor: blueGrey[900],
        },
      },
    },
  },
  MuiInputLabel: {
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
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
        textTransform: 'none',
        textDecoration: 'none',
        fontWeight: 'bold',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        padding: '0px',
        textTransform: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        background: 'transparent',
      },
    },
  },
} as Components;
