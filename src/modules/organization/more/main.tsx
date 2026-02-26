import { lazy } from 'react';
import { CustomTabs } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';

const OrgTeams = lazy(() => import('./containers/OrgTeams'));
const OrgSeasons = lazy(() => import('../org-seasons/containers/OrgSeasons'));
const Competitions = lazy(() => import('../competitions/containers/Competitions'));

export default function MoreTabs() {
  const tabs = [
    {
      label: 'Seasons',
      component: <OrgSeasons />,
    },
    {
      label: 'Teams',
      component: <OrgTeams />,
    },
    {
      label: 'Competitions',
      component: <Competitions />,
    },
  ];
  return <CustomTabs type={TAB_TYPES.ORG_SEASON_MORE} tabs={tabs} level="secondary" />;
}
