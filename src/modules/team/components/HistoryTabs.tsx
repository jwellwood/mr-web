import { lazy } from 'react';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';

const HallOfFame = lazy(() => import('../../squad/containers/HallOfFame'));
const Seasons = lazy(() => import('../../teamseasons/containers/Seasons'));
const Trophies = lazy(() => import('../../trophies/containers/Trophies'));

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
