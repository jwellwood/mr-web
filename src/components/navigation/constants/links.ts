import { IIconType } from '../icons/types';
import { sidebarText, navbarText } from 'i18n';
import { HOME, PROFILE } from 'router/paths';

export const sidebarLinks: {
  link: string;
  text: string;
  guard: string;
  icon: IIconType;
}[] = [
  {
    icon: 'home',
    text: sidebarText.HOME,
    link: HOME.HOME,
    guard: 'public',
  },
  {
    icon: 'user',
    text: sidebarText.PROFILE,
    link: PROFILE.PROFILE,
    guard: 'public',
  },
];

export const navbarLinks: {
  link: string;
  label: string;
  value: string;
  icon: IIconType;
}[] = [
  {
    link: HOME.HOME,
    label: navbarText.HOME,
    value: HOME.HOME,
    icon: 'home',
  },
  {
    link: PROFILE.PROFILE,
    label: navbarText.PROFILE,
    value: PROFILE.PROFILE,
    icon: 'profile',
  },
];
