import React from 'react';
import List from '@mui/material/List';
import { IListItem } from '../../types';
import ListItemLink from './ListItemLink';

interface Props {
  links: IListItem[];
  onClick?: () => void;
  dense?: boolean;
}

const LinksList: React.FC<Props> = ({ links, onClick, dense = true }) => {
  return (
    <List dense={dense}>
      {links
        .filter(link => !link.disabled)
        .map((item, i) => {
          return <ListItemLink key={item.link + i.toString()} data={item} onClick={onClick} />;
        })}
    </List>
  );
};

export default LinksList;
