import React from 'react';
import List from '@mui/material/List';
import { IListItem } from '../../types';
import ListItemLink from './ListItemLink';

interface Props {
  links: IListItem[];
  onClick?: () => void;
}

const LinksList: React.FC<Props> = ({ links, onClick }) => {
  return (
    <List dense>
      {links
        .filter(link => !link.disabled)
        .map((item, i) => {
          return <ListItemLink key={item.link + i.toString()} data={item} onClick={onClick} />;
        })}
    </List>
  );
};

export default LinksList;
