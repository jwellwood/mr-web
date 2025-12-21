import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar } from '@mui/material';

import CustomSkeleton from '../../loaders/CustomSkeleton';

interface Props {
  avatar?: boolean;
  label?: boolean;
  secondary?: boolean;
  value?: boolean;
  rows?: number;
}

export default function ListLoading({ rows = 1, avatar, label, secondary, value }: Props) {
  const rowsArray = Array.from({ length: rows }, (_, i) => i);

  return (
    <List dense>
      {rowsArray.map(i => {
        return (
          <ListItem
            key={i}
            secondaryAction={value && <CustomSkeleton width="20px" height="20px" />}
          >
            {avatar && (
              <ListItemAvatar>
                <CustomSkeleton height="40px" width="40px" variant="circular" />
              </ListItemAvatar>
            )}

            <ListItemText
              sx={{
                display: 'flex',
                alignContent: 'start',
                alignItems: 'start',
                flexWrap: 'wrap',
                paddingLeft: 1,
                marginTop: 1,
                marginBottom: 1,
              }}
              primary={label && <CustomSkeleton width="120px" height="20px" />}
              secondary={secondary && <CustomSkeleton width="100px" height="20px" />}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
