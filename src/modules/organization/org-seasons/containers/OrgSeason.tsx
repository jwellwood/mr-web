import { useQuery } from '@apollo/client/react';
import { lazy } from 'react';
import { DataError, PageHeader } from '../../../../components';
import { SectionContainer } from '../../../../components/containers';
import { Spinner } from '../../../../components/loaders';
import { CustomTabs } from '../../../../components/tabs';
import { useAuth } from '../../../../hooks';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { ORG_SEASON_ADMIN_LINKS, PAGES } from '../../constants';
import { FETCH_ORG_SEASON } from '../graphql';

const LeagueTables = lazy(() => import('../../results/containers/LeagueTables'));
const Results = lazy(() => import('../../results/containers/Results'));

export default function OrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  const { data, loading, error } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
  });

  const tabs = [
    {
      label: 'Tables',
      component: <LeagueTables />,
    },

    {
      label: 'Results',
      component: <Results />,
    },
  ];

  const renderContent = () =>
    loading ? (
      <Spinner />
    ) : (
      <SectionContainer title={data?.orgSeason?.name || 'Details'}>
        <CustomTabs type={'orgSeason'} tabs={tabs} level={'secondary'} />
      </SectionContainer>
    );

  return (
    <PageHeader
      title={PAGES.ORG_SEASON}
      links={isOrgAuth ? ORG_SEASON_ADMIN_LINKS(orgId) : undefined}
    >
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
