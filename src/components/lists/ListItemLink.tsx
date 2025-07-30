import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { ListItemAvatar, ListItemSecondaryAction, SxProps } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CustomTypography } from '../typography';
import { IListItem } from '../../types';

type Props = {
  data: IListItem;
  onClick?: () => void;
};

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const ListItemLink: React.FC<Props> = ({ data, onClick }) => {
  const { icon, label, link, avatar, value, secondary, border, styles } = data;
  const defaultBorder = border && typeof border === 'boolean' ? '0.2px solid white' : border;
  const valueDisplay =
    typeof value === 'string' ? (
      <CustomTypography color="data" bold>
        {value}
      </CustomTypography>
    ) : (
      value
    );
  return (
    <li>
      <ListItemButton
        component={Link}
        to={link as string}
        onClick={onClick}
        sx={
          (styles || {
            background: 'transparent',
            paddingTop: '0px',
            paddingBottom: '0px',
            border: defaultBorder as string,
          }) as SxProps
        }
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {avatar ? <ListItemAvatar>{avatar}</ListItemAvatar> : null}
        <ListItemText
          primary={<CustomTypography color="label">{label}</CustomTypography>}
          secondary={secondary}
          slotProps={{ secondary: { component: 'div' } }}
        />
        <ListItemSecondaryAction>{valueDisplay}</ListItemSecondaryAction>
      </ListItemButton>
    </li>
  );
};

export default ListItemLink;
