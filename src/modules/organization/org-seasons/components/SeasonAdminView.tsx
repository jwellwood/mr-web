import { CustomTabs } from '../../../../components/tabs';
import { TAB_TYPES } from '../../../../constants';
import { TApolloError } from '../../../../types/apollo';
import FixturesAndResults from '../../results/main';
import { T_FETCH_ORG_SEASON } from '../graphql';
import SeasonAdminOverview from './SeasonAdminOverview';
import SeasonConfig from './SeasonConfig';
import TeamsAdmin from './TeamsAdmin';

interface Props {
  data?: T_FETCH_ORG_SEASON;
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonAdminView({ data, loading, error }: Props) {
  const season = data?.orgSeason;

  const tabs = [
    {
      label: 'Fixtures',
      component: <FixturesAndResults />,
    },
    {
      label: 'Overview',
      component: <SeasonAdminOverview season={season} loading={loading} error={error} />,
    },
    {
      label: 'Teams',
      component: <TeamsAdmin teams={season?.teamIds || []} loading={loading} error={error} />,
    },
    {
      label: 'Competitions',
      component: <SeasonConfig season={season} loading={loading} error={error} />,
    },
  ];

  return <CustomTabs type={TAB_TYPES.ORG_SEASON_ADMIN} tabs={tabs} level={'primary'} />;
}
