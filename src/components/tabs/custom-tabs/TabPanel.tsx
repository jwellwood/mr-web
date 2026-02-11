import Typography from '@mui/material/Typography';
import { ReactElement, Suspense } from 'react';
import { LazyLoader, TabLoader } from '../../loaders';

interface TabPanelProps {
  children: ReactElement;
  value: number;
  index: number;
}

export default function TabPanel({ children, value, index }: TabPanelProps) {
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
}
