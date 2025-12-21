import { LINK_TYPE } from '../../constants';
import { IListItem } from '../../components/lists/types.ts';

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

export const emptySelectOption = { label: '', value: '' } as const;

export const cupRoundOptions = [
  { label: '', value: '' },
  { label: 'Group', value: 'Group' },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: 'Quarter-Final', value: 'Quarter-Final' },
  { label: 'Semi-Final', value: 'Semi-Final' },
  { label: 'Final', value: 'Final' },
] as const;
