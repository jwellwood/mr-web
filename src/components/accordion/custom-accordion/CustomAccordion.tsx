import { ReactElement } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { theme } from '../../../theme';

interface Props {
  title: ReactElement;
  isExpanded: boolean;
  children: ReactElement;
}

export default function CustomAccordion({ title, children, isExpanded }: Props) {
  return (
    <>
      <Accordion defaultExpanded={isExpanded} elevation={0}>
        <AccordionSummary sx={{ bgcolor: theme.palette.secondary.dark, border: 'none' }}>
          {title}
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: theme.palette.dark.main, border: 'none' }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
