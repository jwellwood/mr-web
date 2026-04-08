import { type IListItem } from '../../components/lists';
import { LINK_TYPE } from '../../constants';

export const PAGES = {
  TROPHY: 'Trophy',
  ADD_TROPHY: 'Add New Trophy',
  EDIT_TROPHY: 'Edit Trophy',
} as const;

export type PAGES_TYPE = (typeof PAGES)[keyof typeof PAGES];

export const TROPHY_ADMIN_LINKS: IListItem[] = [
  {
    label: 'Edit Trophy',
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
];
