import {
  green,
  blueGrey,
  teal,
  pink,
  yellow,
  amber,
} from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const main = blueGrey[900];

export const theme = createTheme({
  palette: {
    primary: {
      main: teal['A400'],
    },
    secondary: {
      main: main,
    },
    tertiary: {
      main: pink['A400'],
    },
    dark: {
      main: '#0E0D0F',
    },
    success: {
      main: green['A400'],
    },
    data: {
      main: '#fff',
    },
    label: {
      main: blueGrey[200],
    },
    gold: {
      main: yellow[600],
    },
    silver: {
      main: blueGrey[500],
    },
    bronze: {
      main: amber[700],
    },
  },
  typography: {
    fontFamily: 'Hanken Grotesk, sans-serif',
    secondaryFont: {
      fontFamily: 'Rajdhani, sans-serif',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  components: {
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
  },
});
