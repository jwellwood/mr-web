import { LINK_TYPE } from '../../constants';
import { IListItem } from '../../components/lists/types';

export const PAGES = {
  MATCH: 'Match',
  ADD_MATCH: 'Add Match',
  EDIT_MATCH: 'Edit Match',
  DELETE_MATCH: 'Delete Match',
};

export const MATCH_ADMIN_LINKS: IListItem[] = [
  {
    label: 'Edit Match',
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
  {
    label: 'Delete Match',
    type: LINK_TYPE.DELETE,
    link: 'edit',
  },
];
