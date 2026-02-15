import AppBar from '@mui/material/AppBar';
import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getTabIndex, setTabIndex, type TabIndex } from '../../../store';
import { theme } from '../../../theme';
import { ITab } from '../types';
import StyledTab from './StyledTab';
import StyledTabs from './StyledTabs';
import TabPanel from './TabPanel';

interface TabProps {
  type: TabIndex;
  tabs: ITab[];
  level: 'primary' | 'secondary';
}

export default function CustomTabs({ type, tabs, level }: TabProps) {
  const dispatch: AppDispatch = useDispatch();
  const value = useSelector(getTabIndex);
  const isPrimary = level === 'primary';
  const handleChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
    dispatch(setTabIndex({ type, newValue }));
  };

  return (
    <>
      <>
        <AppBar
          position="sticky"
          elevation={10}
          sx={{
            marginBottom: '4px',
            background: isPrimary ? theme.palette.dark.main : theme.palette.secondary.dark,
          }}
        >
          <StyledTabs value={value[type]} onChange={handleChange}>
            {tabs.map((tab: ITab, i: number) => (
              <StyledTab key={i} label={tab.label} icon={tab.icon} />
            ))}
          </StyledTabs>
        </AppBar>
      </>

      {tabs.map((tab: ITab, i: number) => (
        <TabPanel key={i} value={value[type]} index={i}>
          {tab.component}
        </TabPanel>
      ))}
    </>
  );
}
