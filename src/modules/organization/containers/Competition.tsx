import { useQuery } from '@apollo/client';

import { FETCH_COMPETITION } from '../graphql';

import { AUTH_ROLES } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import CompetitionDetails from '../components/CompetitionDetails';
import { COMP_ADMIN_LINKS, PAGES } from '../constants';
import { useAuth } from '../../../hooks';
import RouteGuard from '../../../router/RouteGuard.tsx';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';

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
      <CustomAppBar
        title={PAGES.COMP}
        actionButton={isOrgAuth ? <EditLinksModal data={COMP_ADMIN_LINKS} /> : null}
      >
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </CustomAppBar>
    </RouteGuard>
  );
}
