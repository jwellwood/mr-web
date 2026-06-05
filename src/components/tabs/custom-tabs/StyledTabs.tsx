import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import React from 'react';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  level: 'primary' | 'secondary' | 'buttons';
}

const StyledTabs = styled(({ level, ...props }: StyledTabsProps) => (
  <Tabs
    variant="scrollable"
    scrollButtons="auto"
    allowScrollButtonsMobile
    {...props}
    TabIndicatorProps={
      level === 'buttons'
        ? undefined
        : {
            children: <span className="MuiTabs-indicatorSpan" />,
          }
    }
  />
))<StyledTabsProps>(({ theme, level }) => ({
  '& .MuiTabs-scrollButtons': {
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
  },
  '& .MuiTabs-indicator': {
    display: level === 'buttons' ? 'none' : 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: theme.palette.primary.dark,
  },
  '& .MuiTabs-flexContainer': {
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: level === 'buttons' ? 'flex-start' : 'center',
    gap: level === 'buttons' ? theme.spacing(1) : 0,
  },
}));

export default StyledTabs;
