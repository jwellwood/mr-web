import AppBar from '@mui/material/AppBar';
import { SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TTabType } from '../../../constants';
import { theme } from '../../../theme';
import { ITab } from '../types';
import StyledTab from './StyledTab';
import StyledTabs from './StyledTabs';
import TabPanel from './TabPanel';

interface TabProps {
  type: TTabType;
  tabs: ITab[];
  level: 'primary' | 'secondary';
}

export default function CustomTabs({ type, tabs, level }: TabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isPrimary = level === 'primary';
  const rawIndex = Number(searchParams.get(type) ?? 0);
  const currentIndex = rawIndex < tabs.length ? rawIndex : 0;
  const handleChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
    setSearchParams(
      prev => {
        prev.set(type, String(newValue));
        return prev;
      },
      { replace: true }
    );
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
          <StyledTabs value={currentIndex} onChange={handleChange}>
            {tabs.map((tab: ITab, i: number) => (
              <StyledTab key={i} label={tab.label} icon={tab.icon} />
            ))}
          </StyledTabs>
        </AppBar>
      </>

      {tabs.map((tab: ITab, i: number) => (
        <TabPanel key={i} value={currentIndex} index={i}>
          {tab.component}
        </TabPanel>
      ))}
    </>
  );
}
