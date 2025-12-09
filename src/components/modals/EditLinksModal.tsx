import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomButton } from '../buttons';
import { SectionContainer } from '../containers';
import LinksList from '../lists/LinksList';
import { theme } from '../../theme';
import { IListItem } from '../lists/types';

interface Props {
  data: IListItem[];
  title?: string | ReactNode;
}

const EditLinksModal: React.FC<Props> = ({ data, title }) => {
  const addLinks = data.filter(item => item.type === 'add');
  const editLinks = data.filter(item => item.type === 'edit');
  const deleteLinks = data.filter(item => item.type === 'delete');
  const {
    palette: { success, warning, error },
  } = theme;

  const sections = [
    { links: addLinks, color: success.light },
    { links: editLinks, color: warning.main },
    { links: deleteLinks, color: error.main },
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
          <Button onClick={handleClose} color="primary" autoFocus>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditLinksModal;
