import { lazy } from 'react';

import { TAB_TYPES } from '../../app/constants';
import { CustomTabs, ITab } from '../../components/tabs';

const HallOfFame = lazy(() => import('./containers/HallOfFame'));
const Seasons = lazy(() => import('./containers/Seasons'));
const Trophies = lazy(() => import('./containers/Trophies'));

export default function History() {
  const tabs: ITab[] = [
    {
      label: 'Seasons',
      component: <Seasons />,
    },
    {
      label: 'Trophies',
      component: <Trophies />,
    },
    {
      label: 'Hall of Fame',
      component: <HallOfFame />,
    },
  ];

  return <CustomTabs type={TAB_TYPES.HISTORY} tabs={tabs} level="secondary" />;
}
