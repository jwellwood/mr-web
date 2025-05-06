import React, { ReactElement } from 'react';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children: ReactElement;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  const content = <>{children}</>;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && content}
    </Typography>
  );
};

export default TabPanel;
