import type { IListItem } from '../../components/lists';
import { LINK_TYPE } from '../../constants';

// TODO: remove file if no other exports remain
export const MATCH_ADMIN_LINKS: IListItem[] = [
  {
    label: 'Edit Match',
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
];
