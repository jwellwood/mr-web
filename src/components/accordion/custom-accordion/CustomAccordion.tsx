import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ReactElement, SyntheticEvent, useState } from 'react';
import { CustomTypography } from '../..';
import { theme } from '../../../theme';
import { APP_ICONS, AppIcon } from '../../icons';

interface Props {
  title: ReactElement | string;
  isExpanded: boolean;
  children: ReactElement;
  onToggle?: (expanded: boolean) => void;
}

export default function CustomAccordion({ title, children, isExpanded, onToggle }: Props) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleChange = (_event: SyntheticEvent, isNowExpanded: boolean) => {
    setExpanded(isNowExpanded);
    onToggle?.(isNowExpanded);
  };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        elevation={0}
        sx={{
          bgcolor: theme.palette.dark.main,
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          component="div"
          expandIcon={<AppIcon icon={APP_ICONS.ARROW_DOWN} color="label" />}
          sx={{ bgcolor: theme.palette.dark.main, border: 'none', cursor: 'pointer' }}
        >
          {typeof title === 'string' ? (
            <CustomTypography color="error" bold size="xs">
              {title}
            </CustomTypography>
          ) : (
            title
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: theme.palette.dark.main, border: 'none', py: 1, px: 0 }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
