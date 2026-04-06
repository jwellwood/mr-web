import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';

const Squad = lazy(() => import('./containers/Squad'));
const SquadStats = lazy(() => import('./containers/SquadStats'));
const SquadRecords = lazy(() => import('./containers/SquadRecords'));
const SquadSingleSeasonRecords = lazy(() => import('./containers/SquadSingleSeasonRecords'));
const SquadMostGoalsInMatch = lazy(() => import('./containers/SquadMostGoalsInMatch'));
const SquadMostAssistsInMatch = lazy(() => import('./containers/SquadMostAssistsInMatch'));
const PastPlayers = lazy(() => import('./containers/PastPlayers'));
const SquadStreaksRecords = lazy(() => import('./containers/SquadStreaks'));

export default function SquadTabs() {
  const { t } = useTranslation('squad');
  const tabs: ITab[] = [
    { label: t('TABS.SQUAD'), component: <Squad /> },
    { label: t('TABS.STATS'), component: <SquadStats /> },
    { label: t('TABS.PAST_PLAYERS'), component: <PastPlayers /> },
    {
      label: t('TABS.RECORDS'),
      component: (
        <>
          <SquadRecords />
          <SquadSingleSeasonRecords />
          <SquadStreaksRecords />
          <SquadMostGoalsInMatch />
          <SquadMostAssistsInMatch />
        </>
      ),
    },
  ];

  return <CustomTabs type={TAB_TYPES.SQUAD} tabs={tabs} level="secondary" />;
}
