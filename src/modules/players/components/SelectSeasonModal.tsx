import * as React from 'react';
import Button from '@mui/material/Button';

import { CustomTypography } from '../../../components/typography';
import SimpleDialog from '../../../components/modals/SimpleDialog';
import { IListItem } from '../../../components/lists/types';
import TextList from '../../../components/lists/TextList';

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

  const handleListItemClick = (value: string) => {
    handleClose(value);
  };

  const listData: IListItem[] = seasonsList.map(item => {
    const isCurrentSeason = item.label === currentSeason;
    return {
      label: (
        <CustomTypography size="sm" bold color={isCurrentSeason ? 'primary' : 'data'}>
          {item.label}
        </CustomTypography>
      ),
      onClick: () => handleListItemClick(String(item.value)),
    };
  });

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        <CustomTypography bold size="xs" color="secondary">
          {currentSeason}
        </CustomTypography>
      </Button>
      <SimpleDialog open={open} onClose={(e, reason) => handleClose(e, reason)}>
        <TextList data={listData} />
      </SimpleDialog>
    </div>
  );
}
