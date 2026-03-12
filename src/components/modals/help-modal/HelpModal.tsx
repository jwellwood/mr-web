import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { ReactElement, ReactNode } from 'react';
import { CustomButton } from '../../buttons';
import { SectionContainer } from '../../containers';
import { APP_ICONS, AppIcon } from '../../icons';
import { TextList } from '../../lists';
import { CustomTypography } from '../../typography';

export interface HelpContent {
  title: string;
  content: {
    title: ReactNode | string[];
    description?: ReactNode[] | string[];
  }[];
}

interface Props {
  help: HelpContent;
}

export default function HelpModal({ help }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CustomButton onClick={() => setOpen(true)} variant="text">
        <AppIcon icon={APP_ICONS.HELP} color="info" size="30px" />
      </CustomButton>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="help-dialog-title"
      >
        <DialogTitle id="help-dialog-title">
          <CustomTypography color="secondary" bold>
            {help.title} Help
          </CustomTypography>
        </DialogTitle>
        <DialogContent>
          {help.content.map((section, i) => (
            <SectionContainer key={i} title={section.title}>
              <>
                {section.description && (
                  <TextList
                    data={section.description.map((item, i) => ({
                      label: item as string | ReactElement,
                      border: i !== section.description!.length - 1,
                    }))}
                  />
                )}
              </>
            </SectionContainer>
          ))}
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setOpen(false)} variant="text" color="tertiary">
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
