import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTabs } from '../../../../components/tabs';
import { TAB_TYPES } from '../../../../constants';

const Goalscorers = lazy(() => import('../../containers/Goalscorers'));
const LeagueTables = lazy(() => import('../../containers/LeagueTables'));

export default function TablesTabs() {
  const { t } = useTranslation('results');
  const tabs = [
    {
      label: t('TABS.COMPETITIONS'),
      component: <LeagueTables />,
    },
    {
      label: t('TABS.GOALSCORERS'),
      component: <Goalscorers />,
    },
  ];

  return <CustomTabs tabs={tabs} type={TAB_TYPES.TABLES} level="secondary" />;
}
