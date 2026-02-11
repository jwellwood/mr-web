import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../typography';
import { type IListItem } from '../types';

interface Props {
  data?: readonly IListItem[];
  labelSize?: string;
  loading?: boolean;
}
export default function TextList({ data = [], labelSize, loading }: Props) {
  return (
    <List dense>
      {data.map((item, i) => {
        const { label, secondary, value, avatar, icon, border, onClick } = item;
        const valueDisplay =
          typeof value === 'string' || typeof value === 'number' ? (
            loading ? (
              <CustomSkeleton width="50px" height="20px" />
            ) : (
              <CustomTypography color="data" bold size="sm">
                {value}
              </CustomTypography>
            )
          ) : (
            <>{loading ? <CustomSkeleton width="50px" height="24px" /> : value}</>
          );

        return (
          <ListItem
            key={i}
            onClick={onClick}
            secondaryAction={valueDisplay}
            sx={{
              borderBottom: border ? '0.2px solid white' : '',
            }}
          >
            {avatar && <ListItemAvatar>{avatar}</ListItemAvatar>}
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText
              sx={{ margin: '0px' }}
              primary={
                loading ? (
                  <CustomSkeleton width="200px" height="24px" margin="0px" />
                ) : (
                  <CustomTypography color={secondary ? 'data' : 'label'} size={labelSize}>
                    {label}
                  </CustomTypography>
                )
              }
              secondary={
                <CustomTypography color={label ? 'label' : 'data'}>{secondary}</CustomTypography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
