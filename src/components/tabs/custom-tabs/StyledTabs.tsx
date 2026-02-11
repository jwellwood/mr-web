import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { theme } from '../../../theme';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
  },
  '& .MuiTabs-flexContainer': {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StyledTabs;
