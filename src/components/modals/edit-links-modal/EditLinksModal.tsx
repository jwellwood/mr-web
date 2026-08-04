import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../buttons';
import { TColor } from '../../buttons/types';
import { SectionContainer } from '../../containers';
import { type IListItem } from '../../lists';

interface Props {
  data: IListItem[];
  title?: string | ReactNode;
}

export default function EditLinksModal({ data, title }: Props) {
  const { t } = useTranslation('components');
  const addLinks = data.filter(item => item.type === 'add');
  const editLinks = data.filter(item => item.type === 'edit');

  const sections = [
    { type: 'add', links: addLinks, color: 'primary' },
    { type: 'edit', links: editLinks, color: 'warning' },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton onClick={handleClickOpen} color="tertiary">
        {t('MENU.ADMIN')}
      </CustomButton>
      <Dialog
        fullWidth
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {title ? (
          <DialogTitle id="responsive-dialog-title" color="primary">
            {title}
          </DialogTitle>
        ) : null}
        <DialogContent>
          {sections.map(
            section =>
              section.links.length > 0 && (
                <SectionContainer
                  key={section.color}
                  type={section.type === 'add' ? 'success' : 'warning'}
                >
                  {section.links.map(link => (
                    <div key={link.link}>
                      <CustomButton link={link.link} variant="text" color={section.color as TColor}>
                        {link.label}
                      </CustomButton>
                    </div>
                  ))}
                </SectionContainer>
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="tertiary" autoFocus>
            {t('BUTTONS.CANCEL')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
