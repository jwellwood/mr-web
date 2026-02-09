import { Components } from '@mui/material';
import { MuiButton } from './components/MuiButton';
import { MuiDialogContent } from './components/MuiDialogContent';
import { MuiFormControl } from './components/MuiFormControl';
import { MuiInputBase, MuiPickersInputBase } from './components/MuiInputBase';
import { MuiInputLabel } from './components/MuiInputLabel';
import { MuiListItem } from './components/MuiListItem';
import { MuiTab } from './components/MuiTab';

export const components = {
  MuiFormControl,
  MuiInputBase,
  MuiPickersInputBase, // date input
  MuiInputLabel,
  MuiButton,
  MuiTab,
  MuiListItem,
  MuiDialogContent,
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
