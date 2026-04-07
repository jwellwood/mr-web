import type { TFunction } from 'i18next';
import { LINK_TYPE } from '../../../constants';
import { ORG_PATHS } from '../../organization/router';

export const getCompetitionAdminLinks = (t: TFunction<'competitions'>) => [
  {
    label: t('LINKS.EDIT_COMPETITION'),
    type: LINK_TYPE.EDIT,
    link: ORG_PATHS.EDIT_COMPETITION,
  },
];
