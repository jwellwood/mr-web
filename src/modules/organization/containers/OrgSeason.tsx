import { useQuery } from '@apollo/client';

import { FETCH_ORG_SEASON } from '../graphql';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { ORG_SEASON_ADMIN_LINKS, PAGES } from '../constants';
import { SectionContainer } from '../../../components/containers';
import { DataError, PageHeader } from '../../../components';
import { CustomTabs } from '../../../components/tabs';
import Results from './Results';
import LeagueTables from './LeagueTables';

export default function OrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  const { data, loading, error } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId },
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
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader
        title={PAGES.ORG_SEASON}
        links={isOrgAuth ? ORG_SEASON_ADMIN_LINKS(orgId) : undefined}
      >
        {error ? <DataError error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
