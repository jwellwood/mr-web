import { TAB_TYPES } from '../../app/constants';
import { CustomTabs, ITab } from '../../components/tabs';

import Squad from './containers/Squad';
import StatsTypeToggle from './components/StatsTypeToggle';
import SquadRecords from './containers/SquadRecords';
import PastPlayers from './containers/PastPlayers';

export default function SquadTabs() {
  const tabs: ITab[] = [
    { label: 'Squad', component: <Squad /> },
    { label: 'Stats', component: <StatsTypeToggle /> },
    { label: 'Past Players', component: <PastPlayers /> },
    { label: 'Records', component: <SquadRecords /> },
  ];

  return <CustomTabs type={TAB_TYPES.SQUAD} tabs={tabs} level="secondary" />;
}
