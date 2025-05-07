import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CustomTypography } from '../typography';
import { IListItem } from '../../types';

interface Props {
  data: IListItem[];
  labelSize?: string;
  loading?: boolean;
}

const TextList: React.FC<Props> = ({ data, labelSize }) => {
  return (
    <List dense>
      {data.map((item, i) => {
        const { label, secondary, value, avatar, icon, border, onClick } = item;

        const valueDisplay =
          typeof value === 'string' || typeof value === 'number' ? (
            <CustomTypography color="data" bold size="xs">
              {value}
            </CustomTypography>
          ) : (
            <>{value}</>
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
              sx={{ marginTop: 0, marginBottom: 0 }}
              primary={
                <CustomTypography
                  color={secondary ? 'data' : 'label'}
                  size={labelSize}
                >
                  {label}
                </CustomTypography>
              }
              secondary={
                <CustomTypography color={label ? 'label' : 'data'}>
                  {secondary}
                </CustomTypography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default TextList;
