import { navbarText, sidebarText } from '../../../i18n';
import { HOME_PATHS } from '../../../modules/home/router';
import { PROFILE_PATHS } from '../../../modules/profile/router';

export const sidebarLinks: {
  link: string;
  text: string;
  guard: string;
}[] = [
  {
    text: sidebarText.HOME,
    link: HOME_PATHS.HOME,
    guard: 'public',
  },
  {
    text: sidebarText.PROFILE,
    link: PROFILE_PATHS.PROFILE,
    guard: 'public',
  },
];

export const navbarLinks: {
  link: string;
  label: string;
  value: string;
}[] = [
  {
    link: HOME_PATHS.HOME,
    label: navbarText.HOME,
    value: HOME_PATHS.HOME,
  },
  {
    link: PROFILE_PATHS.PROFILE,
    label: navbarText.PROFILE,
    value: PROFILE_PATHS.PROFILE,
  },
];
