import { useQuery } from '@apollo/client';

import { FETCH_COMPETITION } from '../graphql';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import CompetitionDetails from '../components/CompetitionDetails';
import { COMP_ADMIN_LINKS, PAGES } from '../constants';
import { useAuth } from '../../../hooks';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { PageHeader } from '../../../components';

export default function Competition() {
  const { teamId, orgId, competitionId } = useCustomParams();
  const { isOrgAuth } = useAuth(teamId, orgId);
  const { data, loading, error } = useQuery(FETCH_COMPETITION, {
    variables: { compId: competitionId },
  });

  const renderContent = () => {
    return !loading ? <CompetitionDetails competition={data?.competition || null} /> : <Spinner />;
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.COMP} links={isOrgAuth ? COMP_ADMIN_LINKS : undefined}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
