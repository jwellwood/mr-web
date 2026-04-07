import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';

const Results = lazy(() => import('./containers/Results'));
const Fixtures = lazy(() => import('./containers/Fixtures'));

export default function FixturesAndResults() {
  const { t } = useTranslation('results');
  const tabs: ITab[] = [
    {
      label: t('TABS.FIXTURES'),
      component: <Fixtures />,
    },
    {
      label: t('TABS.RESULTS'),
      component: <Results />,
    },
  ];

  return <CustomTabs type={TAB_TYPES.ORG} tabs={tabs} level="secondary" />;
}
