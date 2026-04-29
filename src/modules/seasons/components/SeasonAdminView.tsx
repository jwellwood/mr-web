import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components';
import { CustomTabs } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { TApolloError } from '../../../types/apollo';
import Results from '../../results/containers/Results';
import { T_FETCH_ORG_SEASON } from '../graphql';
import SeasonAdminOverview from './SeasonAdminOverview';
import SeasonConfig from './SeasonConfig';

interface Props {
  season?: T_FETCH_ORG_SEASON['orgSeason'];
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonAdminView({ season, loading, error }: Props) {
  const { t } = useTranslation('seasons');
  const tabs = [
    {
      label: t('TABS.RESULTS'),
      component: <Results />,
    },
    {
      label: t('TABS.CONFIGURATION'),
      component: (
        <>
          <SectionContainer>
            <SeasonConfig season={season} loading={loading} error={error} />
          </SectionContainer>
        </>
      ),
    },
  ];

  return (
    <>
      <SeasonAdminOverview season={season} loading={loading} error={error} />
      <CustomTabs type={TAB_TYPES.ORG_SEASON_ADMIN} tabs={tabs} level={'primary'} />
    </>
  );
}
