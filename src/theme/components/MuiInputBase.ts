import { teal, blueGrey } from '@mui/material/colors';

export const MuiInputBase = {
  styleOverrides: {
    root: {
      fontWeight: 'bold',
      color: teal['A400'],
      '& input.Mui-disabled': {
        color: blueGrey[700],
        WebkitTextFillColor: blueGrey[700],
      },
    },
  },
};

export const MuiPickersInputBase = {
  styleOverrides: {
    root: {
      fontWeight: 'bold',
      color: teal['A400'],
      backgroundColor: 'green',
      '& input.Mui-disabled': {
        color: blueGrey[700],
        WebkitTextFillColor: blueGrey[700],
      },
      '&.Mui-disabled .MuiPickersSectionList-sectionContent': {
        color: blueGrey[700],
      },
    },
  },
};
