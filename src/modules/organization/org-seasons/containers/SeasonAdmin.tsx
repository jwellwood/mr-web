import { useQuery } from '@apollo/client/react';
import { PageContainer } from '../../../../components';
import { useAuth, useCustomParams } from '../../../../hooks';
import { ADMIN_LINKS } from '../../constants';
import SeasonAdminView from '../components/SeasonAdminView';
import { FETCH_ORG_SEASON } from '../graphql';

export default function SeasonAdmin() {
  const { orgSeasonId, orgId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  const { data, loading, error } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
  });

  return (
    <PageContainer
      title={`${data?.orgSeason.name || ''} Admin`}
      links={isOrgAuth ? ADMIN_LINKS(orgId, orgSeasonId) : undefined}
    >
      <SeasonAdminView data={data} loading={loading} error={error} />
    </PageContainer>
  );
}
