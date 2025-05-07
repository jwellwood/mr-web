import * as React from 'react';
import { DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { SectionContainer } from 'components/containers';
import TextList from 'components/lists/TextList';
import { CustomTypography } from 'components/typography';
import { IListItem } from 'types';

export interface SimpleDialogProps {
  data: IListItem[];
  open: boolean;
  selectedValue?: string;
  onClose: (value: string, reason?: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, data } = props;

  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  const listData: IListItem[] = data.map((item) => {
    const isCurrentSeason = item.label === selectedValue;
    return {
      label: (
        <CustomTypography
          size="sm"
          bold
          color={isCurrentSeason ? 'primary' : 'data'}
        >
          {item.label}
        </CustomTypography>
      ),
      onClick: () => handleListItemClick(String(item.value)),
    };
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    >
      <DialogTitle>
        <CustomTypography bold color="secondary">
          Select Season
        </CustomTypography>
      </DialogTitle>
      <DialogContent>
        <SectionContainer>
          <TextList data={listData} />
        </SectionContainer>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  currentSeason: string;
  seasonId: string;
  seasonsList: IListItem[];
  onClick: (seasonId: string) => void;
}

const SelectSeasonModal: React.FC<Props> = ({
  seasonsList,
  onClick,
  seasonId,
  currentSeason,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string, reason) => {
    if (reason === 'backdropClick') {
      onClick(seasonId);
    } else {
      onClick(value);
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        <CustomTypography bold size="xs" color="secondary">
          {currentSeason}
        </CustomTypography>
      </Button>
      <SimpleDialog
        data={seasonsList}
        selectedValue={currentSeason}
        open={open}
        onClose={(e, reason) => handleClose(e, reason)}
      />
    </div>
  );
};

export default SelectSeasonModal;
