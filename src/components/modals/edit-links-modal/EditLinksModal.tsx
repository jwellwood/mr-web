import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { ReactNode } from 'react';
import { theme } from '../../../theme';
import { CustomButton } from '../../buttons';
import { SectionContainer } from '../../containers';
import LinksList from '../../lists/links-list/LinksList';
import { IListItem } from '../../lists/types';

interface Props {
  data: IListItem[];
  title?: string | ReactNode;
}

export default function EditLinksModal({ data, title }: Props) {
  const addLinks = data.filter(item => item.type === 'add');
  const editLinks = data.filter(item => item.type === 'edit');
  const {
    palette: { success, warning },
  } = theme;

  const sections = [
    { links: addLinks, color: success.light },
    { links: editLinks, color: warning.main },
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
        Admin
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
                <SectionContainer key={section.color}>
                  <LinksList links={section.links} />
                </SectionContainer>
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="tertiary" autoFocus>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
