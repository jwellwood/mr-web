import { lazy } from 'react';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';

const Results = lazy(() => import('./containers/Results'));
const Fixtures = lazy(() => import('./containers/Fixtures'));

export default function FixturesAndResults() {
  const tabs: ITab[] = [
    {
      label: 'Fixtures',
      component: <Fixtures />,
    },
    {
      label: 'Results',
      component: <Results />,
    },
  ];

  return <CustomTabs type={TAB_TYPES.ORG} tabs={tabs} level="secondary" />;
}
