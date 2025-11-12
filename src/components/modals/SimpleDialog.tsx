import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import { CustomTypography } from '../typography';
import { SectionContainer } from '../containers';
import TextList from '../lists/TextList';
import { IListItem } from '../lists/types';

interface SimpleDialogProps {
  data: IListItem[];
  open: boolean;
  selectedValue?: string;
  onClose: (value: string, reason?: string) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, data } = props;

  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  const listData: IListItem[] = data.map(item => {
    const isCurrentSeason = item.label === selectedValue;
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
