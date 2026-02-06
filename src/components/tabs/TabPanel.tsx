import React, { ReactElement, Suspense } from 'react';
import Typography from '@mui/material/Typography';

import { LazyLoader, TabLoader } from '../loaders';

interface TabPanelProps {
  children: ReactElement;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  if (value !== index) return null;

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Suspense
        fallback={
          <>
            <LazyLoader />
            <TabLoader />
          </>
        }
      >
        {children}
      </Suspense>
    </Typography>
  );
};

export default TabPanel;
