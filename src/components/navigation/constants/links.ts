import { navbarText, sidebarText } from '../../../i18n';
import { HOME_PATHS } from '../../../modules/home/router';
import { PROFILE_PATHS } from '../../../modules/profile/router';
import { IIconType } from '../../icons/types';

export const sidebarLinks: {
  link: string;
  text: string;
  guard: string;
  icon: IIconType;
}[] = [
  {
    icon: 'home',
    text: sidebarText.HOME,
    link: HOME_PATHS.HOME,
    guard: 'public',
  },
  {
    icon: 'user',
    text: sidebarText.PROFILE,
    link: PROFILE_PATHS.PROFILE,
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
    link: HOME_PATHS.HOME,
    label: navbarText.HOME,
    value: HOME_PATHS.HOME,
    icon: 'home',
  },
  {
    link: PROFILE_PATHS.PROFILE,
    label: navbarText.PROFILE,
    value: PROFILE_PATHS.PROFILE,
    icon: 'profile',
  },
];
