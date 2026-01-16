import List from '@mui/material/List';

import ListItemLink from './ListItemLink';
import { IListItem } from '../types';
import ListLoading from '../list-loading/ListLoading';

interface Props {
  links?: IListItem[];
  loading?: boolean;
  rows?: number;
  onClick?: () => void;
}

export default function LinksList({ links, loading, rows = 1, onClick }: Props) {
  const skeletonParts = {
    icon: links?.some(link => !!link.icon),
    avatar: links?.some(link => !!link.avatar),
    label: links?.some(link => !!link.label),
    secondary: links?.some(link => !!link.secondary),
    value: links?.some(link => !!link.value),
  };

  return loading ? (
    <ListLoading {...skeletonParts} rows={rows} />
  ) : (
    <List dense>
      {links?.map((item, i) => {
        return (
          <ListItemLink
            key={item.link + i.toString()}
            data={item}
            onClick={onClick}
            loading={loading}
          />
        );
      })}
    </List>
  );
}
