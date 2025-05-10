import React from 'react';
import Divider from '@mui/material/Divider';
import {theme} from "../../theme";

interface Props {
  isVertical?: boolean;
  hasMargin?: boolean;
}

const CustomDivider: React.FC<Props> = ({ isVertical, hasMargin }) => {
  return isVertical ? (
    <Divider
      orientation='vertical'
      sx={{ background: theme.palette.primary.dark, width: '3px' }}
      flexItem
    />
  ) : (
    <Divider
      sx={
        hasMargin
          ? { marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }
          : {}
      }
    />
  );
};

export default CustomDivider;
