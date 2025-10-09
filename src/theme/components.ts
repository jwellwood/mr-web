import { Components } from '@mui/material';
import { MuiFormControl } from './components/MuiFormControl';
import { MuiInputLabel } from './components/MuiInputLabel';
import { MuiInputBase, MuiPickersInputBase } from './components/MuiInputBase';
import { MuiTab } from './components/MuiTab';
import { MuiButton } from './components/MuiButton';
import { MuiListItem } from './components/MuiListItem';

export const components = {
  MuiFormControl,
  MuiInputBase,
  MuiPickersInputBase, // date input
  MuiInputLabel,
  MuiButton,
  MuiTab,
  MuiListItem,
  MuiCssBaseline: {
    styleOverrides: {
      'input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px transparent inset',
        WebkitTextFillColor: '#fff',
        transition: 'background-color 5000s ease-in-out 0s',
      },
      'input:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 100px transparent inset',
        WebkitTextFillColor: '#fff',
      },
      'input:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px transparent inset',
        WebkitTextFillColor: '#fff',
      },
      'input:-webkit-autofill:active': {
        WebkitBoxShadow: '0 0 0 100px transparent inset',
        WebkitTextFillColor: '#fff',
      },
    },
  },
} as Components;
