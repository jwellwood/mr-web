import * as React from 'react';
import Button from '@mui/material/Button';

import { CustomTypography } from '../../../components/typography';
import { IListItem } from '../../../types';
import SimpleDialog from '../../../components/modals/SimpleDialog';

interface Props {
  currentSeason?: string;
  seasonId?: string;
  seasonsList: IListItem[];
  onClick: (seasonId: string) => void;
}

export default function SelectSeasonModal({
  seasonsList,
  onClick,
  seasonId,
  currentSeason,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string, reason?: string) => {
    if (reason === 'backdropClick') {
      if (seasonId) {
        onClick(seasonId);
      }
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
}
