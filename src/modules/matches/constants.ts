import type { IListItem } from '../../components/lists';
import { LINK_TYPE } from '../../constants';

export const PAGES = {
  MATCH: 'Match',
  ADD_MATCH: 'Add Match',
  EDIT_MATCH: 'Edit Match',
};

export const MATCH_ADMIN_LINKS: IListItem[] = [
  {
    label: 'Edit Match',
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
];
