import { IListItem } from '../../components/lists/types';
import { LINK_TYPE } from '../../constants';

export const PAGES = {
  PLAYER: 'Player',
  ADD_PLAYER: 'Add Player',
  EDIT_PLAYER: 'Edit Player',
  EDIT_PLAYER_PHOTO: 'Edit Player Photo',
  DELETE_PLAYER: 'Delete Player',
} as const;

export const PLAYER_ADMIN_LINKS: IListItem[] = [
  {
    label: 'Edit Player',
    type: LINK_TYPE.EDIT,
    link: 'edit',
  },
  {
    label: 'Edit Photo',
    type: LINK_TYPE.EDIT,
    link: 'edit_photo',
  },
  {
    label: 'Delete Player',
    type: LINK_TYPE.DELETE,
    link: 'delete',
  },
];

export const POSITIONS = {
  GK: 'GK',
  DF: 'DF',
  MF: 'MF',
  FW: 'FW',
  NONE: '',
} as const;

export type TPosition = (typeof POSITIONS)[keyof typeof POSITIONS];
