import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';

const HallOfFame = lazy(() => import('../../squad/containers/HallOfFame'));
const Seasons = lazy(() => import('../../teamseasons/containers/Seasons'));
const Trophies = lazy(() => import('../../trophies/containers/Trophies'));

export default function History() {
  const { t } = useTranslation('team');

  const tabs: ITab[] = [
    {
      label: t('TABS.SEASONS'),
      component: <Seasons />,
    },
    {
      label: t('TABS.TROPHIES'),
      component: <Trophies />,
    },
    {
      label: t('TABS.HALL_OF_FAME'),
      component: <HallOfFame />,
    },
  ];

  return <CustomTabs type={TAB_TYPES.HISTORY} tabs={tabs} level="secondary" />;
}
